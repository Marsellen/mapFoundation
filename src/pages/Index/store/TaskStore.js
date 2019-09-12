import { observable, flow, configure, action } from 'mobx';
import TaskService from '../service/TaskService';
import JobService from '../service/JobService';
import { Modal, message } from 'antd';
import CONFIG from 'src/config';
import { logout } from 'src/utils/Session';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable activeTaskId;
    @observable tasks = [];
    @observable activeTask = {};

    // 任务列表
    initTask = flow(function*(option) {
        const result = yield JobService.listTask(option).catch(error => {
            if (error.code === 1001 || error.code === 401) {
                //判断是否token失效
                Modal.confirm({
                    title: 'token失效，请重新获取',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        logout();
                        window.location.reload();
                    }
                });
            } else {
                message.warning('网络错误', 3);
                throw error;
            }
        });

        this.tasks = result.data.taskList;
    });

    // 任务切换
    @action setActiveTask = id => {
        if (this.tasks && this.tasks.length > 0) {
            if (id) {
                this.activeTask = this.tasks.find(item => {
                    return item.taskId === id;
                });
            } else {
                this.activeTask = this.tasks[0];
            }
            return this.setActiveTaskId(this.activeTask);
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
            message.warning('更新状态失败', 3);
        }
    });

    setActiveTaskId = flow(function*(task = {}) {
        let { Input_imp_data_path, taskFetchId, manualStatus } = task;
        this.activeTaskId = Input_imp_data_path;

        const status = [4, 5]; //返修-4、返工-5
        if (taskFetchId && !status.includes(manualStatus)) {
            // TODO taskFechId 少了一个t，后台接口定义问题
            yield this.updateTaskStatus({
                taskFechId: taskFetchId,
                manualStatus: 2
            });
        }
    });

    getTaskFile = flow(function*() {
        try {
            if (!this.activeTaskId) {
                return;
            }
            //const task = yield TaskService.get({ id: this.activeTaskId });
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
    });

    urlFormat = path => {
        return this.activeTaskId + path + '?time=' + Date.now();
    };

    submit = flow(function*(data) {
        try {
            let path = this.activeTask.Input_imp_data_relpath;
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
}

export default new TaskStore();
