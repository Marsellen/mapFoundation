import IndexedDB from 'src/utils/IndexedDB';
import {
    REL_SPEC_CONFIG,
    SPEC_REL_KEY_SET,
    ATTR_REL_DATA_SET
} from 'src/config/RelsConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

const newRel = async (features, layerName) => {
    let [mainFeature, ...relFeatures] = features;
    await basicCheck(mainFeature, relFeatures, layerName);

    let rels = batchCreateRel(mainFeature, relFeatures);
    let relStore = new IndexedDB('relationships', 'rels');
    await relStore.batchAdd(rels);
    updateFeaturesByRels(rels);
    return rels;
};

const delRel = async (mainFeature, features) => {
    let rels = batchCreateRel(mainFeature, features);

    let relStore = new IndexedDB('relationships', 'rels');
    await relStore.openTransaction().then(
        async transaction => {
            let store = transaction.objectStore(relStore.tableName);

            rels = await rels.reduce(async (total, record) => {
                let records = await relStore.queryByIndex(store, 'REL_KEYS', [
                    record.objType,
                    record.objId,
                    record.relObjType,
                    record.relObjId
                ]);
                if (records[0]) {
                    store.delete(records[0].id);
                    total.push(records[0]);
                }
                return total;
            }, []);

            transaction.onabort = error => {
                console.log(transaction.error.message);
            };
        },
        error => {
            console.log(error);
        }
    );

    updateFeaturesByRels(rels, true);
    return rels;
};

const basicCheck = async (mainFeature, relFeatures, layerName) => {
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
    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == layerName && rs.relObjSpec == relFeatureTypes[0]) ||
            (rs.relObjSpec == layerName && rs.objSpec == relFeatureTypes[0])
        );
    });
    if (relSpecs.length == 0) {
        throw {
            message: `无法构建${layerName}和${relFeatureTypes[0]}的关联关系`
        };
    }

    if (relSpecs.length > 1 && relFeatures.length > relSpecs.length) {
        throw {
            message: `${layerName}和${relFeatureTypes[0]}的关联类型超出规格定义`
        };
    }
    if (ATTR_REL_DATA_SET.includes(relSpecs[0].source)) {
        let relStore = new IndexedDB('relationships', 'rels');
        let rels;
        if (relSpecs[0].source == relSpecs[0].objSpec) {
            let layerName = mainFeature.layerName;
            let id = mainFeature.data.properties[DATA_LAYER_MAP[layerName].id];
            let type = relSpecs[0].objType;
            rels = await relStore.getAll([type, id], 'OBJ_TYPE_KEYS');
            rels = rels.filter(rel => {
                return relSpecs
                    .map(relSpec => relSpec.relObjType)
                    .includes(rel.relObjType);
            });
        } else {
            let layerName = relFeatures[0].layerName;
            let IDKey = DATA_LAYER_MAP[layerName].id;
            let id = relFeatures[0].data.properties[IDKey];
            let type = relSpecs[0].relObjType;
            rels = await relStore.getAll([type, id], 'REL_OBJ_TYPE_KEYS');
            rels = rels.filter(rel => {
                return relSpecs
                    .map(relSpec => relSpec.objType)
                    .includes(rel.objType);
            });
        }
        if (rels.length > 0) {
            let message = `${layerName}和${relFeatureTypes[0]}的关系已存在`;
            throw { message };
        }
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
    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == mainLayer && rs.relObjSpec == relLayer) ||
            (rs.relObjSpec == relLayer && rs.objSpec == mainLayer)
        );
    });
    index = relSpecs.length > index ? index : relSpecs.length - 1;
    let rel;
    if (relSpecs[index].objSpec == mainLayer) {
        rel = {
            objId: mainObjId,
            relObjId: relObjId
        };
    } else {
        rel = {
            objId: relObjId,
            relObjId: mainObjId
        };
    }
    let { objType, relObjType, source: spec } = relSpecs[index];
    return {
        ...rel,
        objType,
        relObjType,
        spec
    };
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

const updateFeaturesByRels = (rels, isDel) => {
    rels.map(rel => {
        if (ATTR_REL_DATA_SET.includes(rel.spec)) {
            updateFeatureRelAttr(rel, isDel);
        }
    });
};

const updateFeatureRelAttr = (rel, isDel) => {
    let relSpec = REL_SPEC_CONFIG.find(rs => {
        return rs.objType == rel.objType && rs.relObjType == rel.relObjType;
    });
    let id, keyName, relId, relKeyName;
    if (relSpec.objSpec == rel.spec) {
        id = rel.objId;
        keyName = relSpec.objKeyName;
        relId = rel.relObjId;
        relKeyName = relSpec.relObjKeyName;
    } else {
        id = rel.relObjId;
        keyName = relSpec.relObjKeyName;
        relId = rel.relObjId;
        relKeyName = relSpec.objKeyName;
    }
    let option = {
        key: keyName,
        value: id
    };
    let layer = map
        .getLayerManager()
        .getLayersByType('VectorLayer')
        .find(layer => layer.layerName == rel.spec).layer;
    let feature = layer.getFeatureByOption(option).properties;
    feature.data.properties[relKeyName] = isDel ? null : relId;
    debugger
    layer.updateFeatures([feature]);
};

export { newRel, delRel, getFeatureByRels, updateFeaturesByRels };
