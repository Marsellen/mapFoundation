/**
 * 计算线要素的中心点
 * @param line
 * @returns {*}
 */
export const calculateMiddlePoint = line => {
    const coords = line.geometry.coordinates;
    let totalDistance = 0;
    const segments = [];
    for (let i = 1, len = coords.length; i < len; i++) {
        const segmentDis =
            Math.round(
                calculateSegmentDistance(coords[i - 1], coords[i]) * 10000
            ) / 10000;
        segments.push(segmentDis);
        totalDistance += segmentDis;
    }

    const middleDis = totalDistance / 2;
    let curDis = 0;
    let curIndex = 0;
    for (let i = 0, len = segments.length; i < len; i++) {
        curIndex = i;
        curDis += segments[i];
        if (curDis >= middleDis) {
            break;
        }
    }

    if (curDis === middleDis) {
        return coords[curIndex + 1];
    }

    const start = coords[curIndex],
        end = coords[curIndex + 1];
    const offsetDis = curDis - middleDis;
    const factor = (segments[curIndex] - offsetDis) / segments[curIndex];

    const x = start[0] + factor * (end[0] - start[0]);
    const y = start[1] + factor * (end[1] - start[1]);
    const z = start[2] + factor * (end[2] - start[2]);

    return {
        x: Math.round(x * 10000) / 10000,
        y: Math.round(y * 10000) / 10000,
        z: Math.round(z * 10000) / 10000
    };
};

/**
 * 计算两个点间的距离
 * @param p1
 * @param p2
 * @returns {number}
 */
const calculateSegmentDistance = (p1, p2) => {
    return Math.sqrt(
        Math.pow(p1[0] - p2[0], 2) +
            Math.pow(p1[1] - p2[1], 2) +
            Math.pow(p1[2] - p2[2], 2)
    );
};
