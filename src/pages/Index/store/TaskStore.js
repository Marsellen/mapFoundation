import { observable, flow, configure, action, computed } from 'mobx';
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
import AdLocalStorage from 'src/utils/AdLocalStorage';
import OutsideVectorsConfig from 'src/config/OutsideVectorsConfig';
import { LayerGroup } from 'addis-viz-sdk';
import {
    getExportShpUrl,
    getEditPath,
    completeSecendUrl,
    completeEditUrl
} from 'src/utils/taskUtils';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks = [];
    @observable activeTask = {};
    @observable taskSaveTime;
    @observable editTaskId;

    @computed get validTasks() {
        return this.tasks.filter(task => task.manualStatus !== 3); // 3 任务挂起
    }

    @computed get activeTaskId() {
        return this.activeTask && this.activeTask.taskId;
    }

    @computed get activeTaskUrl() {
        return this.activeTask && this.activeTask.Input_imp_data_path;
    }

    @computed get activeTaskStatus() {
        return this.activeTask.manualStatus;
    }

    @computed get isValidTask() {
        return this.activeTask && this.activeTask.manualStatus !== 3; // 3 任务挂起
    }

    @computed get isEditableTask() {
        return this.activeTaskId && this.activeTaskId == this.editTaskId;
    }

    // 任务列表
    initTask = flow(function*(option) {
        const result = yield JobService.listTask(option).catch(error => {
            message.error('任务加载失败', 3);
            throw error;
        });

        this.tasks = result.data.taskList;
        return result.data;
    });

    // 任务切换
    @action setActiveTask = id => {
        if (this.validTasks && this.validTasks.length && id) {
            this.activeTask = this.validTasks.find(item => {
                return item.taskId === id;
            });
        } else {
            this.activeTask = {};
        }

        this.taskSaveTime = null;
        this.editTaskId = null;
    };

    @action startTaskEdit = id => {
        this.editTaskId = id;
        this.fetchTask();
        if (this.isGetTaskBoundaryFile()) {
            return this.getTaskBoundaryFile();
        } else {
            return this.updateTaskBoundaryFile({
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                '1301_RAW_DATA': this.activeTask['1301_RAW_DATA']
            });
        }
    };

    fetchTask = flow(function*() {
        const { taskFetchId, manualStatus } = this.activeTask;
        const status = [2, 4, 5]; //已领取-1、进行中-2、返修-4、返工-5

        if (taskFetchId && !status.includes(manualStatus)) {
            // “开始”编辑任务时，“已领取”任务，更新成"进行中"
            yield this.updateTaskStatus({
                taskFetchId: taskFetchId,
                manualStatus: 2
            });
        }
    });

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
        if (response.code === 1) {
            // 更新完后 刷新任务列表
            this.initTask({ type: 4 });
        } else {
            message.warning('更新任务状态失败', 3);
        }
    });

    isGetTaskBoundaryFile = () => {
        const { taskBoundaryIsUpdate } =
            AdLocalStorage.getTaskInfosStorage(this.activeTaskId) || {};
        return taskBoundaryIsUpdate;
    };

    getTaskBoundaryFile = flow(function*() {
        if (window.map) {
            const boundaryUrl = completeSecendUrl(
                CONFIG.urlConfig.boundary,
                this.activeTask
            );
            const layerGroup = new LayerGroup(boundaryUrl, {
                styleConifg: OutsideVectorsConfig
            });
            yield window.map.getLayerManager().addLayerGroup(layerGroup);
            return layerGroup;
        }
    });

    updateTaskBoundaryFile = flow(function*(option) {
        const response = yield TaskService.updateTaskBoundaryFile(option);
        // 浏览器缓存记录更新底图状态
        if (response.code === 1) {
            AdLocalStorage.setTaskInfosStorage({
                taskId: this.activeTaskId,
                taskBoundaryIsUpdate: true
            });
            return this.getTaskBoundaryFile();
        } else {
            AdLocalStorage.setTaskInfosStorage({
                taskId: this.activeTaskId,
                taskBoundaryIsUpdate: false
            });
            message.warning('更新底图状态失败', 3);
        }
    });

    @action getTaskFile = () => {
        try {
            if (!this.activeTaskUrl) {
                return;
            }
            let task = {
                point_clouds: completeSecendUrl(
                    CONFIG.urlConfig.point_clouds,
                    this.activeTask
                ),
                tracks: completeSecendUrl(
                    CONFIG.urlConfig.track,
                    this.activeTask
                ),
                region: completeSecendUrl(
                    CONFIG.urlConfig.region,
                    this.activeTask
                ),
                vectors: completeEditUrl(
                    CONFIG.urlConfig.vectors,
                    this.activeTask
                ),
                rels: completeEditUrl(CONFIG.urlConfig.rels, this.activeTask),
                attrs: completeEditUrl(CONFIG.urlConfig.attrs, this.activeTask)
            };
            if (this.isEditableTask && this.isGetTaskBoundaryFile()) {
                Object.assign(task, {
                    boundary: completeSecendUrl(
                        CONFIG.urlConfig.boundary,
                        this.activeTask
                    )
                });
            }
            return task;
        } catch (e) {
            console.log(e);
        }
    };

    submit = flow(function*() {
        try {
            let vectorData = getAllVectorData();
            let relData = yield getAllRelData();
            let attrData = yield getAllAttrData();
            let path = getEditPath(this.activeTask);
            let payload = {
                filePath: path,
                fileName: 'ads_all',
                fileFormat: 'geojson',
                fileData: vectorData
            };
            let attrPayload = {
                filePath: path,
                fileName: 'attrs',
                fileFormat: 'geojson',
                fileData: attrData
            };
            let relPayload = {
                filePath: path,
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
            let url = getExportShpUrl(this.activeTask);
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
            message.error('日志保存失败！');
        }
    });

    @action loadLocalTask = task => {
        this.activeTask = task;
    };
}

export default new TaskStore();
