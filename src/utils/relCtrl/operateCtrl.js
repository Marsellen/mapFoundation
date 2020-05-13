import Relevance from 'src/models/relevance';
import Attr from 'src/models/attr';
import {
    REL_DATA_SET,
    ATTR_REL_DATA_SET,
    REL_SPEC_CONFIG
} from 'src/config/RelsConfig';
import { ATTR_SPEC_CONFIG } from 'config/AttrsConfig';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { updateFeaturesByRels } from './relCtrl';
import EditorService from 'src/services/EditorService';
import AdLineService from 'src/services/AdLineService';
import BatchToolsService from 'src/services/BatchToolsService';
import { getFeatureRels } from './utils';
import attrFactory from '../attrCtrl/attrFactory';
import {
    getFeatureOption,
    getLayerIDKey,
    getLayerByName,
    completeProperties
} from '../vectorUtils';
import { message } from 'antd';
import _ from 'lodash';

/**
 * 删除要素
 * @method deleteLine
 * @param {Array<Object>} features 被删除要素集合
 * @returns {Object} 删除后的操作记录
 */
const deleteLine = async features => {
    let { rels, attrs } = await features.reduce(
        async (total, feature) => {
            let layerName = feature.layerName;
            let rels = await getFeatureRels(layerName, feature.data.properties);
            let attrs = await attrFactory.getFeatureAttrs(
                layerName,
                feature.data.properties
            );
            total = await total;
            total.rels = total.rels.concat(rels);
            total.attrs = total.attrs.concat(attrs);
            return total;
        },
        { rels: [], attrs: [] }
    );

    let allRelFeatureOptions = getAllRelFeatureOptions(rels);
    let featuresLog = calcFeaturesLog(
        [features, []],
        [uniqOptions(allRelFeatureOptions), []]
    );
    let historyLog = {
        features: featuresLog,
        rels: [rels, []],
        attrs: [attrs, []]
    };

    await updateFeatures(historyLog);

    return historyLog;
};

/**
 * 打断线要素
 * @method breakLine
 * @param {Object} breakPoint 打断点对象
 * @param {Array<Object>} features 被打断线要素集合
 * @param {Object} activeTask 任务对象
 * @returns {Object} 打断后的操作记录
 */
const breakLine = async (breakPoint, features, activeTask) => {
    let point = geometryToWKT(breakPoint.data.geometry);
    let { lines, oldRels, oldAttrs, oldAllFeatureOptions } = await getLinesInfo(
        features
    );
    let option = { point, lines, task_id: activeTask.taskId };
    let result = await EditorService.breakLines(option);
    let { newFeatures, rels, attrs, newAllFeatureOptions } = getNewFeaturesInfo(
        features,
        result.data
    );

    let featuresLog = calcFeaturesLog(
        [features, newFeatures],
        [uniqOptions(oldAllFeatureOptions), uniqOptions(newAllFeatureOptions)]
    );
    let historyLog = {
        features: featuresLog,
        rels: [uniqRels(oldRels), uniqRels(rels)],
        attrs: [uniqAttrs(oldAttrs), uniqAttrs(attrs)]
    };
    await updateFeatures(historyLog);

    message.success(result.message, 3);
    return historyLog;
};

/**
 * 合并线要素
 * @method mergeLine
 * @param {Array<Object>} features 被合并线要素集合
 * @param {Object} activeTask 任务对象
 * @returns {Object} 合并后的操作记录
 */
const mergeLine = async (features, activeTask) => {
    let { lines, oldRels, oldAttrs, oldAllFeatureOptions } = await getLinesInfo(
        features
    );
    let option = { lines, task_id: activeTask.taskId };
    let result = await EditorService.mergeLines(option);
    let { newFeatures, rels, attrs } = fetchFeatureRels(features, [
        result.data.feature
    ]);
    let newAllFeatureOptions = getAllRelFeatureOptions(rels);

    let featuresLog = calcFeaturesLog(
        [features, newFeatures],
        [uniqOptions(oldAllFeatureOptions), uniqOptions(newAllFeatureOptions)]
    );
    let historyLog = {
        features: featuresLog,
        rels: [uniqRels(oldRels), uniqRels(rels)],
        attrs: [uniqAttrs(oldAttrs), uniqAttrs(attrs)]
    };
    await updateFeatures(historyLog);

    message.success(result.message, 3);
    return historyLog;
};

