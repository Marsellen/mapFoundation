import Task from 'src/utils/Task';
import { LOCAL_TASK_EDIT_LIMIT } from 'src/config/EditLimitConfig';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';

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
