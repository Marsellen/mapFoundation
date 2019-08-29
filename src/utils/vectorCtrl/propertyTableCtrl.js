import { getLayerByName } from '../vectorUtils';

export const getLayerItems = layerName => {
    let layer = getLayerByName(layerName);
    return layer.getVectorData().features.map(feature => feature.properties);
};