/**
 * 拉线齐打断线要素
 * @method breakLineByLine
 * @param {Object} line 打断辅助线
 * @param {Array<Object>} features 被打断线要素集合
 * @param {Object} activeTask 任务对象
 * @returns {Object} 打断后的操作记录
 */
const breakLineByLine = async (line, features, activeTask) => {
    let cutLine = geometryToWKT(line.data.geometry);
    let { lines, oldRels, oldAttrs, oldAllFeatureOptions } = await getLinesInfo(
        features
    );
    let option = { cutLine, lines, task_id: activeTask.taskId };
    let result = await EditorService.breakLinesByLine(option);
    let { newFeatures, rels, attrs, newAllFeatureOptions } = getNewFeaturesInfo(
        features,
        result.data
    );

    let featuresLog = calcFeaturesLog(
        [features, newFeatures],
        [uniqOptions(oldAllFeatureOptions), uniqOptions(newAllFeatureOptions)]
    );
    let historyLog = {
        features: featuresLog,
        rels: [uniqRels(oldRels), uniqRels(rels)],
        attrs: [uniqAttrs(oldAttrs), uniqAttrs(attrs)]
    };
    await updateFeatures(historyLog);

    message.success(result.message, 3);
    return historyLog;
};

/**
 * 线要素对齐到停止线
 * @method lineToStop
 * @param {Object} lines 一条或多条线要素
 * @param {Array<Object>} stopLine 停止线
 * @param {Object} layerName 操作图层
 * @param {Object} activeTask 任务对象
 * @returns {Object}
 */

const lineToStop = async (features, stopLine, layerName, activeTask) => {
    const { taskId, processName } = activeTask;
    let stopLineWKT = geometryToWKT(stopLine.data.geometry);
    let { lines } = await getLinesInfo(features);
    const params = {
        stopLine: stopLineWKT,
        processName,
        lines,
        task_id: taskId
    };

    let result = await BatchToolsService.lineToStop(params);
    let newFeatures = calcNewLanes(features, result.data, layerName);
    let historyLog = {
        features: [features, newFeatures]
    };

    await updateFeatures(historyLog);

    message.success({
        content: result.message,
        key: 'line_snap_stop',
        duration: 3
    });
    return historyLog;
};

/**
 * 批量赋车道分组编号
 * @method batchAssignment
 * @param {Object} features 一条或多条线要素
 * @param {Array<Object>} fixLane 方向辅助线
 * @param {Object} layerName 操作图层
 * @param {Object} activeTask 任务对象
 * @returns {Object}
 */

const batchAssignment = async (
    features,
    fixLane,
    layerName,
    startNumber,
    activeTask
) => {
    const { taskId, processName } = activeTask;
    let assignmentLine = geometryToWKT(fixLane.geometry);

    let { lines } = await getLinesInfo(features);
    const params = {
        assignmentLine,
        processName,
        startNumber,
        lines,
        task_id: taskId
    };
    let result = await BatchToolsService.batchAssignment(params);
    let newFeatures = calcNewLanes(features, result.data, layerName);
    let historyLog = {
        features: [features, newFeatures]
    };

    await updateFeatures(historyLog);

    message.success({
        content: result.message,
        key: 'assign_lane_no',
        duration: 3
    });
    return historyLog;
};

const calcNewLanes = (featurs, newFeatures, layerName) => {
    const IDKey = DATA_LAYER_MAP[layerName].id;
    let oldFeatures = _.cloneDeep(featurs);
    let dataMap = (newFeatures || []).reduce((set, item) => {
        const properties = item.attr;
        const geometry = WKTToGeom(item.attr.geom);
        const id = item.attr[IDKey];
        set[id] = {
            properties,
            geometry
        };
        return set;
    }, {});
    oldFeatures.forEach(feature => {
        let id = feature.data.properties[IDKey];
        if (!dataMap[id]) return;
        feature.data.properties = dataMap[id].properties;
        feature.data.geometry = dataMap[id].geometry;
    });
    return oldFeatures;
};

/**
 * 属性刷
 * @param {Object} feature  被复制的线要素
 * @param {Object} copyFeature  复制的线要素
 * @param {string} layerName  操作图层
 * @param {string} processName  任务类型
 */
