/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
import DataLayerStore from 'src/store/home/dataLayerStore';
import VectorsStore from 'src/store/home/vectorsStore';
import BufferStore from 'src/store/home/bufferStore';
import {
    getFeatureOption,
    getLayerByName,
    getLayerIDKey,
    getBoundaryLayerByName
} from 'src/util/vectorUtils';
import relFactory from 'src/util/relCtrl/relFactory';
import { newRel, delRel } from 'src/util/relCtrl/relCtrl';
import { CONNECTION_RELS } from 'src/config/relsConfig';
import SettingStore from 'src/store/setting/settingStore';

export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function addClass(dom, className) {
    let oriName = dom.className;
    if (oriName) {
        let newName = oriName + ' ' + specClass(className);
        dom.className = newName;
    } else {
        dom.className = specClass(className);
    }
}

function specClass(className) {
    const { editType } = DataLayerStore;
    let specClassName =
        editType === 'line_snap_stop'
            ? 'move-point-viz'
            : editType === 'attribute_brush'
            ? 'shuxingshua-viz'
            : className;
    return specClassName;
}

export function removeClass(dom, className) {
    let oriName = dom.className;
    if (oriName) {
        let classNames = oriName.split(' ');
        dom.className = classNames.filter(name => name !== className).join(' ');
    }
}

//节流函数
export function throttle(fn, time, context) {
    var lock, args, wrapperFn, later;

    later = function () {
        // reset lock and call if queued
        lock = false;
        if (args) {
            wrapperFn.apply(context, args);
            args = false;
        }
    };

    wrapperFn = function () {
        if (lock) {
            // called too soon, queue to call later
            args = arguments;
        } else {
            // call and lock until later
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
        }
    };

    return wrapperFn;
}

