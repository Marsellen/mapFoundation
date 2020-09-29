import { VectorLayer } from 'addis-viz-sdk';
import Axios from 'axios';
import { QualityLayerConfig } from 'src/config/QualityLayerConfig';

export const loadQualityLayer = async (url, key) => {
    let { data } = await Axios.get(url);
    let { name, features } = data;
    let layerConfig = QualityLayerConfig[key || name] || {};
    let vectorLayer = new VectorLayer(null, { layerConfig });
    vectorLayer.setMap(window.map);
    vectorLayer.addFeatures(features);
    return vectorLayer;
};
