import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
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

/*
 * 判断要素是否在任务范围内，返回true/false
 * @params element 要素的geojson
 * @params region 任务范围的geojson
 */
export const isRegionContainsElement = (element, region) => {
    console.time('Is region contains element');

    if (!element || !region) {
        console.warn('缺少要素或者任务范围')
        return false
    };

    const { geometry: elementGeometry } = element;
    const { geometry: regionGeometry } = region;

    if (!elementGeometry || !regionGeometry) {
        console.warn('无效的要素或者任务范围')
        return false;
    }

    const reader = new jsts.io.GeoJSONReader();
    const elementJsts = reader.read(elementGeometry);
    const regionJsts = reader.read(regionGeometry);
    const isRegionContainsElementRes = regionJsts.contains(elementJsts);

    console.timeEnd('Is region contains element');

    return isRegionContainsElementRes;
};
