import { getLayerByName, getLayerIDKey } from '../vectorUtils';

export const getLayerItems = layerName => {
    if (!layerName) {
        return [];
    }
    let layer = getLayerByName(layerName);
    let IDKey = getLayerIDKey(layerName);
    return layer
        .getVectorData()
        .features.sort(function(a, b) {
            return (
                parseInt(a.properties[IDKey]) - parseInt(b.properties[IDKey])
            );
        })
        .map((feature, index) => {
            return { ...feature.properties, index: index + 1 };
        });
};
