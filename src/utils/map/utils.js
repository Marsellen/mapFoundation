import { VectorLayer } from 'addis-viz-sdk';
import Axios from 'axios';
import { QualityLayerConfig } from 'src/config/QualityLayerConfig';
import TaskStore from 'src/pages/Index/store/TaskStore';

export const loadQualityLayer = async (url, key) => {
    let { data } = await Axios.get(url);
    let { name, features } = data;
    let layerConfig = QualityLayerConfig[key || name] || {};
    let vectorLayer = new VectorLayer(null, { layerConfig });
    vectorLayer.setMap(window.map);
    vectorLayer.addFeatures(features);
    return vectorLayer;
};

export const fetchCallback = response => {
    if (Array.isArray(response)) {
        const isError = response.some(item => item.error);
        if (!isError) return;
    } else {
        const { status } = response;
        if (status && status.code === 200) return;
    }
    throw new Error(TaskStore.activeTaskId);
};
