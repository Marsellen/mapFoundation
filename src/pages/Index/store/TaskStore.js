import { observable, flow, configure } from 'mobx';
import TaskService from '../service/TaskService';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks;
    @observable activeTaskId;

    init = flow(function*() {
        try {
            const tasks = yield TaskService.get();
            this.tasks = tasks;
            this.setActiveTaskId();
        } catch (e) {
            console.log(e);
        }
    });

    setActiveTaskId = flow(function*(id) {
        this.activeTaskId = id;
        // TODO 缓存activeTaskId，取id优先级： id > 缓存id > this.tasks[0].id
    });

    getTaskFile = flow(function*(callback) {
        try {
            if (!this.activeTaskId) {
                return;
            }
            const task = yield TaskService.get({id: this.activeTaskId});
            callback(task);
        } catch (e) {
            console.log(e);
        }
    });
}

export default new TaskStore();
