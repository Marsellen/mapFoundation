import { observable, flow, configure } from 'mobx';
import TaskService from '../service/TaskService';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable state = 'pending'; // 'pending' / 'done' / 'error'
    @observable tasks;

    init = flow(function*(callback) {
        this.state = 'pending';
        try {
            const tasks = yield TaskService.getTasks();
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.tasks = tasks;
        } catch (e) {
            console.log(e);
            this.state = 'error';
        }
        callback(this.tasks[0])
    });
}

export default new TaskStore();
