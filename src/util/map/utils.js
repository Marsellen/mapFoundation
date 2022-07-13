import { VectorLayer } from '@ad/xmap';
import Axios from 'axios';
import { QualityLayerConfig } from 'src/config/qualityLayerConfig';
import TaskStore from 'src/store/home/taskStore';
import { getVector, crossProduct, calculation, multiply3 } from '../matrix';
import { mercatorToWgs84, wgs84ToGeocent } from 'src/util/utils';

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

export function calcMercatorScale(coord1, coord2) {
    var wgs84_1 = mercatorToWgs84(coord1[0], coord1[1], coord1[2]);
    var wgs84_2 = mercatorToWgs84(coord2[0], coord2[1], coord2[2]);

    var geo_1 = wgs84ToGeocent(wgs84_1[0], wgs84_1[1], wgs84_1[2]);
    var geo_2 = wgs84ToGeocent(wgs84_2[0], wgs84_2[1], wgs84_2[2]);
    var carDis =
        Math.sqrt(
            Math.pow(geo_2[0] - geo_1[0], 2) +
            Math.pow(geo_2[1] - geo_1[1], 2) +
            Math.pow(geo_2[2] - geo_1[2], 2)
        ).toFixed(2) * 1;

    var mecDis = new THREE.Vector3(coord1[0], coord1[1], coord1[2]).distanceTo(
        new THREE.Vector3(coord2[0], coord2[1], coord2[2])
    );
    var ratio = mecDis / carDis;
    return ratio;
}

export function calcCurrentScaleTemplate(coordinates, templateScale, scale) {
    return coordinates.map(coordinate => {
        const [x, y, z] = coordinate;
        return [
            (x / templateScale) * scale,
            (y / templateScale) * scale,
            (z / templateScale) * scale
        ];
    });
}
