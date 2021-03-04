export function calculation(vectorBefore, vectorAfter) {
    const rotationAngle = Math.acos(
        dotProduct(vectorBefore, vectorAfter) / normalize(vectorBefore) / normalize(vectorAfter)
    );
    if (mathEqual(rotationAngle, Math.PI)) {
        throw new Error('方向相反');
    }
    if (mathEqual(rotationAngle, 0)) {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }
    const rotationAxis = crossProduct(vectorBefore, vectorAfter);
    return rotationMatrix(rotationAngle, rotationAxis);
}

export function crossProduct(a, b) {
    let c = [];

    c[0] = a[1] * b[2] - a[2] * b[1];
    c[1] = a[2] * b[0] - a[0] * b[2];
    c[2] = a[0] * b[1] - a[1] * b[0];

    return c;
}

export function multiply3(a, b) {
    let result = [];
    result[0] = a[0][0] * b[0] + a[0][1] * b[1] + a[0][2] * b[2];
    result[1] = a[1][0] * b[0] + a[1][1] * b[1] + a[1][2] * b[2];
    result[2] = a[2][0] * b[0] + a[2][1] * b[1] + a[2][2] * b[2];

    return result;
}

export function getVector(point1, point2) {
    return [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
}

function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

function rotationMatrix(angle, u) {
    let norm = normalize(u);
    let rotatinMatrix = Array.from({ length: 3 }).map(i => []);

    u[0] = u[0] / norm;
    u[1] = u[1] / norm;
    u[2] = u[2] / norm;

    rotatinMatrix[0][0] = toDecimal(Math.cos(angle) + u[0] * u[0] * (1 - Math.cos(angle)));
    rotatinMatrix[0][1] = toDecimal(u[0] * u[1] * (1 - Math.cos(angle)) - u[2] * Math.sin(angle));
    rotatinMatrix[0][2] = toDecimal(u[1] * Math.sin(angle) + u[0] * u[2] * (1 - Math.cos(angle)));

    rotatinMatrix[1][0] = toDecimal(u[2] * Math.sin(angle) + u[0] * u[1] * (1 - Math.cos(angle)));
    rotatinMatrix[1][1] = toDecimal(Math.cos(angle) + u[1] * u[1] * (1 - Math.cos(angle)));
    rotatinMatrix[1][2] = toDecimal(-u[0] * Math.sin(angle) + u[1] * u[2] * (1 - Math.cos(angle)));

    rotatinMatrix[2][0] = toDecimal(-u[1] * Math.sin(angle) + u[0] * u[2] * (1 - Math.cos(angle)));
    rotatinMatrix[2][1] = toDecimal(u[0] * Math.sin(angle) + u[1] * u[2] * (1 - Math.cos(angle)));
    rotatinMatrix[2][2] = toDecimal(Math.cos(angle) + u[2] * u[2] * (1 - Math.cos(angle)));

    return rotatinMatrix;
}

function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100000) / 100000;
    return f;
}

function mathEqual(a, b) {
    return a - b < 0.000001 && a - b > -0.000001;
}
