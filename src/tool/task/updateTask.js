import Task from 'src/tool/task';
import { UPDATE_TASK_EDIT_LIMIT } from 'src/config/editLimitConfig';
import DataLayerStore from 'src/store/home/dataLayerStore';

class UpdateTask extends Task {
    constructor(props) {
        super(props);
        this.taskLimit = UPDATE_TASK_EDIT_LIMIT;
    }

    processLimit = () => {
        const getRegionRes = vectorLayer.getVectorData();
        DataLayerStore.setRegionGeojson(getRegionRes.features[0]); //传任务范围，有落点限制
    };
}

export default UpdateTask;
