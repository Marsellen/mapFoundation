import Relevance from 'src/util/relevance';
import {
    REL_SPEC_CONFIG,
    ATTR_REL_DATA_SET,
    REL_DATA_SET,
    CONNECTION_RELS,
    REL_LIMIT_LAYER
} from 'src/config/relsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/adMapDataConfig';
import {
    getLayerIDKey,
    getFeatureByOptionFormAll,
    modUpdStatRelation,
    getLayerByName
} from 'src/util/vectorUtils';
import IDService from 'src/service/idService';
import { distance } from 'src/util/utils';
import { updateFeatures } from './operateCtrl';

const newRel = async (mainFeature, relFeatures) => {
    // 根据mainFeature与relFeatures构建关联关系
    let { rels, resolveFeatures, warningMessage } = await batchCreateRel(mainFeature, relFeatures);
    // 新建的关联关系获取id
    rels = await batchGetRelId(rels);

    let { rels: oldRels, features: oldFeatures } = await querySameAttrTypeRels(rels);

    let log = calcRelChangeLog([mainFeature, ...resolveFeatures, ...oldFeatures], [oldRels, rels]);

    await updateFeatures(log);

    return { log, warningMessage };
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
    const { properties } = mainFeature.data;
    const RelLayers = ['AD_Road', 'AD_LaneDivider'];
    var warningMessage;
    if (!mainFeature) {
        throw new Error('请选择要素');
    }

    if (mainFeature.layerName != layerName) {
        throw new Error('首选要素所在图层和编辑图层不一致');
    }

    if (!relFeatures.length) {
        throw new Error('新建关联关系至少选择两个要素');
    }

    let relFeatureTypes = relFeatures.reduce((total, feature) => {
        if (!total.includes(feature.layerName)) total.push(feature.layerName);
        return total;
    }, []);

    if (relFeatureTypes.length !== 1) {
        throw new Error('只允许建立两类要素之间的关联关系');
    }

    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == layerName && rs.relObjSpec == relFeatureTypes[0]) ||
            (rs.relObjSpec == layerName && rs.objSpec == relFeatureTypes[0])
        );
    });
    if (relSpecs.length == 0) {
        throw new Error(`无法构建${layerName}和${relFeatureTypes[0]}的关联关系`);
    }

    if (
        layerName === 'AD_LaneDivider' &&
        properties.RD_EDGE != 1 &&
        RelLayers.includes(relFeatureTypes[0])
    ) {
        throw new Error('该车道线非道路边界，不可建关系');
    }
    if (RelLayers.includes(layerName) && relFeatureTypes[0] == 'AD_LaneDivider') {
        relFeatures.forEach(feature => {
            const { properties } = feature.data;
            if (properties.RD_EDGE != 1) throw new Error('车道线存在非道路边界，不可建关系');
        });
    }

    let isAttrRel =
        ATTR_REL_DATA_SET.includes(relSpecs[0].source) && layerName === relSpecs[0].source;
    let REL_LIMIT_COUNT = 1;
    const isLimitLayer = REL_LIMIT_LAYER.includes(relFeatures[0].layerName);
    if (
        (isAttrRel && relFeatures.length > relSpecs.length) ||
        (layerName === 'AD_LaneDivider' && isLimitLayer && relFeatures.length > REL_LIMIT_COUNT)
    ) {
        throw new Error(`${layerName}和${relFeatureTypes[0]}的关联类型超出规格定义`);
    }

    if (relSpecs[0].relObjFeatTypes) {
        const featTypeObj = relSpecs[0].relObjFeatTypes.find(item => {
            const { name, value } = item;
            const mainIsCorrectType = mainFeature.data.properties[name] === value;
            const relIsCorrectType = relFeatures.every(relFeature => {
                return relFeature.data.properties[name] === value;
            });
            return mainIsCorrectType || relIsCorrectType;
        });
        if (!featTypeObj) {
            throw new Error('几何层：路面车道标记的类型应该为人行横道、禁止停车区、减速带、导流区');
        }
    }

    if (CONNECTION_RELS.includes(relSpecs[0].source)) {
        for (let i = 0; i < relFeatures.length; i++) {
            let warning = checkConnection(mainFeature, relFeatures[i]);
            if (warning) {
                warningMessage = '新建成功；数据情况复杂，需检查连接关系正确性；';
            }
        }
    }

    return warningMessage;
};

