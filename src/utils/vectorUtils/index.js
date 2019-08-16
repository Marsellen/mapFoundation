import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

export const getLayerIDKey = layerName => {
    return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
};
