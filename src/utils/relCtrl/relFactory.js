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

export const relDataToTable = data => {
    let relData = filterRelData(data);
    return relData.reduce((total, feature) => {
        let spec = feature.name;

        feature.features.map(f => {
            let records = geojsonToDbData(f.properties, spec);
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
            L_LDIV: [
                {
                    key: 'L_LDIV',
                    id: ''
                }
            ],
            R_LDIV: [
                {
                    key: 'R_LDIV',
                    id: ''
                }
            ],
            ROAD: [
                {
                    key: 'ROAD',
                    id: ''
                }
            ],
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
    if (feature.layerName == 'AD_Lane') {
        let relMap = Object.keys(rels).reduce((total, key) => {
            return {
                ...total,
                ...rels[key]
            };
        }, {});
        if (
            (relMap.L_LDIV || relMap.R_LDIV) &&
            relMap.L_LDIV === relMap.R_LDIV
        ) {
            throw {
                message: '车道线关联错误'
            };
        }
    }

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
            newRecord = {
                objId: feature.data.properties.LANE_ID,
                objType: 'LANE',
                relObjType: relKey,
                relObjId: rels[key],
                spec: 'AD_Lane'
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

export const tableFormat = (record, config, count) => {
    let { name } = config;
    let fix = count || '';
    return {
        ...config,
        ...record,
        name: name + fix
    };
};

export default {
    relDataToTable,
    relTableToData,
    getTabelData,
    updateRels,
    getFeatureRels,
    getRelOptions
};
