import Task from 'src/tool/task';
import { ADD_TASK_EDIT_LIMIT } from 'src/config/editLimitConfig';
import DataLayerStore from 'src/store/home/dataLayerStore';

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