const copyAttributeLines = async (
    feature,
    copyFeature,
    layerName,
    processName
) => {
    const adLaneDividerKey = [
        //复制属性--车道线
        'TYPE',
        'RD_LINE',
        'SHARE_LINE',
        'RD_EDGE',
        'DIRECTION',
        'LANESTATUS',
        'LANE_TYPE',
        'RD_FORM'
    ];
    const adLaneKey = [
        //复制属性--车道中心线
        'TYPE',
        'DIRECTION',
        'STATUS',
        'MAX_SPEED',
        'MAX_SP_TYP',
        'MIN_SPEED',
        'MIN_SP_TYP'
    ];
    let adKey =
        layerName === 'AD_LaneDivider'
            ? adLaneDividerKey
            : layerName === 'AD_Lane'
            ? adLaneKey
            : [];
    let oldFeature = _.cloneDeep(copyFeature);
    let properties = copyFeature.data.properties;
    let UPD_STAT = copyFeature.data.properties.UPD_STAT
        ? JSON.parse(copyFeature.data.properties.UPD_STAT)
        : {}; //更新标识维护
    Object.keys(properties).forEach(key => {
        if (
            adKey.indexOf(key) !== -1 &&
            properties[key] !== feature.data.properties[key]
        ) {
            properties[key] = feature.data.properties[key];
            if (processName === 'imp_recognition') {
                UPD_STAT[key] = 'MOD';
            }
        }
    });
    if (processName === 'imp_recognition') {
        copyFeature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
    }
    let historyLog = {
        features: [[oldFeature], [copyFeature]]
    };

    await updateFeatures(historyLog);

    return historyLog;
};

/**
 * 路口内中心线/参考线半自动构建
 * @method autoCreateLine
 * @param {String} layerName 操作图层
 * @param {Object} params 构建参数
 * @returns {Object} 半自动构建后的操作记录
 */
const autoCreateLine = async (layerName, params) => {
    let result = {},
        relation = {},
        rels = [];
    if (layerName === 'AD_Lane') {
        //车道中心线
        result = await AdLineService.straightLines(params);
    } else if (layerName === 'AD_Road') {
        //道路参考线
        result = await AdLineService.adTwoRoadLines(params);
    }
    let newFeatures = result.data[layerName].features.reduce(
        (total, feature) => {
            total.push({ data: feature, layerName: layerName });
            return total;
        },
        []
    );

    relation[`${layerName}_Con`] = [];
    relation[`${layerName}_Con`] = result.data[`${layerName}_Con`].features.map(
        feature => feature.properties
    );
    rels = calcRels(`${layerName}_Con`, relation);

    let historyLog = {
        features: [[], newFeatures],
        rels: [[], uniqRels(rels)]
    };

    await updateFeatures(historyLog);

    return historyLog;
};

/**
 * 根据车道线半自动构建中心线/参考线
 * @method autoCreateLineByLaneDivider
 * @param {String} layerName 操作图层
 * @param {Object} params 构建参数
 * @returns {Object} 半自动构建后的操作记录
 */
const autoCreateLineByLaneDivider = async (layerName, params) => {
    let result = {},
        rels = [];
    if (layerName === 'AD_Lane') {
        //车道中心线
        result = await AdLineService.aroundLines(params);
        rels = calcAdLaneRels(result.data.AD_Lane.features[0]);
    } else if (layerName === 'AD_Road') {
        //道路参考线
        result = await AdLineService.adRoadLines(params);
    }
    let newFeatures = result.data[layerName].features.reduce(
        (total, feature) => {
            total.push({ data: feature, layerName: layerName });
            return total;
        },
        []
    );

    let historyLog = {
        features: [[], newFeatures],
        rels: [[], uniqRels(rels)]
    };

    await updateFeatures(historyLog);

    return historyLog;
};

/**
 * 获取被打断/合并线要素的lines相关信息
 * @method getLinesInfo
 * @param {Array<Object>} features 被打断/合并要素集合
 * @returns {Object} 被打断/合并线要素的lines相关信息
 */
