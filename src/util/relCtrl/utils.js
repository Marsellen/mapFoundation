import { REL_SPEC_CONFIG, SPEC_REL_KEY_SET } from 'src/config/relsConfig';
import { getLayerIDKey } from 'src/util/vectorUtils';
import Relevance from 'src/util/relevance';

/**
 * geojson数据格式转为IndexedDB存储数据格式
 * @method geojsonToDbData
 * @param {Object} properties 关联关系属性
 * @param {String} spec 关联关系表名
 * @param {String} dataType 数据来源： 任务数据/周边数据
 * @returns {Array<Object>} IndexedDB rels表记录集合
 */
export const geojsonToDbData = (properties, spec, dataType) => {
    let relSpecs = REL_SPEC_CONFIG.filter(relSpec => relSpec.source == spec);
    return relSpecs.reduce((total, relSpec) => {
        const { objKeyName, objType, relObjKeyName, relObjType, objSpec, relObjSpec } = relSpec;
        let { [objKeyName]: objId, [relObjKeyName]: relObjId, ...extraInfo } = properties;
        if (objId && relObjId) {
            total.push({
                spec,
                objId,
                relObjId,
                objType,
                relObjType,
                objSpec,
                relObjSpec,
                extraInfo,
                dataType
            });
        }
        return total;
    }, []);
};

/**
 * IndexedDB存储数据格式转为geojson数据格式
 * @method dbDataToGeojson
 * @param {Object} record IndexedDB rels表记录
 * @param {String} spec 关联关系表名
 * @returns {Array<Object>} geojson features
 */
export const dbDataToGeojson = (record, spec) => {
    let relSpecs = REL_SPEC_CONFIG.filter(relSpec => relSpec.source == spec);
    return relSpecs.map(relSpec => {
        let { objId, relObjId, extraInfo } = record;
        return {
            type: 'Feature',
            properties: {
                ...extraInfo,
                [relSpec.objKeyName]: objId,
                [relSpec.relObjKeyName]: relObjId
            }
        };
    });
};

/**
 * 通过要素的规格和属性查询IndexedDB中相关联记录
 * @method getFeatureRels
 * @param {String} layerName 要素规格
 * @param {Object} properties 要素属性
 * @returns {Object<Promise>} 查询请求Promise对象，成功返回所有相关联记录
 */
export const getFeatureRels = (layerName, properties) => {
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    let relStore = Relevance.store;
    let relKeyMap = SPEC_REL_KEY_SET.filter(record => {
        return record.spec == layerName;
    });

    return relStore.open().then(
        store => {
            return relKeyMap.reduce(async (total, relKey) => {
                total = await total;

                let records = await relStore.queryByIndex(store, relKey.relType, [
                    relKey.relKey,
                    id
                ]);

                total = total.concat(records);
                return total;
            }, []);
        },
        error => {
            console.log(error);
        }
    );
};

/**
 * 通过要素的规格和IndexedDB关联关系记录计算关联要素的参数
 * @method getRelOptions
 * @param {String} layerName 要素规格
 * @param {Object} dbData IndexedDB关联关系记录
 * @returns {Array<Object>} 关联要素的参数集合
 */
export const getRelOptions = (layerName, dbData, properties) => {
    return dbData.map(record => {
        let config = matchRelSpecByRecord(record);
        if (!config) return;
        let IDKey = getLayerIDKey(layerName);
        let isObj = record.objId == properties[IDKey];
        let relLayerName, relKey;
        if (isObj) {
            relLayerName = config.relObjSpec;
            relKey = 'relObjId';
        } else {
            relLayerName = config.objSpec;
            relKey = 'objId';
        }
        let relIDKey = getLayerIDKey(relLayerName);
        return {
            layerName: relLayerName,
            option: {
                key: relIDKey,
                value: record[relKey]
            }
        };
    });
};

/**
 * 通过IndexedDB关联关系记录匹配关联关系规格
 * @method matchRelSpecByRecord
 * @param {Object} record IndexedDB关联关系记录
 * @returns {Object} 关联关系规格
 */
export const matchRelSpecByRecord = record => {
    return REL_SPEC_CONFIG.find(config => {
        return config.relObjType == record.relObjType && config.objType == record.objType;
    });
};