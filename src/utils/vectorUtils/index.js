import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import Relevance from 'src/models/relevance';
import Attr from 'src/models/attr';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import { isManbuildTask } from 'src/utils/taskUtils';
import _ from 'lodash';
import { DEFAULT_CONFIDENCE_MAP } from 'src/config/ADMapDataConfig';
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

export const getLayerExByName = layerName => {
    return vectorLayerGroup.layers.find(layer => layer.layerName == layerName);
};

export const getLayerByName = layerName => {
    return getLayerExByName(layerName).layer;
};

export const updateFeatureColor = (layerName, option, color) => {
    let [layer] = getFeatureByOptionFormAll(layerName, option);
    layer && layer.updateFeatureColor(option, color);
};

export const getFeatureByOptionFormAll = (layerName, option) => {
    let vectorLayer = vectorLayerGroup.layers.find(
        layer => layer.layerName == layerName
    ).layer;
    let vectorFeature = vectorLayer && vectorLayer.getFeatureByOption(option);
    if (vectorFeature) {
        return [vectorLayer, vectorFeature.properties];
    }
    let boundaryLayer = boundaryLayerGroup.layers.find(
        layer => layer.layerName == layerName
    ).layer;
    let boundaryFeature =
        boundaryLayer && boundaryLayer.getFeatureByOption(option);
    if (boundaryFeature) {
        return [boundaryLayer, boundaryFeature.properties];
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

export const getAllVectorData = () => {
    return vectorLayerGroup.getAllVectorData();
};

export const getAllRelData = async () => {
    let attrRels = getAllVectorData().features.filter(features =>
        ATTR_REL_DATA_SET.includes(features.name)
    );
    let records = await Relevance.store.getAll();
    let data = relFactory.relTableToData(records);

    return {
        features: attrRels.concat(data),
        type: 'FeatureCollection',
        properties: vectorLayerGroup.properties
    };
};

export const getAllAttrData = async () => {
    let records = await Attr.store.getAll();
    let data = attrFactory.attrTableToData(records);

    return {
        features: data,
        type: 'FeatureCollection',
        properties: vectorLayerGroup.properties
    };
};

export const completeProperties = (feature, task, config) => {
    let isManbuild = isManbuildTask(task);
    let _feature = _.cloneDeep(feature);
    if (isManbuild) {
        if (!_feature.data.properties.UPD_STAT) {
            _feature.data.properties.UPD_STAT = '{}';
        }
        if (!_feature.data.properties.CONFIDENCE) {
            _feature.data.properties.CONFIDENCE =
                DEFAULT_CONFIDENCE_MAP[_feature.layerName] || '{}';
        }
    } else {
        if (config && config.UPD_STAT) {
            _feature.data.properties.UPD_STAT = config && config.UPD_STAT;
        } else if (!_feature.data.properties.UPD_STAT) {
            _feature.data.properties.UPD_STAT = '{"RELATION":"MOD"}';
        } else {
            let UPD_STAT = JSON.parse(_feature.data.properties.UPD_STAT);
            UPD_STAT.RELATION = 'MOD';
            _feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
        }
        if (!_feature.data.properties.CONFIDENCE) {
            _feature.data.properties.CONFIDENCE =
                DEFAULT_CONFIDENCE_MAP[_feature.layerName] || '{}';
        }
    }
    return _feature;
};
