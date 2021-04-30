import { VectorLayer } from 'addis-viz-sdk';
import Axios from 'axios';
import { QualityLayerConfig } from 'src/config/qualityLayerConfig';
import TaskStore from 'src/store/home/taskStore';
import { getVector, crossProduct, calculation, multiply3 } from '../matrix';

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

const tempNormal = [0, 0, 1];

export const clacTempArrow = (referencePoints, template) => {
    let vector1 = getVector(referencePoints[1], referencePoints[2]);
    let vector2 = getVector(referencePoints[1], referencePoints[0]);
    let normal = crossProduct(vector1, vector2);

    const matrix1 = calculation(tempNormal, normal);
    let points = template.map(point => multiply3(matrix1, point));

    let direction = getVector(points[0], points[1]);
    const matrix2 = calculation(direction, vector1);
    points = points.map(point => {
        point = multiply3(matrix2, point);
        return point.map((p, index) => p + referencePoints[1][index]);
    });
    return points;
};