function checkConnection(driveInFeature, driveOutFeature) {
    let driveInDirection = driveInFeature.data.properties.DIRECTION;
    let driveOutDirection = driveOutFeature.data.properties.DIRECTION;
    let driveInPoint, driveOutPoint;
    let driveInCoordinates = driveInFeature.data.geometry.coordinates;
    let driveOutCoordinates = driveOutFeature.data.geometry.coordinates;
    if (driveInDirection === 1) {
        driveInPoint = driveInCoordinates[driveInCoordinates.length - 1];
    }
    if (driveInDirection === 2) {
        driveInPoint = driveInCoordinates[0];
    }
    if (driveOutDirection === 1) {
        driveOutPoint = driveOutCoordinates[0];
    }
    if (driveOutDirection === 2) {
        driveOutPoint = driveOutCoordinates[driveOutCoordinates.length - 1];
    }
    if (driveInPoint && driveOutPoint) {
        if (distance(driveInPoint, driveOutPoint) > 0.01) {
            throw new Error('数据没有连接关系，创建关系失败');
        }
    } else {
        return true;
    }
}

/**
 * 根据mainFeature与relFeatures构建关联关系
 * @method batchCreateRel
 * @param {Object} mainFeature 关联要素数据
 * @param {Object} relFeatures 被关联要素数据集合
 * @returns {Object} result 构建结果
 * @returns {Array} result.rels 成功构造的关联关系数据
 * @returns {Array} result.resolveFeatures 成功构造关联关系的被关联要素数据集合
 */

