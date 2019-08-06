import IndexedDB from 'src/utils/IndexedDB';
import { OBJ_REL_DATA_MAP, SPEC_REL_KEY_SET } from 'src/config/RelsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const newRel = (features, layerName) => {
    try {
        let [mainFeature, ...relFeatures] = features;
        basicCheck(mainFeature, relFeatures, layerName);

        let rels = batchCreateRel(mainFeature, relFeatures);
        let relStore = new IndexedDB('relationships', 'rels');
        return relStore.batchAdd(rels);
    } catch (e) {
        return new Promise((reslove, reject) => {
            reject(e);
        });
    }
};

const delRel = async (mainFeature, features) => {
    let rels = batchCreateRel(mainFeature, features);
    let layerName = mainFeature.layerName;
    let IDKey = DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
    let id = mainFeature.data.properties[IDKey];
    let relStore = new IndexedDB('relationships', 'rels');
    return await relStore.openTransaction().then(
        async transaction => {
            let store = transaction.objectStore(relStore.tableName);
            let relKeyMap = SPEC_REL_KEY_SET.filter(record => {
                return record.spec == layerName;
            });
            await Promise.all(
                relKeyMap.map(async relKey => {
                    let records = await relStore.queryByIndex(
                        store,
                        relKey.relType,
                        [relKey.relKey, id]
                    );
                    let ids = records.map(record => record.id);
                    ids.map(index => {
                        store.delete(index);
                    });
                })
            );
            rels.map(record => {
                store.add(record);
            });

            transaction.onabort = error => {
                console.log(transaction.error.message);
            };
        },
        error => {
            console.log(error);
        }
    );
};

const basicCheck = (mainFeature, relFeatures, layerName) => {
    if (mainFeature.layerName != layerName) {
        throw {
            message: '首选要素所在图层和编辑图层不一致'
        };
    }
    let relFeatureTypes = relFeatures.reduce((total, feature) => {
        if (!total.includes(feature.layerName)) total.push(feature.layerName);
        return total;
    }, []);
    if (relFeatureTypes.length !== 1) {
        throw {
            message: '只允许建立两类要素之间的关联关系'
        };
    }
    if (
        !OBJ_REL_DATA_MAP[layerName] ||
        !OBJ_REL_DATA_MAP[layerName][relFeatureTypes[0]]
    ) {
        throw {
            message: `无法构建${layerName}和${relFeatureTypes[0]}的关联关系`
        };
    }
};

const batchCreateRel = (mainFeature, relFeatures) => {
    let rels = relFeatures.map((feature, index) => {
        return createRel(mainFeature, feature, index);
    });

    return rels;
};

const createRel = (mainFeature, feature, index) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = feature.layerName;
    let mainObjId = mainFeature.data.properties[DATA_LAYER_MAP[mainLayer].id];
    let relObjId = feature.data.properties[DATA_LAYER_MAP[relLayer].id];
    let { reverse, relObjType, ...rel } = OBJ_REL_DATA_MAP[mainLayer][relLayer];
    if (Array.isArray(relObjType)) {
        relObjType = relObjType[index];
    }
    if (reverse) {
        return {
            ...rel,
            relObjType,
            objId: relObjId,
            relObjId: mainObjId
        };
    } else {
        return {
            ...rel,
            relObjType,
            relObjId: relObjId,
            objId: mainObjId
        };
    }
};

const getFeatureByRels = rels => {
    let featureMap = [];
    rels.reduce((map, rel) => {
        let relKey = rel.key.replace(/[0-9]/, '');
        let specRelKey = SPEC_REL_KEY_SET.find(record => {
            return record.relKey == relKey;
        });
        let spec = specRelKey && specRelKey.spec;
        if (!spec) return map;

        let IDKey = DATA_LAYER_MAP[spec].id;
        let option = {
            layerName: spec,
            option: { key: IDKey, value: rel.value }
        };
        map.push(option);
        return map;
    }, featureMap);
    return featureMap;
};

export { newRel, delRel, getFeatureByRels };
