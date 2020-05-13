import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import Relevance from 'src/models/relevance';
import Attr from 'src/models/attr';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import { isManbuildTask } from 'src/utils/taskUtils';
import _ from 'lodash';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import TaskStore from 'src/pages/Index/store/TaskStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
const jsts = require('jsts');

export const getLayerIDKey = layerName => {
    return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
};

export const getFeatureOption = feature => {
    let layerName = feature.layerName;
    let properties = feature.data.properties;
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    return {
        key: IDKey,
        value: id
    };
};

export const getAllLayersExByName = layerName => {
    let layers = window.vectorLayerGroup.layers;
    if (window.boundaryLayerGroup) {
        layers = layers.concat(window.boundaryLayerGroup.layers);
    }
    return layers.filter(layer => layer.layerName == layerName);
};

export const getLayerExByName = layerName => {
    return window.vectorLayerGroup.layers.find(
        layer => layer.layerName == layerName
    );
};

export const getLayerByName = layerName => {
    return getLayerExByName(layerName).layer;
};

export const updateFeatureColor = (layerName, option, color) => {
    let [layer] = getFeatureByOptionFormAll(layerName, option);
    layer && layer.updateFeatureColor(option, color);
};

export const getFeatureByOptionFormAll = (layerName, option) => {
    if (window.vectorLayerGroup) {
        let vectorLayer = window.vectorLayerGroup.layers.find(
            layer => layer.layerName == layerName
        ).layer;
        let vectorFeature =
            vectorLayer && vectorLayer.getFeatureByOption(option);
        if (vectorFeature) {
            return [vectorLayer, vectorFeature.properties];
        }
    }
    if (window.boundaryLayerGroup) {
        let boundaryLayer = window.boundaryLayerGroup.layers.find(
            layer => layer.layerName == layerName
        ).layer;
        let boundaryFeature =
            boundaryLayer && boundaryLayer.getFeatureByOption(option);
        if (boundaryFeature) {
            return [boundaryLayer, boundaryFeature.properties];
        }
    }

    return [];
};

//处理多维数组，[[[1,2]]]=>[1,2]
const getSingleDimensionArray = arr => {
    try {
        if (arr[0] && arr[0][0] && typeof arr[0][0] === 'number') {
            return arr;
        } else {
            return getSingleDimensionArray(arr[0]);
        }
    } catch {
        console.error('请传入多维数组，例：[[[1,2]]]');
    }
};

//polygon geojson 转换成 lineString geojson
const toLineStringGeojson = geojson => {
    try {
        if (geojson.geometry.type === 'Polygon') {
            geojson.geometry.type = 'LineString';
            geojson.geometry.coordinates = getSingleDimensionArray(
                geojson.geometry.coordinates
            );
        }
        return geojson;
    } catch {
        console.error('请传到有效的geojson');
    }
};

export const regionCheck = data => {
    let isLocal = TaskStore.activeTask.isLocal;
    if (isLocal) return;
    //判断要素是否在任务范围内
    const elementGeojson = _.cloneDeep(data.data);
    let isInRegion = isRegionContainsElement(
        elementGeojson,
        DataLayerStore.regionGeojson
    );
    if (!isInRegion) {
        throw new Error('绘制失败，请在任务范围内绘制');
    }
};

/*
 * 判断要素是否在任务范围内，返回true/false
 * @param element 要素的geojson
 * @param region 任务范围的geojson
 */
export const isRegionContainsElement = (element, region) => {
    console.time('Is region contains element');

    if (!element || !region) {
        console.error('缺少要素或者任务范围');
        return false;
    }

    const { geometry: elementGeometry } = toLineStringGeojson(element);
    const { geometry: regionGeometry } = region;

    if (!elementGeometry || !regionGeometry) {
        console.error('无效的要素或者任务范围');
        return false;
    }

    const reader = new jsts.io.GeoJSONReader();
    const elementJsts = reader.read(elementGeometry);
    const regionJsts = reader.read(regionGeometry);
    const isRegionContainsElementRes = regionJsts.contains(elementJsts);

    console.timeEnd('Is region contains element');

    return isRegionContainsElementRes;
};

export const getAllVectorData = isCurrent => {
    if (isCurrent) {
        return window.vectorLayerGroup.getAllVectorData();
    }

    let vectorData = window.vectorLayerGroup.getAllVectorData();
    if (window.boundaryLayerGroup) {
        vectorData = _.cloneDeep(vectorData);
        let boundaryData = window.boundaryLayerGroup.getAllVectorData();
        // 因为vectorData和boundaryData的结构一致，故用此法
        for (let i = 0; i < vectorData.features.length; i++) {
            vectorData.features[i].features = vectorData.features[
                i
            ].features.concat(boundaryData.features[i].features);
        }
    }

    return vectorData;
};

