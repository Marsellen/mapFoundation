import EditorService from 'src/pages/Index/service/EditorService';
import { message } from 'antd';

export const locatePicture = async (event, taskId) => {
    let pointObj = window.map.detectPointObjFromPointCloud(event);
    let result = await EditorService.locatePicture({
        task_id: taskId,
        pointWkt: pointObjToWkt(pointObj)
    }).catch(e => {
        message.error('点云照片联动接口异常！');
    });
    if (result.code !== 1) {
        throw result;
    }
    return result.data;
};

const pointObjToWkt = pointObj => {
    try {
        let position = pointObj.point.position;
        return `POINT(${position.x} ${position.y} ${position.z})`;
    } catch (e) {
        throw {
            message: '获取点云坐标失败！'
        };
    }
};