import EditorService from 'src/service/editorService';

export const locatePicture = async (pointWkt, taskId, projectName) => {
    let result = await EditorService.locatePicture(
        {
            projectName,
            task_id: taskId,
            pointWkt
        },
        err => {
            throw new Error(err || '点云照片联动接口异常！');
        }
    );
    return result.data;
};

const pointObjToWkt = pointObj => {
    try {
        let position = pointObj.point.position;
        return `POINT(${position.x} ${position.y} ${position.z})`;
    } catch (e) {
        throw new Error('获取点云坐标失败！');
    }
};

export const getEventPointWkt = event => {
    let pointObj = window.map.detectPointObjFromPointCloud(event);
    return pointObjToWkt(pointObj);
};

export const getFeaturePointWkt = feature => {
    try {
        let geometry = feature.data.geometry;
        let point;
        switch (geometry.type) {
            case 'LineString':
                point = geometry.coordinates[0];
                break;
            case 'Point':
                point = geometry.coordinates;
                break;
            case 'Polygon':
                point = geometry.coordinates[0][0];
                break;
        }
        return `POINT(${point[0]} ${point[1]} ${point[2]})`;
    } catch (e) {
        throw new Error('获取要素坐标失败！');
    }
};
