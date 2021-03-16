import { flow, configure } from 'mobx';
import TaskService from 'src/services/TaskService';

configure({ enforceActions: 'always' });
class ManualBuildStore {
    batchLineInterruptAssig = flow(function* (task) {
        try {
            const result = yield TaskService.batchLineInterruptAssig(task);

            return result;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new ManualBuildStore();
