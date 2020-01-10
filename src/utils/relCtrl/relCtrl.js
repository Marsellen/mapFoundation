import Relevance from 'src/models/relevance';
import {
    REL_SPEC_CONFIG,
    ATTR_REL_DATA_SET,
    REL_DATA_SET
} from 'src/config/RelsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/ADMapDataConfig';
import {
    getLayerIDKey,
    getFeatureByOptionFormAll
} from 'src/utils/vectorUtils';
import IDService from 'src/services/IDService';

const batchAddRels = async rels => {
    let relStore = Relevance.store;
    await relStore.batchAdd(rels);
    updateFeaturesByRels(rels);
    return rels;
};

const newRel = async (mainFeature, relFeatures) => {
    let rels = await batchCreateRel(mainFeature, relFeatures);
    await relsUniqCheck(rels);
    rels = await batchGetRelId(rels);

    // 人工构建阶段不维护 UPD_STAT
    // featureLog = calcFeatureLog(mainFeature, relFeatures);

    return batchAddRels(rels);
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

    let isAttrRel =
        ATTR_REL_DATA_SET.includes(relSpecs[0].source) &&
        layerName === relSpecs[0].source;
    let REL_LIMIT_COUNT = 1;
    if (
        (isAttrRel && relFeatures.length > relSpecs.length) ||
        (layerName === 'AD_LaneDivider' && relFeatures.length > REL_LIMIT_COUNT)
    ) {
        throw {
            message: `${layerName}和${relFeatureTypes[0]}的关联类型超出规格定义`
        };
    }
};

const batchCreateRel = async (mainFeature, relFeatures) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = relFeatures[0].layerName;
    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == mainLayer && rs.relObjSpec == relLayer) ||
            (rs.relObjSpec == mainLayer && rs.objSpec == relLayer)
        );
    });
    let rels = await Promise.all(
        relFeatures.map(async (feature, index) => {
            await relUniqCheck(mainFeature, feature);
            index = relSpecs.length > index ? index : relSpecs.length - 1;
            return createRelBySpecConfig(relSpecs[index], mainFeature, feature);
        })
    );

    return rels;
};

const batchCreateAllRel = (mainFeature, relFeatures) => {
    return relFeatures.reduce((arr, feature) => {
        let rels = createAllRel(mainFeature, feature);
        arr = arr.concat(rels);
        return arr;
    }, []);
};

/**
 * 通过关联关系规格配置新建关联关系
 * @method createRelBySpecConfig
 * @param {Object} specConfig 关联关系规格配置
 * @param {Object} mainFeature 关联要素数据
 * @param {Object} feature 被关联要素数据
 * @returns {Object} IndexedDB rels表记录（不包含REL_ID）
 */
const createRelBySpecConfig = (specConfig, mainFeature, feature) => {
    let { objType, relObjType, source: spec, objSpec, relObjSpec } = specConfig;
    let mainLayer = mainFeature.layerName;
    let relLayer = feature.layerName;
    let mainObjId = mainFeature.data.properties[getLayerIDKey(mainLayer)];
    let relObjId = feature.data.properties[getLayerIDKey(relLayer)];
    let rel;
    if (specConfig.objSpec == mainLayer) {
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
    let extraInfo = REL_DATA_SET.includes(spec)
        ? {
              CONFIDENCE: DEFAULT_CONFIDENCE_MAP[spec]
          }
        : {};
    return {
        spec,
        ...rel,
        objType,
        relObjType,
        objSpec,
        relObjSpec,
        extraInfo
    };
};

const getRelId = async rel => {
    if (REL_DATA_SET.includes(rel.spec)) {
        let result = await IDService.initID(
            {
                id_type: rel.spec
            },
            () => {
                throw { message: '请求ID失败' };
            }
        );
        rel.extraInfo.REL_ID = result.data[0].min;
    }
};

/**
 * 创建两类要素所有规格中存在的关联关系
 * @method createAllRel
 * @param {Object} mainFeature 关联要素数据
 * @param {Object} feature 被关联要素数据
 * @returns {Array<Object>} IndexedDB rels表记录集合（不包含REL_ID）
 */
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
        let { objType, relObjType, source: spec, objSpec, relObjSpec } = config;
        return {
            objId: relObjId,
            relObjId: mainObjId,
            objType,
            relObjType,
            objSpec,
            relObjSpec,
            spec
        };
    });
    return rel1.concat(rel2);
};

