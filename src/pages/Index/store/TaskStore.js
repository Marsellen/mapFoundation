import { observable, flow, configure, action } from 'mobx';
import TaskService from '../service/TaskService';
import JobService from '../service/JobService';
// import ReferService from '../service/ReferService';
import { Modal } from 'antd';
import CONFIG from 'src/config';
import { logout } from 'src/utils/Session';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks = [];
    @observable activeTaskId;
    @observable workData = [];
    @observable activeTaskNamesObj = {};
    @observable firstTaskValuesObj = {};

    init = flow(function*() {
        try {
            const tasks = yield TaskService.get();
            this.tasks = tasks;
            // this.setActiveTaskId();
        } catch (e) {
            console.log(e);
        }
    });

    // 任务列表
    initTask = flow(function*(option) {
        try {
            const workData = yield JobService.listTask(option);
            // const workData = yield JobService.get(option);

            this.workData = workData.data.taskList;
            this.setActiveTaskNames();
        } catch (e) {
            console.log(e);
            Modal.confirm({
                title: 'token失效，请重新获取',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    // this.props.history.push({ pathname: './../Login' });
                    logout();
                    window.location.reload();
                }
            });
        }
    })

    // 提交任务参数
    setActiveTaskNames = flow(function*(id) {
        if (this.workData && this.workData.length > 0) {
            if (id) {
                this.workData.forEach(item => {
                    if (item.taskId === id) {
                        this.activeTaskNamesObj.taskId = id;
                        this.activeTaskNamesObj.process_name = item.processName;
                    }
                });
            } else {
                this.activeTaskNamesObj.taskId = this.workData[0].taskId;
                this.activeTaskNamesObj.process_name = this.workData[0].processName;
            }
        } else {
            return;
        }
    });

    // 提交任务
    initSubmit = flow(function*(result) {
        this.state = 'pending';
        this.activeTaskNamesObj.result = result;
        this.activeTaskNamesObj.instance_name = 'task_person_edit';
        this.activeTaskNamesObj.ip = '';
        this.activeTaskNamesObj.port = '';
        try {
            // const submitData = yield ReferService.submitTask(
            //     this.activeTaskNamesObj
            // );
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
        this.initTask(param);
    }

    @action getFirstTaskValues = () => {
        if (this.workData && this.workData.length > 0) {
            this.firstTaskValuesObj.name = `${this.workData[0].taskId}-${this.workData[0].nodeDesc}-${this.workData[0].manualStatusDesc}`;
            this.firstTaskValuesObj.url = this.workData[0].Input_imp_data_path;
        }
        
        return this.firstTaskValuesObj;
    }

    load = flow(function*(option) {
        try {
            // if (this.tasks.map(task => task._id).includes(option.url)) {
            //     throw { message: '资料已加载' };
            // }
            // if (this.tasks.map(task => task.name).includes(option.name)) {
            //     throw { message: '资料名称重复' };
            // }
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
        // this.tasks.pop();
        this.workData.pop();
        // if (this.tasks.length == 0) {
        //     this.activeTaskId = null;
        // } else {
        //     this.activeTaskId = this.tasks[this.tasks.length - 1]._id;
        // }
        if (this.workData.length == 0) {
            this.activeTaskId = null;
        } else {
            this.activeTaskId = this.workData[this.workData.length - 1].taskId;
        }
    };

    setActiveTaskId = flow(function*(id) {
        this.activeTaskId = id;
        // TODO 缓存activeTaskId，取id优先级： id > 缓存id > this.tasks[0].id
    });

    @action getActiveTask = () => {
        // return this.tasks.find(task => task._id == this.activeTaskId);
        return this.workData.find(workData => workData.taskId == this.activeTaskId);
    };

    getTaskFile = flow(function*() {
        try {
            if (!this.activeTaskId) {
                return;
            }
            //const task = yield TaskService.get({ id: this.activeTaskId });
            let task = {
                point_clouds: this.activeTaskId + CONFIG.urlConfig.point_clouds,
                vectors: this.activeTaskId + CONFIG.urlConfig.vectors,
                tracks: this.activeTaskId + CONFIG.urlConfig.track,
                rels: this.activeTaskId + CONFIG.urlConfig.rels,
                attrs: this.activeTaskId + CONFIG.urlConfig.attrs,
                region: this.activeTaskId + CONFIG.urlConfig.region,
                boundary: this.activeTaskId + CONFIG.urlConfig.boundary
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
            let url = path + CONFIG.urlConfig.vectors;
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
