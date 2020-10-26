import { REL_DATA_SET, ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import { geojsonToDbData, dbDataToGeojson, getFeatureRels, getRelOptions } from './utils';
import Relevance from 'src/models/relevance';
import { REL_TYPE_KEY_MAP } from 'src/config/RelsConfig';
import { getLayerIDKey, getLayerByName } from '../vectorUtils';
import { LAYER_NAME_MAP } from 'src/config/RenderModeConfig';

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

export const calcNewRels = async (rels, feature, changedKeys = []) => {
    let relStore = Relevance.store;
    return changedKeys.reduce(async (total, key) => {
        if (!rels[key]) return total;
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

const calcUniqChangedKeys = (rels, oldRels, changedKeys, data) => {
    let uniqChangeKeys = [];
    let repeat = false;
    for (let i = 0, len = changedKeys.length; i < len; i++) {
        let key = changedKeys[i];
        let { [key]: value, ...other } = rels;
        if (isAllowKey(key, value, other, data)) {
            uniqChangeKeys.push(key);
            continue;
        }
        rels[key] = oldRels[key];
        repeat = true;
        changedKeys.splice(i, 1);
        break;
    }

    if (repeat) {
        return calcUniqChangedKeys(rels, oldRels, changedKeys);
    }
    return uniqChangeKeys;
};

//允许值重复的关联关系映射
const ALLOW_REPEAT_KEYS_MAP = {
    FROM_LANE: 'TO_LANE',
    TO_LANE: 'FROM_LANE',
    FROM_ROAD: 'TO_ROAD',
    TO_ROAD: 'FROM_ROAD'
};
//允许值重复的关联关系key
const ALLOW_REPEAT_KEYS = ['FROM_LANE', 'TO_LANE', 'FROM_ROAD', 'TO_ROAD'];
//判断修改关联关系是否正确
const isAllowKey = (key, value, other, data) => {
    if (!value) return true;
    const keyName = key.replace(/\d/g, '');
    //判断当前校验的key是否允许重复，如：'FROM_LANE', 'TO_LANE', 'FROM_ROAD', 'TO_ROAD'
    if (ALLOW_REPEAT_KEYS.includes(keyName)) {
        //获取主要素和被修改要素的derection
        const { attributes: { DIRECTION: mainFeatureDirection } = {} } = data || {};
        const { key: optionKey, layerName } = LAYER_NAME_MAP[keyName] || {};
        const option = { key: optionKey, value };
        const feature = getLayerByName(layerName).getFeatureByOption(option);
        const { DIRECTION } = feature?.properties?.data?.properties ?? {};
        //如果主要素和被修改要素的derection有一个为3（双向车道/潮汐车道）
        if (mainFeatureDirection === 3 || DIRECTION === 3) {
            let sameKV = Object.entries(other).filter(([k, v]) => {
                const kName = k.replace(/\d/g, '');
                return v == value && ALLOW_REPEAT_KEYS_MAP[keyName] !== kName;
            });
            return sameKV.length == 0;
        }
    }
    return !Object.values(other).includes(value);
};

export default {
    relDataToTable,
    relTableToData,
    getTabelData,
    getFeatureRels,
    getRelOptions,
    calcNewRels,
    calcUniqChangedKeys
};
