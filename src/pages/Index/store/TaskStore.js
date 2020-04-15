import { observable, flow, configure, action, computed } from 'mobx';
import TaskService from 'src/services/TaskService';
import JobService from 'src/services/JobService';
import axios from 'axios';
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
    completeBoundaryUrl,
    completeMultiProjectUrl
} from 'src/utils/taskUtils';
import RelStore from './RelStore';
import AttrStore from './AttrStore';
import { getTaskProcessType } from 'src/utils/taskUtils';

configure({ enforceActions: 'always' });
class TaskStore {
    projectNameArr; //当前任务工程名
    @observable onlineTasks = [];
    @observable localTasks = [];
    @observable activeTask = {};
    @observable taskSaveTime;
    @observable editTaskId;

    @computed get tasks() {
        return this.localTasks.concat(this.onlineTasks);
    }

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

    @computed get taskToolType() {
        if (this.activeTask.isLocal) {
            return 'manbuild';
        }
        return getTaskProcessType();
    }

    // 任务列表
    initTask = flow(function* (option) {
        try {
            const result = yield JobService.listTask(option);

            this.onlineTasks = result.data.taskList;
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
                EDITOR_QUERYDB_PATHS: this.activeTask[
                    'MS_EDITOR_QUERYDB_PATHS'
                ],
                incsys: 'mct',
                outcsys: 'mct'
            },
            imp_check_after_recognition: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1303_MS_QC_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask[
                    'MS_EDITOR_QUERYDB_PATHS'
                ],
                incsys: 'mct',
                outcsys: 'mct'
            },
            imp_manbuild: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1304_MB_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask[
                    'MB_EDITOR_QUERYDB_PATHS'
                ],
                incsys: 'mct',
                outcsys: 'mct'
            },
            imp_check_after_manbuild: {
                taskId: this.activeTaskId,
                '10_COMMON_DATA': this.activeTask['10_COMMON_DATA'],
                targetDirectory: this.activeTask['1305_MB_QC_AROUND_DATA'],
                EDITOR_QUERYDB_PATHS: this.activeTask[
                    'MB_EDITOR_QUERYDB_PATHS'
                ],
                incsys: 'mct',
                outcsys: 'mct'
            }
        };
        return params[taskType];
    };

    fetchTask = flow(function* () {
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
    initSubmit = flow(function* (result) {
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
    updateTaskStatus = flow(function* (option) {
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
        // 本地任务不请求更新底图数据
        return taskBoundaryIsUpdate || this.activeTask.isLocal;
    };

    getTaskBoundaryFile = flow(function* () {
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

    updateTaskBoundaryFile = flow(function* (option) {
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

    getTaskInfo = flow(function* () {
        try {
            const { taskInfo } = CONFIG.urlConfig;
            const url = completeSecendUrl(taskInfo, this.activeTask);
            const { data } = yield axios.get(url);
            const { projectNames } = data;
            this.projectNameArr = projectNames.split(';').sort();
        } catch (e) {
            console.error(e.message);
            message.warning('获取任务信息失败' + e.message);
        }
    });

    //获取工程名和该工程点云的映射和数组，例：{工程名:{点云:url,轨迹:url}}
    getMultiProjectDataMap = (lastPath, name) => {
        if (!this.projectNameArr || this.projectNameArr.length === 0) return;
        const urlMap = {};
        const urlArr = [];

        this.projectNameArr.forEach(projectName => {
            const url = completeMultiProjectUrl(
                lastPath,
                this.activeTask,
                projectName
            );
            urlMap[projectName] = { [name]: url };
            urlArr.push(url);
        });

        return { urlMap, urlArr };
    };

    @action getTaskFile = () => {
        try {
            if (!this.activeTaskUrl) return;

            const {
                point_clouds,
                track,
                region,
                vectors,
                rels,
                attrs,
                boundaryAdsAll,
                boundaryRels,
                boundaryAttrs
            } = CONFIG.urlConfig;

            let task = {
                point_clouds: this.getMultiProjectDataMap(
                    point_clouds,
                    'point_clouds'
                ),
                tracks: this.getMultiProjectDataMap(track, 'track'),
                region: completeSecendUrl(region, this.activeTask),
                vectors: completeEditUrl(vectors, this.activeTask),
                rels: completeEditUrl(rels, this.activeTask),
                attrs: completeEditUrl(attrs, this.activeTask)
            };

            if (this.isEditableTask && this.isGetTaskBoundaryFile()) {
                Object.assign(task, {
                    boundary: {
                        adsAll: completeBoundaryUrl(
                            boundaryAdsAll,
                            this.activeTask
                        ),
                        rels: completeBoundaryUrl(
                            boundaryRels,
                            this.activeTask
                        ),
                        attrs: completeBoundaryUrl(
                            boundaryAttrs,
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

    submit = flow(function* () {
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

    exportShp = flow(function* () {
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

    writeEditLog = flow(function* () {
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
        if (this.tasks.map(t => t.taskId).includes(task.taskId)) {
            throw new Error('资料目录重复');
        }
        this.activeTask = {
            ...task,
            projectId: 1,
            isLocal: true
        };
        this.localTasks.push(this.activeTask);
        this.LocalTaskCallback && this.LocalTaskCallback(this.activeTask);
    };

    @action tasksPop = () => {
        if (this.activeTask.isLocal) {
            this.localTasks.pop();
            this.activeTask = {};
        }
    };

    @action bindLocalTaskCallback = LocalTaskCallback => {
        this.LocalTaskCallback = LocalTaskCallback;
    };
}

export default new TaskStore();