const getLinesInfo = async features => {
    let initialInfo = {
        lines: [],
        // 打断/合并 接口所需线要素相关信息
        oldRels: [],
        // features 对应的打断/合并前所有关联关系信息
        oldAttrs: [],
        // features 对应的打断/合并前所有关联属性和关联关系属性信息
        oldAllFeatureOptions: []
        // features 对应的打断/合并前所有存在关联关系的要素 option集合
    };
    return features.reduce(async (total, feature) => {
        let { relation, rels, attrs } = await getRelation(feature);

        let line = {
            type: feature.layerName,
            attr: {
                ...feature.data.properties,
                geom: geometryToWKT(feature.data.geometry)
            },
            relation
        };
        total = await total;
        total.lines.push(line);
        total.oldRels = total.oldRels.concat(rels);
        total.oldAttrs = total.oldAttrs.concat(attrs);

        let allFeatureOptions = getAllRelFeatureOptions(rels);
        total.oldAllFeatureOptions = total.oldAllFeatureOptions.concat(
            allFeatureOptions
        );
        return total;
    }, initialInfo);
};

/**
 * 获取被打断/合并线要素的relation相关信息
 * @method getLinesInfo
 * @param {Array<Object>} feature 被打断/合并要素
 * @returns {Object<Promise>} 查询请求Promise对象，成功返回 被打断/合并线要素的relation相关信息
 */
const getRelation = async feature => {
    let layerName = feature.layerName;
    let rels = await getFeatureRels(layerName, feature.data.properties);
    let attrs = await attrFactory.getFeatureAttrs(
        layerName,
        feature.data.properties
    );
    let relRelation = relRelationFormat(rels, layerName);
    let attrRelation = attrRelationFormat(attrs);
    return {
        relation: {
            ...relRelation,
            ...attrRelation
        },
        rels: rels,
        attrs: attrs
    };
};

/**
 * 获取打断/合并后线要素的相关信息
 * @method getNewFeaturesInfo
 * @param {Array<Object>} features 被打断/合并要素集合
 * @param {Array<Object>} resultData 打断/合并后返回数据
 * @returns {Object} 打断/合并后线要素的相关信息
 */
const getNewFeaturesInfo = (features, resultData) => {
    let initialInfo = {
        newFeatures: [],
        // 打断/合并后 线要素集合
        rels: [],
        // 打断/合并后 所有关联关系信息
        attrs: [],
        // 打断/合并后 所有关联属性和关联关系属性信息
        newAllFeatureOptions: []
        // 打断/合并后 所有存在关联关系的要素 option集合
    };
    return resultData.reduce((total, data) => {
        let { newFeatures, rels, attrs } = fetchFeatureRels(
            features,
            data.features
        );
        total.newFeatures = total.newFeatures.concat(newFeatures);
        total.rels = total.rels.concat(rels);
        total.attrs = total.attrs.concat(attrs);

        let allFeatureOptions = getAllRelFeatureOptions(rels);
        total.newAllFeatureOptions = total.newAllFeatureOptions.concat(
            allFeatureOptions
        );
        return total;
    }, initialInfo);
};

const relRelationFormat = (rels, layerName) => {
    return rels.reduce((total, record) => {
        return relToSpecData(record, layerName, total);
    }, {});
};

const relToSpecData = (record, layerName, total) => {
    let relSpec = REL_SPEC_CONFIG.find(
        rs => rs.objType == record.objType && rs.relObjType == record.relObjType
    );
    let specKey, id;
    if (layerName == relSpec.objSpec) {
        specKey = relSpec.relObjSpec;
        id = record.relObjId;
    } else {
        specKey = relSpec.objSpec;
        id = record.objId;
    }
    let IDKey = getLayerIDKey(specKey);
    let feature = queryFeature(specKey, {
        key: IDKey,
        value: id
    });
    if (!feature) return total;
    let geom = geometryToWKT(feature.data.geometry);
    if (ATTR_REL_DATA_SET.includes(record.spec)) {
        total[specKey] = total[specKey] || [];

        total[specKey].push({
            [IDKey]: id,
            geom,
            ...feature.data.properties
        });
    } else {
        total[record.spec] = total[record.spec] || [];
        total[record.spec].push({
            ...record.extraInfo,
            [relSpec.objKeyName]: record.objId,
            [relSpec.relObjKeyName]: record.relObjId,
            geom,
            properties: feature.data.properties
        });
    }
    return total;
};

