import { getLayerByName } from '../vectorUtils';

export const getLayerItems = layerName => {
    let layer = getLayerByName(layerName);
    return layer.features.map(feature => feature.properties);
};