/**
 * 通过‘要素属性关联关系记录’更新‘要素属性’
 * @method updateFeaturesByRels
 * @param {Array<Object>} rels 要素属性关联关系记录
 * @param {Boolean} isDel 是否删除
 * @returns {null}
 */
const updateFeaturesByRels = (rels, isDel) => {
    rels.forEach(rel => {
        if (ATTR_REL_DATA_SET.includes(rel.spec)) {
            updateFeatureRelAttr(rel, isDel);
        }
    });
};

/**
 * 通过‘要素属性关联关系记录’更新‘要素属性’
 * @method updateFeatureRelAttr
 * @param {Object} rel 要素属性关联关系记录
 * @param {Boolean} isDel 是否删除
 * @returns {null}
 */
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

const batchGetRelId = async rels => {
    await Promise.all(
        rels.map(rel => {
            return getRelId(rel);
        })
    );
    return rels;
};

const relsUniqCheck = rels => {
    return Promise.all(
        rels.map(rel => {
            return attrRelUniqCheck(rel);
        })
    );
};

const attrRelUniqCheck = async rel => {
    if (!ATTR_REL_DATA_SET.includes(rel.spec)) {
        return;
    }
    let relStore = Relevance.store;
    let condition, indexName, relkey, relId;
    if (rel.spec === 'AD_Arrow' || rel.spec === 'AD_Text') {
        condition = [rel.relObjType, rel.relObjId];
        indexName = 'REL_OBJ_TYPE_KEYS';
        relkey = 'objType';
        relId = 'objId';
    } else {
        condition = [rel.objType, rel.objId];
        indexName = 'OBJ_TYPE_KEYS';
        relkey = 'relObjType';
        relId = 'relObjId';
    }
    let rels = await relStore.getAll(condition, indexName);
    let hadBeenRel = rels.some(r => r[relkey] === rel[relkey]);
    if (hadBeenRel) {
        let errorMessageKey = rel.objType + '_' + rel.relObjType;
        throw {
            message: HAD_BEEN_REL_ERROR[errorMessageKey]
        };
    }
    hadBeenRel = rels.some(r => r[relId] === rel[relId]);
    if (hadBeenRel) {
        throw {
            message: '创建失败: 关联关系重复'
        };
    }
};

const relUniqCheck = async (mainFeature, feature) => {
    let rels = createAllRel(mainFeature, feature);

    let relStore = Relevance.store;
    let rs = await rels.reduce(async (total, rel) => {
        total = await total;
        let r = await relStore.get(
            [rel.objType, rel.objId, rel.relObjType, rel.relObjId],
            'REL_KEYS'
        );
        r && total.push(r);
        return total;
    }, []);
    if (rs.length) {
        throw {
            message: '创建失败: 关联关系重复'
        };
    }
};

const calcFeatureLog = (mainFeature, relFeatures) => {
    let oldFeatures = [mainFeature, ...relFeatures];
    let newFeatures = oldFeatures.map(modUpdStatRelation);
    return [oldFeatures, newFeatures];
};

const HAD_BEEN_REL_ERROR = {
    LANE_L_LDIV: '创建失败: 车道中心线已关联左侧车道线',
    LANE_R_LDIV: '创建失败: 车道中心线已关联右侧车道线',
    LANE_ROAD: '创建失败: 车道中心线已关联参考线',
    LANE_ARROW: '创建失败: 地面导向箭头已关联车道中心线',
    LANE_TEXT: '创建失败: 地面文字符号已关联车道中心线',
    LANEP_ROAD: '创建失败: 车道属性变化点已关联参考线'
};

export {
    newRel,
    delRel,
    updateFeaturesByRels,
    basicCheck,
    createRelBySpecConfig,
    batchAddRels,
    attrRelUniqCheck
};