const getAllRelFeatureOptions = rels => {
    return rels.flatMap(rel => [
        {
            layerName: rel.objSpec,
            key: getLayerIDKey(rel.objSpec),
            value: rel.objId
        },
        {
            layerName: rel.relObjSpec,
            key: getLayerIDKey(rel.relObjSpec),
            value: rel.relObjId
        }
    ]);
};

const attrRelationFormat = attrs => {
    return attrs.reduce((total, attr) => {
        total[attr.source] = total[attr.source] || [];
        total[attr.source].push(attr.properties);
        return total;
    }, {});
};

const queryFeature = (layerName, option) => {
    let feature = getLayerByName(layerName).getFeatureByOption(option);
    return feature && feature.properties;
};

const fetchFeatureRels = (oldFeatures, features) => {
    let layerName = oldFeatures[0].layerName;
    return calcFeatureRels(layerName, features).reduce(
        (total, fr) => {
            total.newFeatures.push(fr.feature);
            total.rels = total.rels.concat(fr.rels);
            total.attrs = total.attrs.concat(fr.attrs);
            return total;
        },
        { newFeatures: [], rels: [], attrs: [] }
    );
};

const calcFeatureRels = (layerName, features) => {
    features = Array.isArray(features) ? features : [features];
    return features.map(feature => {
        return {
            feature: calcFeatures(feature[layerName], layerName),
            rels: calcRels(layerName, feature.relation, feature[layerName]),
            attrs: calcAttrs(feature.relation)
        };
    });
};

const calcFeatures = (feature, layerName) => {
    let { geom, ...properties } = feature;
    return {
        layerName,
        data: {
            geometry: WKTToGeom(geom),
            properties,
            type: 'Feature'
        }
    };
};

const calcRels = (layerName, relation, feature) => {
    return Object.keys(relation || {}).flatMap(spec => {
        let properties = relation[spec];
        if (REL_DATA_SET.includes(spec)) {
            return relDataFormat(spec, properties);
        } else if (ATTR_REL_DATA_SET.includes(spec)) {
            return attrRelDataFormat(layerName, spec, properties, feature);
        }
        return [];
    });
};

const uniqRels = rels => {
    return _.uniqBy(
        rels,
        rel => rel.objType + rel.objId + rel.relObjType + rel.relObjId
    );
};

const uniqAttrs = attrs => {
    return _.uniqBy(attrs, 'key');
};

const uniqOptions = options => {
    return _.uniqBy(options, 'value');
};

const calcAttrs = relation => {
    return Object.keys(relation || {}).flatMap(spec => {
        if (ATTR_SPEC_CONFIG.map(config => config.source).includes(spec)) {
            return attrsDataFormat(relation[spec], spec);
        }
        return [];
    });
};

const relDataFormat = (spec, properties) => {
    let relSpec = REL_SPEC_CONFIG.find(relSpec => relSpec.source == spec);
    const {
        objKeyName,
        objType,
        relObjKeyName,
        relObjType,
        objSpec,
        relObjSpec
    } = relSpec;
    return properties.map(property => {
        let {
            [objKeyName]: objId,
            [relObjKeyName]: relObjId,
            REL_ID
        } = property;
        return {
            spec,
            objId,
            relObjId,
            objType,
            relObjType,
            objSpec,
            relObjSpec,
            extraInfo: {
                REL_ID,
                CONFIDENCE: DEFAULT_CONFIDENCE_MAP[spec]
            }
        };
    });
};

const attrRelDataFormat = (layerName, spec, properties, feature) => {
    let relSpecs = REL_SPEC_CONFIG.filter(
        rs =>
            (rs.objSpec == spec && rs.relObjSpec == layerName) ||
            (rs.relObjSpec == spec && rs.objSpec == layerName)
    );
    let relSpec;
    let IDKey1 = getLayerIDKey(spec);
    let IDKey2 = getLayerIDKey(layerName);
    return properties.reduce((arr, property) => {
        if (relSpecs.length > 1) {
            relSpec = relSpecs.find(rs => {
                if (rs.objSpec == spec) {
                    return property[rs.relObjKeyName] == feature[IDKey2];
                } else {
                    return property[IDKey1] == feature[rs.relObjKeyName];
                }
            });
        } else {
            relSpec = relSpecs[0];
        }
        if (relSpec) {
            const { objType, relObjType, objSpec, relObjSpec } = relSpec;
            let objId, relObjId;
            if (relSpec.objSpec == spec) {
                objId = property[IDKey1];
                relObjId = property[IDKey2];
            } else {
                objId = property[IDKey2];
                relObjId = property[IDKey1];
            }
            // 关联要素id为空或0时不建关联关系
            if (objId && relObjId) {
                arr.push({
                    spec: relSpec.source,
                    objId,
                    relObjId,
                    objType,
                    relObjType,
                    objSpec,
                    relObjSpec,
                    extraInfo: {
                        CONFIDENCE: DEFAULT_CONFIDENCE_MAP[spec]
                    }
                });
            }
        }
        return arr;
    }, []);
};

