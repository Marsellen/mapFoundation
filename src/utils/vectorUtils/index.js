import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getAuthentication } from 'src/utils/Session';
const jsts = require('jsts');

export const getLayerIDKey = layerName => {
    return DATA_LAYER_MAP[layerName] ? DATA_LAYER_MAP[layerName].id : 'id';
};

export const getFeatureOption = feature => {
    let layerName = feature.layerName;
    let properties = feature.data.properties;
    let IDKey = getLayerIDKey(layerName);
    let id = properties[IDKey];
    return {
        key: IDKey,
        value: id
    };
};

export const getLayerExByName = layerName => {
    return vectorLayerGroup.layers.find(layer => layer.layerName == layerName);
};

export const getLayerByName = layerName => {
    return getLayerExByName(layerName).layer;
};

//处理多维数组，[[[1,2]]]=>[1,2]
const getSingleDimensionArray = arr => {
    try {
        if (arr[0] && arr[0][0] && typeof arr[0][0] === 'number') {
            return arr;
        } else {
            return getSingleDimensionArray(arr[0]);
        }
    } catch {
        console.error('请传入多维数组，例：[[[1,2]]]');
    }
};

//polygon geojson 转换成 lineString geojson
const toLineStringGeojson = geojson => {
    try {
        if (geojson.geometry.type === 'Polygon') {
            geojson.geometry.type = 'LineString';
            geojson.geometry.coordinates = getSingleDimensionArray(
                geojson.geometry.coordinates
            );
        }
        return geojson;
    } catch {
        console.error('请传到有效的geojson');
    }
};

/*
 * 判断要素是否在任务范围内，返回true/false
 * @params element 要素的geojson
 * @params region 任务范围的geojson
 */
export const isRegionContainsElement = (element, region) => {
    console.time('Is region contains element');

    if (!element || !region) {
        console.error('缺少要素或者任务范围');
        return false;
    }

    const { geometry: elementGeometry } = toLineStringGeojson(element);
    const { geometry: regionGeometry } = region;

    if (!elementGeometry || !regionGeometry) {
        console.error('无效的要素或者任务范围');
        return false;
    }

    const reader = new jsts.io.GeoJSONReader();
    const elementJsts = reader.read(elementGeometry);
    const regionJsts = reader.read(regionGeometry);
    const isRegionContainsElementRes = regionJsts.contains(elementJsts);

    console.timeEnd('Is region contains element');

    return isRegionContainsElementRes;
};

export const setLocalStorage = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
};

export const getLocalStorage = (key, isToJsonObj) => {
    const value = localStorage.getItem(key);
    if (isToJsonObj) {
        return JSON.parse(value);
    } else {
        return value;
    }
};

export const removeLocalStorage = key => {
    localStorage.removeItem(key);
};

export const setTaskScaleStorage = (taskId, taskScale) => {
    const { username } = getAuthentication();
    const taskScalesCenter = getLocalStorage('taskScalesCenter', true) || {};
    taskScalesCenter[username] = taskScalesCenter[username] || {};
    taskScalesCenter[username][taskId] = taskScale;
    setLocalStorage('taskScalesCenter', taskScalesCenter);
};

export const getTaskScaleStorage = taskId => {
    const { username } = getAuthentication();
    const taskScalesCenter = getLocalStorage('taskScalesCenter', true) || null;
    if (
        taskScalesCenter &&
        taskScalesCenter[username] &&
        taskScalesCenter[username][taskId]
    ) {
        return taskScalesCenter[username][taskId];
    } else {
        return false;
    }
};

export const filterTaskScaleStorage = taskIdArr => {
    const { username } = getAuthentication();
    const taskScalesCenter = getLocalStorage('taskScalesCenter', true) || null;
    if (taskScalesCenter) {
        if (!taskIdArr || taskIdArr.length === 0) {
            delete taskScalesCenter[username];
        } else {
            Object.keys(taskScalesCenter[username]).forEach(item => {
                if (!taskIdArr.includes(Number(item))) {
                    delete taskScalesCenter[username][item];
                }
            });
        }
        if (Object.keys(taskScalesCenter).length === 0) {
            removeLocalStorage('taskScalesCenter');
        } else {
            setLocalStorage('taskScalesCenter', taskScalesCenter);
        }
    }
};
