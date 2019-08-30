import { getLayerByName } from '../vectorUtils';

export const getLayerItems = layerName => {
    if (!layerName) {
        return [];
    }
    let layer = getLayerByName(layerName);
    return layer.getVectorData().features.map(feature => feature.properties);
};
