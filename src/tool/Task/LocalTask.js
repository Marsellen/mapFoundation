import Task from 'src/tool/task';
import { LOCAL_TASK_EDIT_LIMIT } from 'src/config/editLimitConfig';
import DataLayerStore from 'src/store/home/dataLayerStore';

class LocalTask extends Task {
    constructor(props) {
        super(props);
        this.taskLimit = LOCAL_TASK_EDIT_LIMIT;
    }

    processLimit = () => {
        DataLayerStore.setRegionGeojson(null); //传null，没有落点限制
    };
}

export default LocalTask;
