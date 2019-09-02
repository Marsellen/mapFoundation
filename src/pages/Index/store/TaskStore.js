import { observable, flow, configure, action } from 'mobx';
import TaskService from '../service/TaskService';
import { Modal } from 'antd';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks = [];
    @observable activeTaskId;
    @observable workData = [];
    @observable activeTaskNames = {};
    @observable firstTaskValues = {};

    init = flow(function*() {
        try {
            const tasks = yield TaskService.get();
            this.tasks = tasks;
            this.setActiveTaskId();
        } catch (e) {
            console.log(e);
        }
    });

    // 任务列表
    initTask = flow(function*(option) {
        try {
            const workData = yield JobService.listTask(option);

            this.workData = workData.data.taskList;
            this.setActiveTaskNames();
        } catch (e) {
            console.log(e);
        }
    })

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
    });

    initSubmit = flow(function*(result) {
        this.state = 'pending';
        this.activeTaskNames.result = result;
        this.activeTaskNames.instance_name = 'task_person_edit';
        this.activeTaskNames.ip = '';
        this.activeTaskNames.port = '';
        try {
            const submitData = yield JobService.submitTask(
                this.activeTaskNames
            );

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

    load = flow(function*(option) {
        try {
            if (this.tasks.map(task => task._id).includes(option.url)) {
                throw { message: '资料已加载' };
            }
            if (this.tasks.map(task => task.name).includes(option.name)) {
                throw { message: '资料名称重复' };
            }
            this.tasks.push({
                _id: option.url,
                name: option.name
            });
            
            this.setActiveTaskId(option.url);
            return;
        } catch (e) {
            console.log(e);
            Modal.error({
                title: e.message,
                okText: '确定'
            });
        }
    });

    @action tasksPop = () => {
        this.tasks.pop();
        if (this.tasks.length == 0) {
            this.activeTaskId = null;
        } else {
            this.activeTaskId = this.tasks[this.tasks.length - 1]._id;
        }
    };

    setActiveTaskId = flow(function*(id) {
        this.activeTaskId = id;
        // TODO 缓存activeTaskId，取id优先级： id > 缓存id > this.tasks[0].id
    });

    @action getActiveTask = () => {
        return this.tasks.find(task => task._id == this.activeTaskId);
    };

    getTaskFile = flow(function*() {
        try {
            if (!this.activeTaskId) {
                return;
            }
            //const task = yield TaskService.get({ id: this.activeTaskId });
            let task = {
                point_clouds: this.activeTaskId + '/point_clouds/cloud.js',
                vectors: this.activeTaskId + '/vectors/ads_all.geojson',
                tracks: this.activeTaskId + '/tracks/track.json',
                rels: this.activeTaskId + '/vectors/rels.geojson',
                attrs: this.activeTaskId + '/vectors/attrs.geojson',
                region: this.activeTaskId + '/region.geojson'
            };
            return task;
        } catch (e) {
            console.log(e);
        }
    });

    submit = flow(function*(data) {
        try {
            let patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
            let arr = this.activeTaskId.match(patt1);
            let path = arr[arr.length - 1].replace(/\//, '');
            let payload = {
                filePath: path + '/vectors/',
                fileName: 'ads_all',
                fileFormat: 'geojson',
                fileData: data.vectorData
            };
            let attrPayload = {
                filePath: path + '/vectors/',
                fileName: 'attrs',
                fileFormat: 'geojson',
                fileData: data.attrData
            };
            let relPayload = {
                filePath: path + '/vectors/',
                fileName: 'rels',
                fileFormat: 'geojson',
                fileData: data.relData
            };
            yield Promise.all([
                TaskService.saveFile(payload),
                TaskService.saveFile(attrPayload),
                TaskService.saveFile(relPayload)
            ]).catch(e => {
                Modal.error({
                    title: '保存失败',
                    okText: '确定'
                });
            });
        } catch (e) {
            console.log(e);
        }
    });

    exportShp = flow(function*() {
        try {
            let patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
            let arr = this.activeTaskId.match(patt1);
            let path = arr[arr.length - 1].replace(/\//, '');
            let url = path + '/vectors/ads_all.geojson';
            yield TaskService.exportShp({
                jsonPath: url
            });
            return;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new TaskStore();
