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
        try {
            const result = yield JobService.listTask(option);

            this.tasks = result.data.taskList;
        } catch (e) {
            console.log(e);
            if (code === 401) { //判断是否token失效
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
                message.warning('网络错误', 3)
            }
        }
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
            this.setActiveTaskId(this.activeTask.Input_imp_data_path);
        } else {
            this.setActiveTaskId();
            return;
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
    initUpdate = flow(function*(option) {
        let response = yield JobService.updateTask(option);
        if (response.code != 1) {
            message.warning('更新状态失败', 3)
        }
    })

    setActiveTaskId = flow(function*(id) {
        this.activeTaskId = id;
        // TODO 缓存activeTaskId，取id优先级： id > 缓存id > this.tasks[0].id
    });

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
