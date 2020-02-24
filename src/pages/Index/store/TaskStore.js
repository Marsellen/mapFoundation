import { observable, flow, configure, action, computed } from 'mobx';
import TaskService from 'src/services/TaskService';
import JobService from 'src/services/JobService';
import { message } from 'antd';
import CONFIG from 'src/config';
import {
    getAllVectorData,
    getAllRelData,
    getAllAttrData,
    getAllDataSnapshot
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
    completeEditUrl,
    completeBoundaryUrl
} from 'src/utils/taskUtils';
import RelStore from './RelStore';
import AttrStore from './AttrStore';

configure({ enforceActions: 'always' });
class TaskStore {
    @observable tasks = [];
    @observable activeTask = {};
    @observable taskSaveTime;
    @observable editTaskId;

    @computed get taskIdList() {
        return this.tasks.map(item => Number(item.taskId));
    }

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

    @computed get taskProcessName() {
        return this.activeTask && this.activeTask.processName;
    }

    // 任务列表
    initTask = flow(function*(option) {
        try {
            const result = yield JobService.listTask(option);

            this.tasks = result.data.taskList;
            return result.data;
        } catch (e) {
            message.warning('任务加载失败：' + e.message, 3);
        }
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
        const taskType = this.taskProcessName;
        const updateBoundaryParams = this.initUpdateBoundaryParams(taskType);
        const isGetTaskBoundaryFile = this.isGetTaskBoundaryFile();
        this.editTaskId = id;
        this.fetchTask();
        // 已更新底图，则直接获取底图；未更新底图，则先更新再获取底图
        if (isGetTaskBoundaryFile) {
            return this.getTaskBoundaryFile();
        } else {
            return this.updateTaskBoundaryFile(updateBoundaryParams);
        }
    };

    initUpdateBoundaryParams = taskType => {
        const params = {
            imp_recognition: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1302_MS_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask['MS_EDITOR_QUERYDB_PATHS']
            },
            imp_check_after_recognition: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1303_MS_QC_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask['MS_EDITOR_QUERYDB_PATHS']
            },
            imp_manbuild: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1304_MB_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask['MB_EDITOR_QUERYDB_PATHS']
            },
            imp_check_after_manbuild: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1305_MB_QC_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask['MB_EDITOR_QUERYDB_PATHS']
            }
        };
        return params[taskType];
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
        yield JobService.submitTask(payload);
    });

    // 更新任务状态
    updateTaskStatus = flow(function*(option) {
        try {
            yield JobService.updateTask(option);
            this.initTask({ type: 4 });
        } catch (e) {
            message.warning('更新任务状态失败：' + e.message, 3);
        }
    });

    isGetTaskBoundaryFile = () => {
        const { taskBoundaryIsUpdate } =
            AdLocalStorage.getTaskInfosStorage(this.activeTaskId) || {};
        return taskBoundaryIsUpdate;
    };

    getTaskBoundaryFile = flow(function*() {
        if (!window.map) return;
        const boundaryUrl = completeBoundaryUrl(
            CONFIG.urlConfig.boundaryAdsAll,
            this.activeTask
        );
        const layerGroup = new LayerGroup(boundaryUrl, {
            styleConifg: OutsideVectorsConfig
        });
        yield window.map.getLayerManager().addLayerGroup(layerGroup);

        const relUrl = completeBoundaryUrl(
            CONFIG.urlConfig.boundaryRels,
            this.activeTask
        );
        const AttrUrl = completeBoundaryUrl(
            CONFIG.urlConfig.boundaryAttrs,
            this.activeTask
        );
        yield AttrStore.addRecords(AttrUrl, 'boundary');
        yield RelStore.addRecords(relUrl, 'boundary');
        return layerGroup;
    });

    updateTaskBoundaryFile = flow(function*(option) {
        try {
            yield TaskService.updateTaskBoundaryFile(option);
            AdLocalStorage.setTaskInfosStorage({
                taskId: this.activeTaskId,
                taskBoundaryIsUpdate: true
            });
            return this.getTaskBoundaryFile();
        } catch (e) {
            AdLocalStorage.setTaskInfosStorage({
                taskId: this.activeTaskId,
                taskBoundaryIsUpdate: false
            });
            message.warning('获取底图失败，请重新加载页面：' + e.message, 3);
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
                    boundary: {
                        adsAll: completeBoundaryUrl(
                            CONFIG.urlConfig.boundaryAdsAll,
                            this.activeTask
                        ),
                        rels: completeBoundaryUrl(
                            CONFIG.urlConfig.boundaryRels,
                            this.activeTask
                        ),
                        attrs: completeBoundaryUrl(
                            CONFIG.urlConfig.boundaryAttrs,
                            this.activeTask
                        )
                    }
                });
            }
            return task;
        } catch (e) {
            console.log(e);
        }
    };

    submit = flow(function*() {
        try {
            let vectorData = getAllVectorData(true);
            let relData = yield getAllRelData(true);
            let attrData = yield getAllAttrData(true);
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
                message.warning('数据保存失败：' + e.message, 3);
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
            console.log(e.message);
            message.warning('矢量转存为shp文件失败：' + e.message, 3);
        }
    });

    writeEditLog = flow(function*() {
        try {
            let log = yield editLog.store.getAll();
            let snapshot = yield getAllDataSnapshot(true);
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
                incrementData: log,
                totalData: snapshot
            };
            yield TaskService.writeEditLog(payload);
            yield editLog.store.clear();
        } catch (e) {
            console.log(e.message);
            message.warning('日志保存失败：' + e.message, 3);
        }
    });

    @action loadLocalTask = task => {
        this.activeTask = task;
    };
}

export default new TaskStore();
