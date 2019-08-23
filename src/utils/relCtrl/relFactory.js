import { REL_DATA_SET, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import {
    geojsonToDbData,
    dbDataToGeojson,
    getFeatureRels,
    getRelOptions,
    matchRelSpecByRecord
} from './utils';
import IndexedDB from 'src/utils/IndexedDB';
import { REL_TYPE_KEY_MAP } from 'src/config/RelsConfig';
import { updateFeaturesByRels } from './relCtrl';

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

export const getTabelData = async (layerName, relRecords) => {
    let relMap = relRecords.reduce((total, record) => {
        let config = matchRelSpecByRecord(record);
        let keyMap = {};
        if (config.objSpec == layerName) {
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

export const updateRels = async (rels, type) => {
    if (type == 'AD_Lane') {
        let map = Object.keys(rels).reduce((total, key) => {
            return {
                ...total,
                ...rels[key]
            };
        }, {});
        if ((map.L_LDIV || map.R_LDIV) && map.L_LDIV === map.R_LDIV) {
            throw {
                message: '车道线关联错误'
            };
        }
    }

    let relStore = new IndexedDB('relationships', 'rels');
    let newRecords = await Object.keys(rels).reduce(async (total, key) => {
        let id = parseInt(key.replace(/\D/g, ''));
        let record = await relStore.get(id);
        let isRelObj = Object.keys(rels[key]).includes(record.relObjType);
        let typeKey = isRelObj ? 'relObjId' : 'objId';
        let relType = isRelObj ? 'relObjType' : 'objType';
        let newRecord = {
            ...record,
            [typeKey]: rels[key][record[relType]]
        };
        await relStore.edit(newRecord);
        total = await total;
        total.push(newRecord);
        return total;
    }, []);
    updateFeaturesByRels(newRecords);
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
