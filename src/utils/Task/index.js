import _ from 'lodash';
import VectorsStore from 'src/pages/Index/store/VectorsStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import { isRegionContainsElement } from 'src/utils/vectorUtils';
import { EDIT_LIMIT_MESSAGE } from 'src/config/EditLimitConfig';
import { message } from 'antd';

class Task {
    constructor(props) {
        for (let i in props) {
            this[i] = props[i];
        }
    }

    //判断被选中要素是否为周边底图数据
    isBoundaryFeature = feature => {
        const boundaryLayerIds = VectorsStore.getBoundaryLayerIds();
        return boundaryLayerIds.includes(feature.layerId);
    };

    //判断要素是否在任务范围内
    regionCheck = data => {
        const elementGeojson = _.cloneDeep(data.data);
        let isInRegion = isRegionContainsElement(elementGeojson, DataLayerStore.regionGeojson);
        return isInRegion;
    };

    //features参数是要素组成的数组
    positionLimit = (type, limit, features) => {
        const msg = EDIT_LIMIT_MESSAGE[type]['position'][limit];
        switch (limit) {
            case 'inside':
                const insideStatus = features.every(feature => {
                    return this.regionCheck(feature);
                });
                !insideStatus && msg && message.warning(msg);
                return insideStatus;
            case 'outside':
                return true;
            default:
                return true;
        }
    };

    //features参数是要素组成的数组
    taskDataLimit = (type, limit, features) => {
        const msg = EDIT_LIMIT_MESSAGE[type]['taskData'][limit];
        switch (limit) {
            case 'every':
                //全不是周边底图要素为true，其余情况为false
                const everyStatus = features.every(feature => {
                    return !this.isBoundaryFeature(feature);
                });
                !everyStatus && msg && message.warning(msg);
                return everyStatus;
            case 'atLastOne':
                //不全是周边底图要素为true，全是周边底图要素为false
                const isAllBoundaryFeature = features.every(feature => {
                    return this.isBoundaryFeature(feature);
                });
                const atLastOneStatus = !isAllBoundaryFeature;
                !atLastOneStatus && msg && message.warning(msg);
                return atLastOneStatus;
            case 'some':
                return true;
            default:
                return true;
        }
    };

    inputLimit = (editType, features) => {
        if (!this.taskLimit) return true;
        if (!this.taskLimit[editType]) return true;
        if (!this.taskLimit[editType].inputLimit) return true;
        const limit = this.taskLimit[editType].inputLimit;
        const { position, taskData } = limit;
        const positionStatus = this.positionLimit('input', position, features);
        const taskDataStatus = this.taskDataLimit('input', taskData, features);
        return positionStatus && taskDataStatus ? true : false;
    };

    outputLimit = (editType, features) => {
        if (!this.taskLimit) return true;
        if (!this.taskLimit[editType]) return true;
        if (!this.taskLimit[editType].outputLimit) return true;
        const limit = this.taskLimit[editType].outputLimit;
        if (!limit) return true;
        const { position } = limit;
        const positionStatus = this.positionLimit('output', position, features);
        return positionStatus ? true : false;
    };
}

export default Task;
