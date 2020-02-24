import { REL_DATA_SET, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import {
    geojsonToDbData,
    dbDataToGeojson,
    getFeatureRels,
    getRelOptions
} from './utils';
import Relevance from 'src/models/relevance';
import { REL_TYPE_KEY_MAP } from 'src/config/RelsConfig';
import { updateFeaturesByRels } from './relCtrl';
import { getLayerIDKey } from '../vectorUtils';

export const relDataToTable = (data, dataType) => {
    let relData = filterRelData(data);
    return relData.reduce((total, feature) => {
        let spec = feature.name;

        feature.features.map(f => {
            let records = geojsonToDbData(f.properties, spec, dataType);
            total = total.concat(records);
        });
        return total;
    }, []);
};

export const relTableToData = records => {
    records = records.filter(record => REL_DATA_SET.includes(record.spec));

    let featureMap = records.reduce((total, record) => {
        let spec = record.spec;
        total[spec] = total[spec] || [];
        let features = dbDataToGeojson(record, spec);
        total[spec] = total[spec].concat(features);
        return total;
    }, {});

    return Object.keys(featureMap).map(name => {
        return {
            name,
            features: featureMap[name],
            type: 'FeatureCollection'
        };
    });
};

export const filterRelData = data => {
    return ((data && data.features) || []).filter(
        d => REL_DATA_SET.includes(d.name) || ATTR_REL_DATA_SET.includes(d.name)
    );
};

const AD_Lane_Default_Format = {
    L_LDIV: [
        {
            key: 'L_LDIV',
            relObjSpec: 'AD_LaneDivider',
            relObjType: 'L_LDIV',
            objSpec: 'AD_Lane',
            objType: 'LANE',
            spec: 'AD_Lane',
            extraInfo: {}
        }
    ],
    R_LDIV: [
        {
            key: 'R_LDIV',
            relObjSpec: 'AD_LaneDivider',
            relObjType: 'R_LDIV',
            objSpec: 'AD_Lane',
            objType: 'LANE',
            spec: 'AD_Lane',
            extraInfo: {}
        }
    ],
    ROAD: [
        {
            key: 'ROAD',
            relObjSpec: 'AD_Road',
            relObjType: 'ROAD',
            objSpec: 'AD_Lane',
            objType: 'LANE',
            spec: 'AD_Lane',
            extraInfo: {}
        }
    ]
};

export const getTabelData = async (layerName, relRecords, properties) => {
    let relMap = relRecords.reduce((total, record) => {
        let IDKey = getLayerIDKey(layerName);
        let isObj = record.objId == properties[IDKey];
        let keyMap = {};
        if (isObj) {
            keyMap.type = 'relObjType';
            keyMap.id = 'relObjId';
        } else {
            keyMap.type = 'objType';
            keyMap.id = 'objId';
        }
        let type = record[keyMap.type];
        total[type] = total[type] || [];
        total[type].push({
            ...record,
            key: type,
            value: record[keyMap.id]
        });
        return total;
    }, {});
    if (layerName == 'AD_Lane') {
        relMap = {
            ...AD_Lane_Default_Format,
            ...relMap
        };
    }
    return Object.keys(relMap).reduce((total, key) => {
        let config = REL_TYPE_KEY_MAP[key] || REL_TYPE_KEY_MAP.DEFAULT;
        if (relMap[key].length == 1) {
            let record = tableFormat(relMap[key][0], config);
            total.push(record);
        } else {
            relMap[key].map((record, index) => {
                record = tableFormat(record, config, index + 1);
                total.push(record);
            });
        }
        return total;
    }, []);
};

export const updateRels = async (rels, feature) => {
    updateRelUniqCheck(rels, feature);

    let relStore = Relevance.store;
    let newRecords = await Object.keys(rels).reduce(async (total, key) => {
        let id = parseInt(key.replace(/\D/g, ''));
        let relKey = key.replace(/[0-9]/g, '');
        let newRecord;
        if (id) {
            if (rels[key]) {
                let record = await relStore.get(id);
                let isRelObj = relKey == record.relObjType;
                let typeKey = isRelObj ? 'relObjId' : 'objId';
                newRecord = {
                    ...record,
                    [typeKey]: rels[key]
                };
                await relStore.edit(newRecord);
            } else {
                await relStore.deleteById(id);
            }
        } else if (rels[key]) {
            // AD_Lane 默认显示的属性关联关系 没有 id。需要新建
            let config = AD_Lane_Default_Format[relKey][0];
            newRecord = {
                ...config,
                objId: feature.data.properties.LANE_ID,
                relObjId: rels[key]
            };
            await relStore.add(newRecord);
        }
        total = await total;
        newRecord && total.push(newRecord);
        return total;
    }, []);
    updateFeaturesByRels(newRecords);
    return newRecords;
};

export const calcNewRels = async (rels, feature, changedKeys = []) => {
    updateRelUniqCheck(rels, feature);

    let relStore = Relevance.store;
    return Object.keys(rels).reduce(async (total, key) => {
        if (!rels[key] || !changedKeys.includes(key)) return total;
        let id = parseInt(key.replace(/\D/g, ''));
        let relKey = key.replace(/[0-9]/g, '');
        let newRecord;
        if (id) {
            let record = await relStore.get(id);
            let isRelObj = relKey == record.relObjType;
            let typeKey = isRelObj ? 'relObjId' : 'objId';
            newRecord = {
                ...record,
                [typeKey]: rels[key]
            };
        } else {
            // AD_Lane 默认显示的属性关联关系 没有 id。需要新建
            let config = AD_Lane_Default_Format[relKey][0];
            newRecord = {
                ...config,
                objId: feature.data.properties.LANE_ID,
                relObjId: rels[key]
            };
        }

        total = await total;
        total.push(newRecord);
        return total;
    }, []);
};

export const tableFormat = (record, config, count) => {
    let { name } = config;
    let fix = count || '';
    return {
        ...config,
        ...record,
        name: name + fix
    };
};

const updateRelUniqCheck = (rels, feature) => {
    if (feature.layerName === 'AD_Lane') {
        let { L_LDIV, R_LDIV, FROM_LANE = [], TO_LANE = [] } = Object.keys(
            rels
        ).reduce((total, key) => {
            let relKey = key.replace(/[0-9]/g, '');
            if (relKey === 'L_LDIV' || relKey === 'R_LDIV') {
                rels[key] && (total[relKey] = rels[key]);
            } else if (relKey === 'FROM_LANE' || relKey === 'TO_LANE') {
                total[relKey] = total[relKey] || [];
                rels[key] && total[relKey].push(rels[key]);
            }
            return total;
        }, {});
        if ((L_LDIV || R_LDIV) && L_LDIV === R_LDIV) {
            throw {
                message: '左侧车道线和右侧车道线不能相同'
            };
        }
        if (uniqArrayCheck(FROM_LANE)) {
            throw {
                message: '进入车道不能重复'
            };
        }
        if (uniqArrayCheck(TO_LANE)) {
            throw {
                message: '退出车道不能重复'
            };
        }
        if (uniqArrayCheck(FROM_LANE.concat(TO_LANE))) {
            throw {
                message: '进入车道和退出车道不能相同'
            };
        }
    } else if (feature.layerName === 'AD_Road') {
        let { FROM_ROAD = [], TO_ROAD = [] } = Object.keys(rels).reduce(
            (total, key) => {
                let relKey = key.replace(/[0-9]/g, '');
                if (relKey === 'FROM_ROAD' || relKey === 'TO_ROAD') {
                    total[relKey] = total[relKey] || [];
                    rels[key] && total[relKey].push(rels[key]);
                }
                return total;
            },
            {}
        );
        if (uniqArrayCheck(FROM_ROAD)) {
            throw {
                message: '进入车道不能重复'
            };
        }
        if (uniqArrayCheck(TO_ROAD)) {
            throw {
                message: '退出车道不能重复'
            };
        }
        if (uniqArrayCheck(FROM_ROAD.concat(TO_ROAD))) {
            throw {
                message: '进入车道和退出车道不能相同'
            };
        }
    }
};

const uniqArrayCheck = array => {
    return array.reduce((flag, item) => {
        let uniq = array.filter(a => a === item).length > 1;
        flag = flag || uniq;
        return flag;
    }, false);
};

export default {
    relDataToTable,
    relTableToData,
    getTabelData,
    updateRels,
    getFeatureRels,
    getRelOptions,
    calcNewRels
};
