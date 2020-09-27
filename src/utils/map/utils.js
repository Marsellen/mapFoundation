import { VectorLayer } from 'addis-viz-sdk';
import Axios from 'axios';
import LAYER_CONFIG from 'src/config/VectorsConfig';

export const loadVector = async (url, key) => {
    let { data } = await Axios.get(url);
    let { name, features } = data;
    let layerConfig = LAYER_CONFIG[key || name] || {};
    let vectorLayer = new VectorLayer(null, { layerConfig });
    vectorLayer.setMap(window.map);
    vectorLayer.addFeatures(features);
    return vectorLayer;
};