export const getAllRelData = async isCurrent => {
    let attrRels = getAllVectorData(isCurrent).features.filter(features =>
        ATTR_REL_DATA_SET.includes(features.name)
    );
    let records = await Relevance.store.getAll();
    if (isCurrent) {
        records = records.filter(record => record.dataType !== 'boundary');
    }
    let data = relFactory.relTableToData(records);

    return {
        features: attrRels.concat(data),
        type: 'FeatureCollection',
        properties: vectorLayerGroup.properties
    };
};

export const getAllAttrData = async isCurrent => {
    let records = await Attr.store.getAll();
    if (isCurrent) {
        records = records.filter(record => record.dataType !== 'boundary');
    }
    let data = attrFactory.attrTableToData(records);

    return {
        features: data,
        type: 'FeatureCollection',
        properties: vectorLayerGroup.properties
    };
};

export const completeProperties = (feature, config) => {
    let isManbuild = isManbuildTask();
    let _feature = _.cloneDeep(feature);
    if (isManbuild) {
        if ((config && config.UPD_STAT) || !_feature.data.properties.UPD_STAT) {
            _feature.data.properties.UPD_STAT = '{}';
        }
        if (!_feature.data.properties.CONFIDENCE) {
            _feature = completeConfidence(_feature);
        }
    } else {
        if (config && config.UPD_STAT) {
            _feature.data.properties.UPD_STAT = config && config.UPD_STAT;
        } else {
            _feature = modUpdStatRelation(_feature);
        }
        if (!_feature.data.properties.CONFIDENCE) {
            _feature = completeConfidence(_feature);
        }
    }
    return _feature;
};

export const modUpdStatRelation = feature => {
    if (feature.data.properties.UPD_STAT) {
        let UPD_STAT = JSON.parse(feature.data.properties.UPD_STAT);
        UPD_STAT.RELATION = 'MOD';
        feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
    } else {
        feature.data.properties.UPD_STAT = '{"RELATION":"MOD"}';
    }
    return feature;
};

export const completeConfidence = feature => {
    feature.data.properties.CONFIDENCE =
        DEFAULT_CONFIDENCE_MAP[feature.layerName] || '{}';
    return feature;
};

export const modUpdStatGeometry = feature => {
    if (feature.data.properties.UPD_STAT) {
        let UPD_STAT = JSON.parse(feature.data.properties.UPD_STAT);
        if (UPD_STAT.GEOMETRY !== 'ADD') {
            UPD_STAT.GEOMETRY = 'MOD';
        }
        feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
    } else {
        feature.data.properties.UPD_STAT = '{"GEOMETRY":"MOD"}';
    }
    return feature;
};

export const modUpdStatProperties = (feature, properties) => {
    if (feature.layerName === 'AD_Map_QC') return feature;
    let UPD_STAT = {};
    if (feature.data.properties.UPD_STAT) {
        UPD_STAT = JSON.parse(feature.data.properties.UPD_STAT);
    }
    let oldProperties = feature.data.properties;
    Object.keys(properties).forEach(key => {
        if (oldProperties[key] !== properties[key]) {
            UPD_STAT[key] = 'MOD';
        }
    });
    feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
    return feature;
};

export const getAllDataSnapshot = async isCurrent => {
    let vectorData = getAllVectorData(true);
    let vectorFeatures = vectorData.features;
    let attrRecords = await Attr.store.getAll();
    if (isCurrent) {
        attrRecords = attrRecords.filter(
            record => record.dataType !== 'boundary'
        );
    }
    let attrFeatures = attrFactory.attrTableToData(attrRecords);

    let relRecords = await Relevance.store.getAll();
    if (isCurrent) {
        relRecords = relRecords.filter(
            record => record.dataType !== 'boundary'
        );
    }
    let relFeatures = relFactory.relTableToData(relRecords);

    let allFeatures = vectorFeatures.concat(attrFeatures).concat(relFeatures);
    return allFeatures.map(f => {
        return {
            [f.name]: f.features.map(feature => feature.properties)
        };
    });
};

export const layerUpdateFeatures = (layer, features) => {
    features.forEach(feature => {
        let option = getFeatureOption(feature);
        let result = layer.getFeatureByOption(option);
        if (result) {
            // 使用sdk内部数据的外衣,防止数据变更过程中外衣属性丢失或uuid变更
            feature = {
                ...result.properties,
                data: feature.data
            };
        } else {
            throw new Error(
                `${feature.layerName}要素${option.value}不存在，请检查数据`
            );
        }
    });
    layer.updateFeatures(features);
};

export const checkSdkError = (result, message) => {
    if (result.errorCode) {
        // 解析sdk抛出异常信息
        if (!message) {
            let arr = result.desc.split(':');
            message = arr[arr.length - 1];
        }

        throw new Error(message);
    }
};
