import { observable, flow, configure, action } from 'mobx';
import JobService from '../service/JobService';
import ReferService from '../service/ReferService';

configure({ enforceActions: 'always' }); //不允许在动作之外进行状态修改
class JobStore {
    @observable jobData = [];
    @observable activeTaskNames = {};
    @observable firstTaskValues = {};

    initJob = flow(function*(option) {
        console.log('option:', option);

        try {
            // mock
            const jobData = yield JobService.get(option);
            // const jobData = yield JobService.listTask(option);

            this.jobData = jobData.data.taskList;
            this.setActiveTaskNames();
        } catch (e) {
            console.log(e);
        }
    });

    setActiveTaskNames = flow(function*(id) {
        if (id) {
            this.jobData.forEach(item => {
                if (item.taskId === id) {
                    this.activeTaskNames.taskId = id;
                    this.activeTaskNames.process_name = item.processName;
                }
            });
        } else {
            this.activeTaskNames.taskId = this.jobData[0].taskId;
            this.activeTaskNames.process_name = this.jobData[0].processName;
        }
        console.log('提交参数this.activeTaskNames:', this.activeTaskNames);
    });

    initSubmit = flow(function*(result) {
        this.state = 'pending';
        this.activeTaskNames.result = result;
        this.activeTaskNames.instance_name = 'task_person_edit';
        this.activeTaskNames.ip = '';
        this.activeTaskNames.port = '';
        try {
            // mock
            const submitData = yield ReferService.get(this.activeTaskNames);
            // const submitData = yield JobService.submitTask(
            //     this.activeTaskNames
            // );

            this.state = 'done';
            this.submitData = submitData;
        } catch (e) {
            this.state = 'error';
        }
    });

    @action submitTask = (result, param) => {
        this.initSubmit(result);
        this.initJob(param);
    }

    @action getFirstTaskValues = () => {
        this.firstTaskValues.name = `${this.jobData[0].taskId}-${this.jobData[0].nodeDesc}-${this.jobData[0].manualStatusDesc}`;
        this.firstTaskValues.url = this.jobData[0].Input_imp_data_path;
        
        return this.firstTaskValues;
    }
}

export default new JobStore();
