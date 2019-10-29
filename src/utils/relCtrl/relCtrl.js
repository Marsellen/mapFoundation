import Relevance from 'src/models/Relevance';
import {
    REL_SPEC_CONFIG,
    SPEC_REL_KEY_SET,
    ATTR_REL_DATA_SET,
    REL_DATA_SET
} from 'src/config/RelsConfig';
import {
    getLayerIDKey,
    getFeatureByOptionFormAll
} from 'src/utils/vectorUtils';
import IDService from 'src/pages/Index/service/IDService';
import { Modal } from 'antd';

const newRel = async (features, layerName) => {
    let [mainFeature, ...relFeatures] = features;
    await basicCheck(mainFeature, relFeatures, layerName);

    let rels = await batchCreateRel(mainFeature, relFeatures);
    let relStore = Relevance.store;
    await relStore.batchAdd(rels);
    updateFeaturesByRels(rels);
    return rels;
};

const delRel = async (mainFeature, features) => {
    let rels = batchCreateAllRel(mainFeature, features);

    let relStore = Relevance.store;
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
                    total = await total;
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
    if (!mainFeature) {
        throw { message: '请选择要素' };
    }

    if (mainFeature.layerName != layerName) {
        throw {
            message: '首选要素所在图层和编辑图层不一致'
        };
    }

    if (!relFeatures.length) {
        throw { message: '新建关联关系至少选择两个要素' };
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
        let relStore = Relevance.store;
        let rels;
        if (relSpecs[0].source == relSpecs[0].objSpec) {
            let type = relSpecs[0].objType;
            let spec = relSpecs[0].objSpec;
            let layerName = mainFeature.layerName;
            let IDKey = getLayerIDKey(spec);
            let id =
                spec == layerName
                    ? mainFeature.data.properties[IDKey]
                    : relFeatures[0].data.properties[IDKey];
            rels = await relStore.getAll([type, id], 'OBJ_TYPE_KEYS');
            rels = rels.filter(rel => {
                return relSpecs
                    .map(relSpec => relSpec.relObjType)
                    .includes(rel.relObjType);
            });
        } else {
            let type = relSpecs[0].relObjType;
            let spec = relSpecs[0].relObjSpec;
            let layerName = mainFeature.layerName;
            let IDKey = getLayerIDKey(spec);
            let id =
                spec == layerName
                    ? mainFeature.data.properties[IDKey]
                    : relFeatures[0].data.properties[IDKey];
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
    return Promise.all(
        relFeatures.map((feature, index) => {
            return createRel(mainFeature, feature, index);
        })
    );
};

const batchCreateAllRel = (mainFeature, relFeatures) => {
    return relFeatures.reduce((arr, feature) => {
        let rels = createAllRel(mainFeature, feature);
        arr = arr.concat(rels);
        return arr;
    }, []);
};

const createRel = async (mainFeature, feature, index) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = feature.layerName;
    let mainObjId = mainFeature.data.properties[getLayerIDKey(mainLayer)];
    let relObjId = feature.data.properties[getLayerIDKey(relLayer)];
    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == mainLayer && rs.relObjSpec == relLayer) ||
            (rs.relObjSpec == mainLayer && rs.objSpec == relLayer)
        );
    });
    let REL_ID;
    if (REL_DATA_SET.includes(relSpecs[0].source)) {
        let _result = await IDService.post({
            id_type: relSpecs[0].source
        }).catch(e => {
            Modal.error({
                title: '请求ID失败',
                okText: '确定'
            });
        });
        REL_ID = _result.data[0].min;
    }
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
    let extraInfo = { REL_ID };
    return {
        ...rel,
        objType,
        relObjType,
        spec,
        extraInfo
    };
};

const createAllRel = (mainFeature, feature) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = feature.layerName;
    let mainObjId = mainFeature.data.properties[getLayerIDKey(mainLayer)];
    let relObjId = feature.data.properties[getLayerIDKey(relLayer)];

    let rel1 = REL_SPEC_CONFIG.filter(rs => {
        return rs.objSpec == mainLayer && rs.relObjSpec == relLayer;
    }).map(config => {
        let { objType, relObjType, source: spec } = config;
        return {
            objId: mainObjId,
            relObjId: relObjId,
            objType,
            relObjType,
            spec
        };
    });
    let rel2 = REL_SPEC_CONFIG.filter(rs => {
        return rs.relObjSpec == mainLayer && rs.objSpec == relLayer;
    }).map(config => {
        let { objType, relObjType, source: spec } = config;
        return {
            objId: relObjId,
            relObjId: mainObjId,
            objType,
            relObjType,
            spec
        };
    });
    return rel1.concat(rel2);
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

        let IDKey = getLayerIDKey(spec);
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
        relId = rel.objId;
        relKeyName = relSpec.objKeyName;
    }
    let option = {
        key: keyName,
        value: id
    };
    let [layer, feature] = getFeatureByOptionFormAll(rel.spec, option);
    if (isDel) {
        feature.data.properties[relKeyName] = 0;
    } else {
        feature.data.properties[relKeyName] = relId;
    }
    layer.updateFeatures([feature]);
};

export { newRel, delRel, getFeatureByRels, updateFeaturesByRels };
