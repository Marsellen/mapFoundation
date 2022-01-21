import Task from 'src/util/task';
import { MODIFY_TASK_EDIT_LIMIT } from 'src/config/editLimitConfig';
import DataLayerStore from 'src/store/home/dataLayerStore';

class ModifyTask extends Task {
    constructor(props) {
        super(props);
        this.taskLimit = MODIFY_TASK_EDIT_LIMIT;
    }

    processLimit = () => {
        const getRegionRes = vectorLayer.getVectorData();
        DataLayerStore.setRegionGeojson(getRegionRes.features[0]); //传任务范围，有落点限制
    };
}

export default ModifyTask;