export const funDownload = (content, filename) => {
    var datastr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', datastr);
    downloadAnchorNode.setAttribute('download', `${filename}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

//参考坐标系1、墨卡托，2、局部地心
export const getCSYS = () => {
    return CSYS || 1;
};

export const distance = (vec1, vec2) => {
    if (getCSYS() === 1) {
        return mercatorDistance(vec1, vec2);
    } else {
        return commonDistance(vec1, vec2);
    }
};

/**
 * 计算两点的空间直角距离
 */
function commonDistance(vec1, vec2) {
    return (
        Math.sqrt(
            Math.pow(vec2[0] - vec1[0], 2) +
                Math.pow(vec2[1] - vec1[1], 2) +
                Math.pow(vec2[2] - vec1[2], 2)
        ).toFixed(2) * 1
    );
}

/**
 * 计算墨卡托坐标系下两点间的距离
 */
function mercatorDistance(vec1, vec2) {
    const wgs84_1 = mercatorToWgs84(vec1[0], vec1[1], vec1[2]);
    const wgs84_2 = mercatorToWgs84(vec2[0], vec2[1], vec2[2]);

    //2、转为地心坐标系
    const car_1 = wgs84ToGeocent(wgs84_1[0], wgs84_1[1], wgs84_1[2]);
    const car_2 = wgs84ToGeocent(wgs84_2[0], wgs84_2[1], wgs84_2[2]);

    //3、计算距离
    const dis =
        Math.sqrt(
            Math.pow(car_2[0] - car_1[0], 2) +
                Math.pow(car_2[1] - car_1[1], 2) +
                Math.pow(car_2[2] - car_1[2], 2)
        ).toFixed(2) * 1;
    return dis;
}

/**
 * 墨卡托转wgs84坐标
 */
export function mercatorToWgs84(x, y, z) {
    const lon = (x / 2.0037508342789e7) * 180.0;
    let lat = (y / 2.0037508342789e7) * 180.0;
    lat = (180 / Math.PI) * (2.0 * Math.atan(Math.exp((lat * Math.PI) / 180.0)) - Math.PI / 2);
    return [lon, lat, z];
}

/**
 * wgs84转地心坐标系
 */
export function wgs84ToGeocent(longitude, latitude, height) {
    const N =
        6378137 /
        Math.sqrt(
            1.0 -
                0.0066943799901413165 *
                    Math.sin(latitude * 0.017453292519943295) *
                    Math.sin(latitude * 0.017453292519943295)
        );
    const x =
        (N + height) *
        Math.cos(latitude * 0.017453292519943295) *
        Math.cos(longitude * 0.017453292519943295);
    const y =
        (N + height) *
        Math.cos(latitude * 0.017453292519943295) *
        Math.sin(longitude * 0.017453292519943295);
    const z = (N * 0.9933056200098587 + height) * Math.sin(latitude * 0.017453292519943295);
    return [x, y, z];
}

export function parseArrayString(arrayString) {
    try {
        return JSON.parse(arrayString);
    } catch (error) {
        return [];
    }
}

export function getWrappedInstance(ref) {
    while (ref.wrappedInstance) {
        ref = ref.wrappedInstance;
    }
    return ref;
}

export const bufferLink = () => {
    const currentBuffers = BufferStore.currentBuffers;
    currentBuffers.forEach(buffer => {
        const boundaryLayerIds = VectorsStore.getBoundaryLayerIds();
        const bufferId = boundaryLayerIds.includes(buffer?.layerId);
        const layerGroup = bufferId ? window.boundaryLayerGroup : window.vectorLayerGroup;
        const layer = layerGroup.layers.find(layer => layer.layerName == buffer.layerName);
        const option = getFeatureOption(buffer);
        const visible = layer.layer.visible;
        window.bufferLayer?.layer.showOrHideBufferByOption(option, visible);
    });
};

/**
 * 连接关系维护
 * @method keepConnectRels
 * @param {Array} featrues 当前选中要素
 * @returns {Array} 处理后的连接关系
 */
export const keepConnectRels = async featrues => {
    try {
        if (!featrues) return;
        let allOldRels = [];
        let allNewRels = [];
        for (let i = 0; i < featrues.length; i++) {
            const { layerName, data } = featrues[i];
            const { driveInPoint, driveOutPoint } = getFeaturesPoints(featrues[i]);
            const relRecords = await relFactory.getFeatureRels(layerName, data.properties);
            const relOptions = await relFactory.getRelOptions(
                layerName,
                relRecords,
                data.properties
            );
            const connectRels = relRecords.filter(rel => CONNECTION_RELS.includes(rel.spec)) || []; //获取选中要素所有的连接关系
            if (connectRels.length > 0) {
                const oldRels = await delConnectRels(
                    relOptions,
                    featrues[i],
                    driveInPoint,
                    driveOutPoint
                );
                allOldRels = [...allOldRels, ...oldRels];
            }
            const newRels = await addConnectRels(
                featrues[i],
                driveInPoint,
                driveOutPoint,
                connectRels
            );
            allNewRels = [...allNewRels, ...newRels];
        }
        if (allOldRels.length > 0 || allNewRels.length > 0) {
            return [allOldRels, allNewRels];
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
};

// 删除原有连接关系但移动首尾点后不再是连接关系的
const delConnectRels = async (relOptions, mainFeature, mainDriveInPoint, mainDriveOutPoint) => {
    const vectorLayer = getLayerByName(mainFeature.layerName);
    const boundaryLayer = getBoundaryLayerByName(mainFeature.layerName);
    let delRels = [];
    for (let i = 0; i < relOptions.length; i++) {
        if (relOptions[i].layerName == mainFeature.layerName) {
            const relFeature =
                vectorLayer.getFeatureByOption(relOptions[i].option) ||
                boundaryLayer.getFeatureByOption(relOptions[i].option);
            if (!relFeature) continue;
            const feature = relFeature.properties;
            const { driveInPoint, driveOutPoint } = getFeaturesPoints(feature);
            const driveInRel = calcPointsDistance(mainDriveInPoint, driveOutPoint);
            const driveOutRel = calcPointsDistance(mainDriveOutPoint, driveInPoint);
            if (!(driveInRel || driveOutRel)) {
                let relFeatures = await delRel(feature, [mainFeature]);
                if (!relFeatures) relFeatures = await delRel(mainFeature, [feature]);
                if (relFeatures) delRels = [...delRels, ...relFeatures];
            }
        }
    }
    return uniqRels(delRels);
};

// 找出与选择要素有公用首尾点的要素并建立关联关系
const addConnectRels = async (mainFeature, mainDriveInPoint, mainDriveOutPoint, connectRels) => {
    const mainFeatureId = getFeatureId(mainFeature);
    const vectorLayer = getLayerByName(mainFeature.layerName);
    const boundaryLayer = getBoundaryLayerByName(mainFeature.layerName);
    const vectorFeatures = vectorLayer?.getAllFeatures?.() || [];
    const boundaryFeatures = boundaryLayer?.getAllFeatures?.() || [];
    const allFeatures = [...vectorFeatures, ...boundaryFeatures];
    const newRels = [];
    for (let i = 0; i < allFeatures.length; i++) {
        const featureId = getFeatureId(allFeatures[i]);
        const { driveInPoint, driveOutPoint } = getFeaturesPoints(allFeatures[i]);
        if (
            featureId !== mainFeatureId &&
            !(
                connectRels &&
                connectRels.find(item => item?.objId === featureId || item?.relObjId === featureId)
            )
        ) {
            if (calcPointsDistance(mainDriveInPoint, driveOutPoint)) {
                const relInfo = await newRel(allFeatures[i], [mainFeature]);
                const relsLog = relInfo?.log?.rels?.[1]?.[0];
                relsLog && newRels.push(relsLog);
            } else if (calcPointsDistance(mainDriveOutPoint, driveInPoint)) {
                const relInfo = await newRel(mainFeature, [allFeatures[i]]);
                const relsLog = relInfo?.log?.rels?.[1]?.[0];
                relsLog && newRels.push(relsLog);
            }
        }
    }
    return uniqRels(newRels);
};

// 连接关系去重
const uniqRels = arr => {
    if (arr.length === 0) return [];
    const obj = {};
    arr.forEach(item => {
        const { objId, relObjId } = item;
        obj[objId + relObjId] = item;
    });
    return Object.values(obj);
};

// 获取首尾点坐标轴
const getFeaturesPoints = feature => {
    const coordinates = feature?.data?.geometry?.coordinates;
    const driveInPoint = coordinates[0];
    const driveOutPoint = coordinates[coordinates.length - 1];
    return { driveInPoint, driveOutPoint };
};

// 获取ID
const getFeatureId = feature => {
    const IDKey = getLayerIDKey(feature.layerName);
    return feature.data.properties[IDKey];
};

// 计算两点之间的距离
const calcPointsDistance = (p1, p2) => {
    const bufferDiff = SettingStore.getConfig('OTHER_CONFIG').bufferDiff;
    const x = decNum(p1[0], p2[0]);
    const y = decNum(p1[1], p2[1]);
    const z = decNum(p1[2], p2[2]);
    if (Math.abs(x) < bufferDiff && Math.abs(y) < bufferDiff && Math.abs(z) < bufferDiff)
        return true;
};

const decNum = (point1, point2) => {
    const p1 = point1?.toString()?.split('.')?.[1]?.length ?? 0;
    const p2 = point2?.toString()?.split('.')?.[1]?.length ?? 0;
    const p = Math.pow(10, Math.max(p1, p2));
    return (point1 * p - point2 * p) / p;
};
