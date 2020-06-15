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
import BoundaryVectorsConfig from 'src/config/BoundaryVectorsConfig';
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
    multiProjectMap = {}; //多工程映射
    projectNameArr = []; //当前任务工程名
    lidarNameArr = []; //多工程点云，每个工程下对应的点云名
    defaultLidarName = []; //多工程点云，每个工程下默认显示的点云名
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
            const { type } = option;
            const error = e.message || e || '';
            if (type === 4) {
                //获取任务列表报错，控制台打印error message
                console.error('任务加载失败：' + error);
            } else {
                //其它类型，浮窗提示用户error message
                message.warning('任务加载失败：' + error, 3);
            }
        }
    });

    // 任务切换
    @action setActiveTask = id => {
        if (this.validTasks && this.validTasks.length && id) {
            this.activeTask = this.validTasks.find(item => {
                return item.taskId === id;
            });
            this.activeTask.firstTime = false;
        } else {
            this.activeTask = {};
        }

        this.taskSaveTime = null;
        this.editTaskId = null;
    };

    @action startTaskEdit = id => {
        this.editTaskId = id;
        this.fetchTask();
    };

    @action getBoundaryLayer = () => {
        const taskType = this.taskProcessName;
        const updateBoundaryParams = this.initUpdateBoundaryParams(taskType);
        const isGetTaskBoundaryFile = this.isGetTaskBoundaryFile();
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
            styleConifg: BoundaryVectorsConfig
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
            console.log('获取底图失败' + e.message || e || '');
        }
    });

    getTaskInfo = flow(function* () {
        try {
            if (!this.activeTaskUrl) return;
            const { taskInfo } = CONFIG.urlConfig;
            const url = completeSecendUrl(taskInfo, this.activeTask);
            const { data } = yield axios.get(url);
            const { projectNames, lidarNames, defaultLidarName } = data;
            this.projectNameArr = projectNames.split(';').sort();
            this.multiProjectMap = this.initMultiProjectMap();
            this.lidarNameArr = JSON.parse(lidarNames);
            this.defaultLidarName = JSON.parse(defaultLidarName);
        } catch (e) {
            console.log('taskInfos.json请求失败' + e.message || e || '');
            throw new Error(this.activeTaskId);
        }
    }).bind(this);

    //初始化多工程对象
    initMultiProjectMap = () => {
        const multiProjectMap = {};
        this.projectNameArr.forEach((projectName, index) => {
            multiProjectMap[projectName] = {
                key: projectName,
                checked: true,
                disabled: false,
                level: 1,
                label: `工程${index + 1}：${projectName}`,
                children: {
                    point_clouds: {
                        key: `${projectName}|point_clouds`,
                        checked: true,
                        disabled: false,
                        label: '点云',
                        layerName: 'pointCloudLayer',
                        children: {}
                    },
                    track: {
                        key: `${projectName}|track`,
                        checked: true,
                        disabled: false,
                        label: '轨迹',
                        layerName: 'trackLayer'
                    }
                }
            };
        });
        return multiProjectMap;
    };

    //通过拼接key(projectName|typeName|layerName)更新多工程对象
    updateMultiProjectMap = (key, addObj) => {
        const keyArr = key.split('|');
        let obj = this.multiProjectMap;
        keyArr.forEach((item, index) => {
            obj = index === 0 ? obj[item] : obj.children[item];
        });
        obj = Object.assign(obj, addObj);
    };

    //根据taskInfo.json，将点云数据加入到多工程对象中
    handleMultiPointCloud = lastPath => {
        const lidarUrlArr = [];
        this.projectNameArr.forEach(projectName => {
            const projectLidarMap = {};
            this.lidarNameArr[projectName].forEach(lidarName => {
                //因雷达名中有特殊符号，需要进行转码
                const url = completeMultiProjectUrl(
                    `point_clouds/${encodeURIComponent(lidarName)}/${lastPath}`,
                    this.activeTask,
                    projectName
                );
                //获取雷达的默认数组，判断当前雷达是否属于默认数组
                const defaultLidarArr = this.defaultLidarName[projectName];
                const isDefaultLidar = defaultLidarArr.includes(lidarName);

                const lidar = {
                    key: `${projectName}|point_clouds|${lidarName}`,
                    label: lidarName,
                    layerKey: url,
                    checked: isDefaultLidar,
                    layerName: 'pointCloudLayer'
                };

                projectLidarMap[lidarName] = projectLidarMap[lidarName] || {};
                projectLidarMap[lidarName] = lidar;

                //如果不是默认选中雷达则返回
                if (!isDefaultLidar) return;
                lidarUrlArr.push(url);
            });
            //将点云添加到 multiProjectMap
            this.updateMultiProjectMap(`${projectName}|point_clouds`, {
                children: projectLidarMap
            });
        });
        return lidarUrlArr;
    };

    //根据taskInfo.json，将轨迹数据加入到多工程对象中
    handleMultiTrack = lastPath => {
        const trackUrlMap = {};
        this.projectNameArr.forEach((projectName, i) => {
            const url = completeMultiProjectUrl(
                lastPath,
                this.activeTask,
                projectName
            );

            trackUrlMap[projectName] = url;

            this.updateMultiProjectMap(`${projectName}|track`, {
                url,
                key: `${projectName}|track`,
                label: '轨迹',
                checked: true,
                layerKey: url,
                layerName: 'trackLayer',
                active: i === 0
            });
        });
        return trackUrlMap;
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
                attrs
            } = CONFIG.urlConfig;

            let task = {
                point_clouds: this.handleMultiPointCloud(point_clouds),
                tracks: this.handleMultiTrack(track),
                region: completeSecendUrl(region, this.activeTask),
                vectors: completeEditUrl(vectors, this.activeTask),
                rels: completeEditUrl(rels, this.activeTask),
                attrs: completeEditUrl(attrs, this.activeTask)
            };

            return task;
        } catch (e) {
            console.log('获取任务资料路径失败' + e.message || e || '');
            throw new Error(this.activeTaskId);
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
                message.error('数据保存失败：' + e.message, 3);
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
        if (this.taskIdList.includes(Number(task.taskId))) {
            throw new Error('资料目录重复');
        }
        this.activeTask = {
            ...task,
            projectId: 1,
            isLocal: true,
            firstTime: true
        };
        this.localTasks.push(this.activeTask);
        this.LocalTaskCallback && this.LocalTaskCallback(this.activeTask);
    };

    @action tasksPop = currentTaskId => {
        //如果当前任务加载报错，则回到无任务状态
        if (this.activeTaskId == currentTaskId) {
            this.activeTask = {};
        }
        //如果是本地加载任务报错，则从任务列表中删除该任务
        const currentTaskIndex = this.localTasks.findIndex(
            item => item.taskId === currentTaskId
        );
        if (currentTaskIndex > -1) {
            const currentTask = this.localTasks[currentTaskIndex];
            const { isLocal, firstTime } = currentTask;
            isLocal && firstTime && this.localTasks.splice(currentTaskIndex, 1);
        }
    };

    @action bindLocalTaskCallback = LocalTaskCallback => {
        this.LocalTaskCallback = LocalTaskCallback;
    };
}

export default new TaskStore();
