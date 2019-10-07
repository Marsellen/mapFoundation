import { REL_SPEC_CONFIG, SPEC_REL_KEY_SET } from 'src/config/RelsConfig';
import { getLayerIDKey } from 'src/utils/vectorUtils';
import Relevance from 'src/models/Relevance';

/**
 * geojson数据格式转为IndexedDB存储数据格式
 * @method geojsonToDbData
 * @params {Object} properties 关联关系属性
 * @params {String} spec 关联关系表名
 * @return {Array<Object>} IndexedDB rels表记录集合
 */
export const geojsonToDbData = (properties, spec) => {
    let relSpecs = REL_SPEC_CONFIG.filter(relSpec => relSpec.source == spec);
    return relSpecs.reduce((total, relSpec) => {
        const { objKeyName, objType, relObjKeyName, relObjType } = relSpec;
        let {
            [objKeyName]: objId,
            [relObjKeyName]: relObjId,
            ...extraInfo
        } = properties;
        if (objId && relObjId) {
            total.push({
                spec,
                objId,
                relObjId,
                objType,
                relObjType,
                extraInfo
            });
        }
        return total;
    }, []);
};

/**
 * IndexedDB存储数据格式转为geojson数据格式
 * @method dbDataToGeojson
 * @params {Object} record IndexedDB rels表记录
 * @params {String} spec 关联关系表名
 * @return {Array<Object>} geojson features
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
 * @params {String} layerName 要素规格
 * @params {Object} properties 要素属性
 * @return {Object<Promise>} 查询请求Promise对象，成功返回所有相关联记录
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

                let records = await relStore.queryByIndex(
                    store,
                    relKey.relType,
                    [relKey.relKey, id]
                );

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
 * @params {String} layerName 要素规格
 * @params {Object} dbData IndexedDB关联关系记录
 * @return {Array<Object>} 关联要素的参数集合
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
 * @params {Object} record IndexedDB关联关系记录
 * @return {Object} 关联关系规格
 */
export const matchRelSpecByRecord = record => {
    return REL_SPEC_CONFIG.find(config => {
        return (
            config.relObjType == record.relObjType &&
            config.objType == record.objType
        );
    });
};