const attrsDataFormat = (data, source) => {
    return data.map(d => {
        let config = ATTR_SPEC_CONFIG.find(c => c.source == source);
        return {
            source,
            spec: config.relSpec,
            properties: d,
            key: d[config.key],
            sourceId: d[config.sourceId]
        };
    });
};

const updateFeatures = async ({ features, rels, attrs } = {}) => {
    let [oldFeatures, newFeatures] = features;
    let updateFeatures = [];
    let featuresMap = getFeaturesMap([...oldFeatures, ...newFeatures]);
    newFeatures.forEach(feature => {
        let layer = featuresMap[feature.layerName];
        let option = getFeatureOption(feature);
        let _feature = layer.getFeatureByOption(option);
        if (_feature) {
            updateFeatures.push(option.key + option.value);
            feature = {
                ..._feature.properties,
                data: feature.data
            };
            layer.updateFeatures([feature]);
        } else {
            layer.addFeatures([feature.data]);
        }
    });
    if (rels) {
        await updateRels(rels);
    }
    if (attrs) {
        await attrFactory.replaceAttrs(attrs);
    }
    oldFeatures.forEach(feature => {
        let layer = featuresMap[feature.layerName];
        let option = getFeatureOption(feature);
        if (updateFeatures.includes(option.key + option.value)) return;
        layer.removeFeatureByOption(option);
    });
    return { features, rels, attrs };
};

const updateRels = async ([oldRels, newRels] = []) => {
    let relStore = Relevance.store;
    let oldRelIds = await oldRels.reduce(async (total, record) => {
        total = await total;
        let _record = await relStore.get(
            [record.objType, record.objId, record.relObjType, record.relObjId],
            'REL_KEYS'
        );
        total.push(_record.id);
        return total;
    }, []);
    await Promise.all(oldRelIds.map(id => relStore.deleteById(id)));
    await relStore.batchAdd(newRels);
    updateFeaturesByRels(oldRels, true);
    updateFeaturesByRels(newRels);
};

/**
 * 计算打断/合并前后产生变更的要素集合
 * @method calcFeaturesLog
 * @param {Array<Object>} features [被打断/合并要素集合, 打断/合并后要素集合]
 * @param {Array<Object>} allFeatureOptions [被打断/合并要素与其关联要素的option集合, 打断/合并后要素与其关联要素的option集合]
 * @returns {Array<Object>} 打断/合并前后产生变更的要素集合
 */
const calcFeaturesLog = (features, allFeatureOptions) => {
    let [oldFeatures, newFeatures] = features;
    let [oldAllFeatureOptions, newAllFeatureOptions] = allFeatureOptions;
    let oldFeaturesIds = oldFeatures.map(
        feature => getFeatureOption(feature).value
    );
    let relFeatureOptions = oldAllFeatureOptions.filter(option => {
        return !oldFeaturesIds.includes(option.value);
    });
    let relFeatures = relFeatureOptions.flatMap(option => {
        let feature = getLayerByName(option.layerName).getFeatureByOption(
            option
        );
        return feature ? feature.properties : [];
    });
    let newRelFeatures = relFeatures.map(feature => {
        return completeProperties(feature);
    });
    let newAllFeaturesIds = newAllFeatureOptions.map(option => option.value);
    let { newWithRelFeatures, newWithoutRelFeatures } = newFeatures.reduce(
        (total, feature) => {
            if (newAllFeaturesIds.includes(getFeatureOption(feature).value)) {
                total.newWithRelFeatures.push(feature);
            } else {
                total.newWithoutRelFeatures.push(feature);
            }
            return total;
        },
        { newWithRelFeatures: [], newWithoutRelFeatures: [] }
    );
    newWithRelFeatures = newWithRelFeatures.map(feature => {
        return completeProperties(feature, {
            UPD_STAT: '{"GEOMETRY":"ADD","RELATION":"MOD"}'
        });
    });
    newWithoutRelFeatures = newWithoutRelFeatures.map(feature => {
        return completeProperties(feature, {
            UPD_STAT: '{"GEOMETRY":"ADD"}'
        });
    });
    return [
        [...oldFeatures, ...relFeatures],
        [...newWithRelFeatures, ...newWithoutRelFeatures, ...newRelFeatures]
    ];
};

