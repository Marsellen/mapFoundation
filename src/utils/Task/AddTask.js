import Task from 'src/utils/Task';
import { ADD_TASK_EDIT_LIMIT } from 'src/config/EditLimitConfig';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';

class AddTask extends Task {
    constructor(props) {
        super(props);
        this.taskLimit = ADD_TASK_EDIT_LIMIT;
    }

    processLimit = () => {
        DataLayerStore.setRegionGeojson(null); //传null，没有落点限制
    };
}

export default AddTask;