const batchCreateRel = async (mainFeature, relFeatures) => {
    let mainLayer = mainFeature.layerName;
    let relLayer = relFeatures[0].layerName;
    let relSpecs = REL_SPEC_CONFIG.filter(rs => {
        return (
            (rs.objSpec == mainLayer && rs.relObjSpec == relLayer) ||
            (rs.relObjSpec == mainLayer && rs.objSpec == relLayer)
        );
    });
    let resolveFeatures = [];
    let rels = await Promise.all(
        relFeatures.map(async (feature, index) => {
            try {
                // 校验mainFeature和feature之间是否已有关联关系
                await relUniqCheck(mainFeature, feature);
                resolveFeatures.push(feature);
                // 通过重复性校验后按照规则构建关联关系
                index = relSpecs.length > index ? index : relSpecs.length - 1;
                return createRelBySpecConfig(relSpecs[index], mainFeature, feature);
            } catch (e) {
                return;
            }
        })
    );
    if (!resolveFeatures.length) throw new Error('重复创建关联关系');
    let warningMessage = '';
    if (resolveFeatures.length < relFeatures.length) {
        warningMessage = '创建关系部分成功，存在重复创建的关联关系';
    }

    return { rels: _.compact(rels), resolveFeatures, warningMessage };
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
    let {
        objType,
        relObjType,
        source: spec,
        objSpec,
        relObjSpec,
        relObjFeatType,
        relObjFeatTypes
    } = specConfig;
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
              CONFIDENCE: DEFAULT_CONFIDENCE_MAP[spec],
              COLL_TIME: '',
              MAKE_TIME: '',
              UPD_STAT: '{}',
              TILE_ID: ''
          }
        : {};
    //交叉口关系添加FEAT_TYPE
    if (relObjFeatTypes) {
        let featTypeObj = relObjFeatTypes.find(item => {
            const { name, value } = item;
            const currentVal = mainFeature.data.properties[name] ?? feature.data.properties[name];
            return currentVal === value;
        });
        extraInfo.FEAT_TYPE = featTypeObj?.featType;
    }
    if (relObjFeatType) {
        extraInfo.FEAT_TYPE = relObjFeatType;
    }
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
        let { objType, relObjType, source: spec, objSpec, relObjSpec } = config;
        return {
            objId: mainObjId,
            relObjId: relObjId,
            objType,
            relObjType,
            objSpec,
            relObjSpec,
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

const getRelConfig = (layerName, properties) => {
    return REL_SPEC_CONFIG.find(relSpec => {
        const { FEAT_TYPE } = properties;
        const { relObjFeatType, relObjFeatTypes } = relSpec;
        if (relObjFeatType) {
            return relSpec.source == layerName && relObjFeatType == FEAT_TYPE;
        }
        if (relObjFeatTypes) {
            const featType = relObjFeatTypes.find(item => {
                return item.featType == FEAT_TYPE;
            });
            return relSpec.source == layerName && featType;
        }
        return relSpec.source === layerName;
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
    if (!feature) return;
    if (isDel) {
        feature.data.properties[relKeyName] = 0;
    } else {
        feature.data.properties[relKeyName] = relId;
    }
    layer.updateFeatures([feature]);
};

// 批量请求关联关系数据的新id
const batchGetRelId = async rels => {
    let needIdRels = rels.filter(rel => REL_DATA_SET.includes(rel.spec));
    if (needIdRels.length > 0) {
        // needIdRels目前只会存在一类关联关系
        let result = await IDService.initID(
            {
                id_type: needIdRels[0].spec,
                num: needIdRels.length
            },
            () => {
                throw new Error('请求ID失败');
            }
        );
        needIdRels.forEach((rel, index) => {
            rel.extraInfo.REL_ID = result.data[0].min + index;
        });
    }
    return rels;
};

/**
 * 查询重复的属性关联关系与关系中被关联的要素集合
 * @method querySameAttrTypeRels
 * @param {Array} rels 待建关联关系集合
 * @returns {Object} 重复的属性关联关系与关系中被关联的要素集合
 */
const querySameAttrTypeRels = async rels => {
    return rels.reduce(
        async (total, rel) => {
            total = await total;
            let result = await querySameTypeRel(rel);
            if (result) {
                let { rel, feature } = result;
                rel && total.rels.push(rel);
                feature && total.features.push(feature);
            }
            return total;
        },
        { rels: [], features: [] }
    );
};

// 属性表关联关系唯一性校验
const querySameTypeRel = async rel => {
    // 非属性关联关系不做校验
    if (!ATTR_REL_DATA_SET.includes(rel.spec)) return;
    let relStore = Relevance.store;
    let condition, indexName, relkey, relId, relSpec;
    // 根据关联类型构造查询器
    // 地面箭头和地面文字为被关联对象（relObj）
    // 车道中心线和属性变化点为主对象（obj）
    if (rel.spec === 'AD_Arrow') {
        condition = [rel.relObjType, rel.relObjId];
        indexName = 'REL_OBJ_TYPE_KEYS';
        relkey = 'objType';
        relId = 'objId';
        relSpec = 'objSpec';
    } else {
        // 车道中心线和属性变化点为主对象（obj）
        condition = [rel.objType, rel.objId];
        indexName = 'OBJ_TYPE_KEYS';
        relkey = 'relObjType';
        relId = 'relObjId';
        relSpec = 'relObjSpec';
    }
    let rels = await relStore.getAll(condition, indexName);
    // 判断是否存在同类型的关联关系
    let sameTypeRel = rels.find(r => r[relkey] === rel[relkey]);
    if (sameTypeRel) {
        let layerName = sameTypeRel[relSpec];
        let IDKey = getLayerIDKey(layerName);
        let option = { key: IDKey, value: sameTypeRel[relId] };
        let layer = getLayerByName(layerName);
        let featureObj = layer.getFeatureByOption(option);
        let feature = featureObj && featureObj.properties;
        return { rel: sameTypeRel, feature };
    }
};

// 重复项校验：校验两个要素是否已存在关联关系
const specialLayers = ['AD_Road', 'AD_Lane'];
const relUniqCheck = async (mainFeature, feature) => {
    // 预先建立mainFeature与feature的所有可能存在的关联关系
    // 如车道中心线和车道线可能会有左侧车道线关联关系和右侧车道线关联关系
    // 如车道中心线和车道中心线可能会有驶入关联关系和驶出关联关系
    let rels = createAllRel(mainFeature, feature);

    // 尝试查询所有关联关系，如果存在则说明两个要素是否已存在关联关系
    let rs = await rels.reduce(async (total, rel) => {
        total = await total;
        let result = await querySameRel(rel);
        result && total.push(result);
        return total;
    }, []);

    //将重复关联关系中，潮汐车道建立连接关系的删除
    const mainFeatureDirection = mainFeature?.data?.properties?.DIRECTION;
    const featureDirectoin = feature?.data?.properties?.DIRECTION;
    const isbothDirection = mainFeatureDirection === 3 || featureDirectoin === 3;
    const mainFeatureLayerName = mainFeature.layerName;
    const featureLayerName = feature.layerName;
    const isSameLayer = mainFeatureLayerName === featureLayerName;
    const isSpeciaLayers = specialLayers.includes(mainFeatureLayerName);
    //判断两个要素都是车道中心线，或者都是道路参考线，且有一个要素direction===3
    if (isbothDirection && isSpeciaLayers && isSameLayer) {
        let IDKey = getLayerIDKey(mainFeatureLayerName);
        //只看正向的是否已存在关联关系
        rs = rs.filter(item => item.objId == mainFeature?.data?.properties[IDKey]);
    }

    if (rs.length) {
        throw new Error('关联关系重复');
    }
};

const querySameRel = async rel => {
    let relStore = Relevance.store;
    let condition = [rel.objType, rel.objId, rel.relObjType, rel.relObjId];
    let indexName = 'REL_KEYS';
    return await relStore.get(condition, indexName);
};

/**
 * 根据任务类型构造关联关系变更更新数据
 * @method calcRelChangeLog
 * @param {Array} features 关联关系变更过程中影响的要素集合
 * @param {Array} rels 关联关系变更记录
 * @returns {Object} log 日志数据
 */
const calcRelChangeLog = (features, rels) => {
    let newFeatures = features.map(modUpdStatRelation);
    return {
        features: [features, newFeatures],
        rels
    };
};

export {
    newRel,
    delRel,
    updateFeaturesByRels,
    getRelConfig,
    basicCheck,
    createRelBySpecConfig,
    querySameTypeRel,
    calcRelChangeLog,
    relUniqCheck
};
