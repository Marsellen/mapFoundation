import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { ATTR_REL_DATA_SET } from 'src/config/RelsConfig';
import Relevance from 'src/models/relevance';
import Attr from 'src/models/attr';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import _ from 'lodash';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import { message } from 'antd';
const jsts = require('jsts');

export const getLayerIDKey = layerName => {
    return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
};

export const getFeatureInfo = feature => {
    let layerName = feature.layerName;
    let properties = feature.data.properties;
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    return {
        layerName,
        key: IDKey,
        value: id
    };
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
    if (Array.isArray(layerName)) {
        return layers.filter(layer => layerName.includes(layer.layerName));
    } else {
        return layers.filter(layer => layer.layerName == layerName);
    }
};

export const getAllChooseLayersExByName = layerName => {
    let layers = window.vectorLayerGroup.layers;
    if (window.boundaryLayerGroup) {
        layers = layers.concat(window.boundaryLayerGroup.layers);
    }
    return layers.filter(layer => layer.layerName != layerName);
};

export const getLayerExByName = layerName => {
    if (layerName === 'AD_Marker') {
        return window.markerLayer;
    } else {
        return window.vectorLayerGroup.layers.find(layer => layer.layerName == layerName);
    }
};

export const getLayerByName = layerName => {
    return getLayerExByName(layerName).layer;
};

//根据传入的图层名数据返回图层数组
export const getLayersByNames = layerNames => {
    const layers = window.vectorLayerGroup.layers.filter(layer =>
        layerNames.includes(layer.layerName)
    );
    if (layerNames.includes('AD_Marker')) {
        layers.push(window.markerLayer);
    }
    return layers;
};

export const updateFeatureColor = (layerName, option, color) => {
    let [layer] = getFeatureByOptionFormAll(layerName, option);
    layer && layer.updateFeatureColor(option, color);
};

export const getFeatureByOptionFormAll = (layerName, option) => {
    if (window.vectorLayerGroup) {
        let vectorLayer = window.vectorLayerGroup.layers.find(layer => layer.layerName == layerName)
            .layer;
        let vectorFeature = vectorLayer && vectorLayer.getFeatureByOption(option);
        if (vectorFeature) {
            return [vectorLayer, vectorFeature.properties];
        }
    }
    if (window.boundaryLayerGroup) {
        let boundaryLayer = window.boundaryLayerGroup.layers.find(
            layer => layer.layerName == layerName
        ).layer;
        let boundaryFeature = boundaryLayer && boundaryLayer.getFeatureByOption(option);
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
            geojson.geometry.coordinates = getSingleDimensionArray(geojson.geometry.coordinates);
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
            vectorData.features[i].features = vectorData.features[i].features.concat(
                boundaryData.features[i].features
            );
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
    let _feature = _.cloneDeep(feature);
    if (config && config.UPD_STAT) {
        _feature.data.properties.UPD_STAT = config && config.UPD_STAT;
    } else {
        _feature = modUpdStatRelation(_feature);
    }
    if (!_feature.data.properties.CONFIDENCE) {
        _feature = completeConfidence(_feature);
    }
    Object.assign(_feature.data.properties, {
        COLL_TIME: '',
        MAKE_TIME: ''
    });
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
    if (DEFAULT_CONFIDENCE_MAP[feature.layerName]) {
        feature.data.properties.CONFIDENCE = DEFAULT_CONFIDENCE_MAP[feature.layerName];
    }
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

export const getDiffFields = (feature, properties) => {
    let modFields = [];
    let oldProperties = feature.data.properties;
    Object.keys(properties).forEach(key => {
        if (Array.isArray(oldProperties[key]) && Array.isArray(properties[key])) {
            if (JSON.stringify(oldProperties[key]) !== JSON.stringify(properties[key])) {
                modFields.push(key);
            }
        } else if (oldProperties[key] !== properties[key]) {
            modFields.push(key);
        }
    });
    return modFields;
};

export const modUpdStatPropertiesFields = (feature, fields) => {
    let UPD_STAT = {};
    if (feature.data.properties.UPD_STAT) {
        UPD_STAT = JSON.parse(feature.data.properties.UPD_STAT);
    }
    fields.forEach(fieldName => {
        UPD_STAT[fieldName] = 'MOD';
    });
    feature.data.properties.UPD_STAT = JSON.stringify(UPD_STAT);
    return feature;
};

export const getAllDataSnapshot = async isCurrent => {
    let vectorData = getAllVectorData(true);
    let vectorFeatures = vectorData.features;
    let attrRecords = await Attr.store.getAll();
    if (isCurrent) {
        attrRecords = attrRecords.filter(record => record.dataType !== 'boundary');
    }
    let attrFeatures = attrFactory.attrTableToData(attrRecords);

    let relRecords = await Relevance.store.getAll();
    if (isCurrent) {
        relRecords = relRecords.filter(record => record.dataType !== 'boundary');
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
            throw new Error(`${feature.layerName}要素${option.value}不存在，请检查数据`);
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

//显示检查log错误位置
export const markCheckItem = record => {
    try {
        window.checkLayer.layer.clear();
        const geom = JSON.parse(record.geom);
        const checkFeatures = geom.map(item => {
            return { geometry: item, properties: {}, type: 'Feature' };
        });
        window.checkLayer.layer.addFeatures(checkFeatures);
    } catch (e) {
        console.log(`显示检查log错误位置异常：${e.message || e}`);
    }
};

// 通过质检项定位
export const locateCheckItem = (record, isDoubleClick) => {
    // 定位，判断是否为可定位图层
    let { geom, location } = record;
    try {
        location = JSON.parse(location);
        let IDKey = getLayerIDKey(location.layerName);
        let option = {
            key: IDKey,
            value: Number(location.featureId)
        };
        let layer = getLayerByName(location.layerName);
        let feature = layer.getFeatureByOption(option).properties;
        if (isDoubleClick) {
            let extent = window.map.getExtent(feature.data.geometry);
            window.map.setView('U');
            window.map.setExtent(extent);
        }
        return feature;
    } catch (e) {
        if (isDoubleClick) {
            try {
                geom = JSON.parse(geom);
                let extent = window.map.getExtent(geom[0]);
                window.map.setView('U');
                window.map.setExtent(extent);
            } catch (e) {
                message.error('检查项定位失败');
            }
        }
    }
};
