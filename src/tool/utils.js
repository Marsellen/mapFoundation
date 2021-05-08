/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
import DataLayerStore from 'src/store/home/dataLayerStore';
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
