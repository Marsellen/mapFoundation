import { observable, flow, configure, action } from 'mobx';
import TaskService from '../service/TaskService';
import JobService from '../service/JobService';
import { Modal, message } from 'antd';
import CONFIG from 'src/config';
import {
    getAllVectorData,
    getAllRelData,
    getAllAttrData
} from 'src/utils/vectorUtils';
import { getAuthentication } from 'src/utils/Session';
import editLog from 'src/models/editLog';
import moment from 'moment';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable activeTaskId;
    @observable tasks = [];
    @observable activeTask = {};
    @observable taskSaveTime;

    // 任务列表
    initTask = flow(function*(option) {
        const result = yield JobService.listTask(option).catch(error => {
            message.error('任务加载失败', 3);
            throw error;
        });

        this.tasks = result.data.taskList;
    });

    // 任务切换
    @action setActiveTask = (id, update) => {
        if (this.tasks && this.tasks.length > 0) {
            if (id) {
                this.activeTask = this.tasks.find(item => {
                    return item.taskId === id;
                });
            } else {
                this.activeTask = this.tasks[0];
            }
            
            return this.setActiveTaskId(this.activeTask, update);
        } else {
            return this.setActiveTaskId();
        }
    };

    // 提交任务
    initSubmit = flow(function*(result) {
        let { taskId, processName: process_name } = this.activeTask;
        let payload = {
            instance_name: 'task_person_edit',
            result,
            taskId,
            process_name
        };
        let response = yield JobService.submitTask(payload);
        if (response.code != 1) {
            throw response;
        }
    });

    // 更新任务状态
    updateTaskStatus = flow(function*(option) {
        let response = yield JobService.updateTask(option);
        if (response.code != 1) {
            message.warning('更新任务状态失败', 3);
        }
    });

    setActiveTaskId = flow(function*(task = {}, update) {
        
        let { Input_imp_data_path, taskFetchId, manualStatus } = task;
        this.activeTaskId = Input_imp_data_path;
        this.taskSaveTime = null;

        const status = [2, 4, 5]; //进行中-2、返修-4、返工-5
        
        if (taskFetchId && !status.includes(manualStatus) && update) {
            // TODO taskFechId 少了一个t，后台接口定义问题
            yield this.updateTaskStatus({
                taskFetchId: taskFetchId,
                manualStatus: 2
            });
            // 更新完后 刷新任务列表
            this.initTask({ type: 4 });
        }
    });

    @action getTaskFile = () => {
        try {
            if (!this.activeTaskId) {
                return;
            }
            let task = {
                point_clouds: this.activeTaskId + CONFIG.urlConfig.point_clouds,
                vectors: this.urlFormat(CONFIG.urlConfig.vectors),
                tracks: this.urlFormat(CONFIG.urlConfig.track),
                rels: this.urlFormat(CONFIG.urlConfig.rels),
                attrs: this.urlFormat(CONFIG.urlConfig.attrs),
                region: this.urlFormat(CONFIG.urlConfig.region),
                boundary: this.urlFormat(CONFIG.urlConfig.boundary)
            };
            return task;
        } catch (e) {
            console.log(e);
        }
    };

    urlFormat = path => {
        return this.activeTaskId + path + '?time=' + Date.now();
    };

    submit = flow(function*() {
        try {
            let vectorData = getAllVectorData();
            let relData = yield getAllRelData();
            let attrData = yield getAllAttrData();
            let path = this.activeTask.Input_imp_data_relpath;
            let payload = {
                filePath: path + '/vectors/',
                fileName: 'ads_all',
                fileFormat: 'geojson',
                fileData: vectorData
            };
            let attrPayload = {
                filePath: path + '/vectors/',
                fileName: 'attrs',
                fileFormat: 'geojson',
                fileData: attrData
            };
            let relPayload = {
                filePath: path + '/vectors/',
                fileName: 'rels',
                fileFormat: 'geojson',
                fileData: relData
            };
            yield Promise.all([
                TaskService.saveFile(payload),
                TaskService.saveFile(attrPayload),
                TaskService.saveFile(relPayload)
            ]).catch(e => {
                Modal.error({
                    title: '数据保存失败，请稍后再试',
                    okText: '确定'
                });
            });

            this.taskSaveTime = moment().format('YYYY-MM-DD HH:mm:ss');
        } catch (e) {
            console.log(e);
        }
    });

    exportShp = flow(function*() {
        try {
            let path = this.activeTask.Input_imp_data_relpath;
            let url = path + CONFIG.urlConfig.vectors;
            yield TaskService.exportShp({
                jsonPath: url
            });
            return;
        } catch (e) {
            console.log(e);
        }
    });

    writeEditLog = flow(function*() {
        try {
            let log = yield editLog.store.getAll();
            let {
                taskId,
                processName,
                Input_imp_data_path: inputImpDataPath
            } = this.activeTask;
            const { username: userName } = getAuthentication();
            let payload = {
                taskId,
                processName,
                inputImpDataPath,
                userName,
                time: moment().format('YYYY-MM-DD HH:mm:ss SSS'),
                log
            };
            yield TaskService.writeEditLog(payload);
            yield editLog.store.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new TaskStore();
