import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

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