/**
 * 计算 左右车道线生成中心线 后中心线 的关联关系
 * @method calcAdLaneRels
 * @param {Object} feature 车道中心线要素
 * @returns {Array<Object>} 左右车道线生成中心线 后中心线 的关联关系
 */
const calcAdLaneRels = feature => {
    let properties = feature.properties;
    return [
        {
            spec: 'AD_Lane',
            objId: properties.LANE_ID,
            relObjId: properties.L_LDIV_ID,
            objType: 'LANE',
            relObjType: 'L_LDIV',
            objSpec: 'AD_Lane',
            relObjSpec: 'AD_LaneDivider',
            extraInfo: {}
        },
        {
            spec: 'AD_Lane',
            objId: properties.LANE_ID,
            relObjId: properties.R_LDIV_ID,
            objType: 'LANE',
            relObjType: 'R_LDIV',
            objSpec: 'AD_Lane',
            relObjSpec: 'AD_LaneDivider',
            extraInfo: {}
        }
    ];
};

const getFeaturesMap = features => {
    let featureLayerNames = features.map(feature => feature.layerName);
    featureLayerNames = _.uniq(featureLayerNames);
    return featureLayerNames.reduce((total, layerName) => {
        total[layerName] = getLayerByName(layerName);
        return total;
    }, {});
};

const geometryToWKT = geometry => {
    if (geometry.type == 'LineString') {
        let geomStr = geometry.coordinates
            .reduce((arr, coordinate) => {
                arr.push(coordinate.join(' '));
                return arr;
            }, [])
            .join(',');
        return 'LINESTRING(' + geomStr + ')';
    } else if (geometry.type == 'Point') {
        let geomStr = geometry.coordinates.join(' ');
        return 'POINT(' + geomStr + ')';
    } else if (geometry.type == 'Polygon') {
        let geomStr = geometry.coordinates[0]
            .reduce((arr, coordinate) => {
                arr.push(coordinate.join(' '));
                return arr;
            }, [])
            .join(',');
        return 'POLYGON((' + geomStr + '))';
    }
};

const WKTToGeom = wkt => {
    let geoJson = {};
    if (wkt.startsWith('POLYGON')) {
        geoJson['type'] = 'Polygon';
        let firstLeftIndex = wkt.indexOf('(');
        let str = wkt.substring(firstLeftIndex + 2, wkt.length - 2);
        // 去掉首尾括号
        geoJson['coordinates'] = str.split(',').reduce((arr, pointStr) => {
            arr.push(pointStr.split(' ').map(parseFloat));
            return arr;
        }, []);
    } else if (wkt.startsWith('POINT')) {
        geoJson['type'] = 'Point';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(' ').map(parseFloat);
    } else if (wkt.startsWith('LINESTRING')) {
        geoJson['type'] = 'LineString';
        let firstLeftIndex = wkt.indexOf('(');
        // 去掉首尾括号
        let str = wkt.substring(firstLeftIndex + 1, wkt.length - 1);
        geoJson['coordinates'] = str.split(',').reduce((arr, pointStr) => {
            arr.push(pointStr.split(' ').map(parseFloat));
            return arr;
        }, []);
    }
    return geoJson;
};

export {
    deleteLine,
    breakLine,
    mergeLine,
    lineToStop,
    batchAssignment,
    autoCreateLine,
    updateFeatures,
    updateRels,
    breakLineByLine,
    autoCreateLineByLaneDivider,
    getAllRelFeatureOptions,
    uniqOptions,
    copyAttributeLines
};
