import Task from 'src/utils/Task';
import { MODIFY_TASK_EDIT_LIMIT } from 'src/config/EditLimitConfig';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';

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
