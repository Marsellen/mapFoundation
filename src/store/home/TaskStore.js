import { observable, flow, configure, action, computed } from 'mobx';
import TaskService from 'src/service/taskService';
import JobService from 'src/service/jobService';
import EditorService from 'src/service/editorService';
import axios from 'axios';
import { message } from 'antd';
import CONFIG from 'src/config';
import {
    getAllVectorData,
    getAllRelData,
    getAllAttrData,
    getAllDataSnapshot
} from 'src/tool/vectorUtils';
import { getAuthentication } from 'src/tool/session';
import editLog from 'src/tool/editLog';
import moment from 'moment';
import { LayerGroup } from 'addis-viz-sdk';
import {
    getExportShpUrl,
    getEditPath,
    completeSecendUrl,
    completeEditUrl,
    completeBoundaryUrl,
    completeMultiProjectUrl,
    startTaskTimePolling,
    endTaskTimePolling,
    endWorkTimePolling
} from 'src/tool/taskUtils';
import RelStore from './relStore';
import AttrStore from './attrStore';
import { getTaskProcessType } from 'src/tool/taskUtils';
import {
    TASK_FIX_TYPES,
    TASK_QC_TYPES,
    TASK_FIX_STATUS,
    TASK_REFIX_STATUS,
    UPDATE_BOUNDARY_PARAM_MAP
} from 'src/config/taskConfig';
import LocalTask from 'src/tool/task/localTask';
import AddTask from 'src/tool/task/addTask';
import UpdateTask from 'src/tool/task/updateTask';
import ModifyTask from 'src/tool/task/modifyTask';
import { VECTOR_FILES, ATTR_FILES, REL_FILES } from 'src/config/taskConfig';
import { fetchCallback } from 'src/tool/map/utils';
import PointCloudStore from 'src/store/home/pointCloudStore';
import DefaultStyleConfig from 'src/config/defaultStyleConfig';

configure({ enforceActions: 'always' });
class TaskStore {
    taskFileNames;
    boundaryFileNames;
    taskFileMap;
    boundaryFileMap;
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

    @computed get isLocalTask() {
        return this.activeTask?.isLocal;
    }

    @computed get isEditableTask() {
        return this.activeTaskId && this.activeTaskId == this.editTaskId;
    }

    //是否是人工识别任务
    @computed get isMsTask() {
        return this.activeTask && this.activeTask.processName === 'imp_recognition';
    }

    //是否是作业任务：人工识别或人工构建
    @computed get isFixTask() {
        if (!this.activeTask) return;
        return TASK_FIX_TYPES.includes(this.activeTask.processName);
    }

    //是否是质检任务：人工识别后质检或人工构建后质检
    @computed get isQcTask() {
        if (!this.activeTask) return;
        return TASK_QC_TYPES.includes(this.activeTask.processName);
    }

    //任务状态是已领取或进行中
    @computed get isFixStatus() {
        if (!this.activeTask) return;
        return TASK_FIX_STATUS.includes(this.activeTask.manualStatus);
    }

    //任务状态是返修或返工
    @computed get isRefixStatus() {
        if (!this.activeTask) return;
        return TASK_REFIX_STATUS.includes(this.activeTask.manualStatus);
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

    updateActiveTask = () => {
        if (!this.activeTask) return;
        const currentTask = this.onlineTasks.find(task => task.taskId === this.activeTask.taskId);
        this.activeTask = Object.assign(this.activeTask, currentTask);
    };

    // 任务列表
    initTask = flow(function* (option) {
        try {
            const result = yield JobService.listTask(option);

            this.onlineTasks = result.data.taskList;
            this.updateActiveTask();
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

    // getActiveTask = () => {
    //     switch (this.activeTask.task_sub_type) {
    //         case 'local':
    //             return new LocalTask(this.activeTask);
    //         case 100: //底图新增
    //             return new AddTask(this.activeTask);
    //         case 101: //底图更新
    //             return new UpdateTask(this.activeTask);
    //         case 102: //单点问题修正
    //             return new ModifyTask(this.activeTask);
    //         default:
    //             return new AddTask(this.activeTask);
    //     }
    // };

    getActiveTask = () => {
        return new AddTask(this.activeTask);
    };

    //任务切换
    setActiveTask = flow(function* (id) {
        //关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
        //结束统计作业时间、结束统计精细化作业时间
        if (id && this.activeTaskId !== id) {
            endTaskTimePolling();
            endWorkTimePolling();
        }
        if (this.validTasks && this.validTasks.length && id) {
            this.activeTask = this.validTasks.find(item => {
                return item.taskId === id;
            });
            this.activeTask = this.getActiveTask();
            this.activeTask.firstTime = false;
        } else {
            this.activeTask = {};
        }

        this.taskSaveTime = null;
        this.editTaskId = null;
    });

    startTaskEdit = flow(function* (id) {
        this.editTaskId = id;
        this.fetchTask();
        if (id) startTaskTimePolling();
    });

    @action getBoundaryLayer = () => {
        const taskType = this.taskProcessName;
        const updateBoundaryParams = this.initUpdateBoundaryParams(taskType);
        // 如果是本地加载任务，则直接获取底图；如果是工作流下发任务，则先更新再获取底图
        if (this.activeTask.isLocal) {
            return this.getBoundaryFile();
        } else {
            return this.updateBoundaryFile(updateBoundaryParams);
        }
    };

    //过程库查询参数
    initUpdateBoundaryParams = taskType => {
        const region = window.vectorLayer.getAllFeatures()[0];
        if (!region) return;
        const { bufferRegionWkt } = region.data.properties;
        const { referData, outDir } = UPDATE_BOUNDARY_PARAM_MAP[taskType];
        const params = {
            queryType: 'wkt',
            region: '2',
            outFormat: 'editjson',
            wktList: [bufferRegionWkt],
            referData: this.activeTask[referData],
            outDir: this.activeTask[outDir],
            taskId: this.activeTaskId
        };
        return params;
    };

    //母库查询参数
    // initUpdateBoundaryParams = taskType => {
    //     const params = {
    //         imp_recognition: {
    //             task_id: this.activeTaskId,
    //             comm_path: this.activeTask['10_COMMON_DATA'],
    //             res_path: this.activeTask['1302_MS_AROUND_DATA'],
    //             refer_path: this.activeTask['MS_EDITOR_QUERYDB_PATHS'],
    //             in_csys: 'mct',
    //             out_csys: 'mct'
    //         },
    //         imp_check_after_recognition: {
    //             task_id: this.activeTaskId,
    //             comm_path: this.activeTask['10_COMMON_DATA'],
    //             res_path: this.activeTask['1303_MS_QC_AROUND_DATA'],
    //             refer_path: this.activeTask['MS_EDITOR_QUERYDB_PATHS'],
    //             in_csys: 'mct',
    //             out_csys: 'mct'
    //         },
    //         imp_manbuild: {
    //             task_id: this.activeTaskId,
    //             comm_path: this.activeTask['10_COMMON_DATA'],
    //             res_path: this.activeTask['1304_MB_AROUND_DATA'],
    //             refer_path: this.activeTask['MB_EDITOR_QUERYDB_PATHS'],
    //             in_csys: 'mct',
    //             out_csys: 'mct'
    //         },
    //         imp_check_after_manbuild: {
    //             task_id: this.activeTaskId,
    //             comm_path: this.activeTask['10_COMMON_DATA'],
    //             res_path: this.activeTask['1305_MB_QC_AROUND_DATA'],
    //             refer_path: this.activeTask['MB_EDITOR_QUERYDB_PATHS'],
    //             in_csys: 'mct',
    //             out_csys: 'mct'
    //         }
    //     };
    //     return params[taskType];
    // };

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
        endTaskTimePolling();
        endWorkTimePolling();
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

    getBoundaryFile = flow(function* () {
        if (!window.map) return;
        yield this.getBoundaryFileList();
        try {
            const { vectors, rels, attrs } = this.boundaryFileMap;
            const layerGroup = new LayerGroup(vectors, {
                styleConifg: DefaultStyleConfig
            });
            yield Promise.allSettled([
                window.map.getLayerManager().addLayerGroup(layerGroup, fetchCallback),
                AttrStore.addRecords(attrs, 'boundary'),
                RelStore.addRecords(rels, 'boundary')
            ]);
            return layerGroup;
        } catch (e) {
            throw new Error('周边底图数据部分图层加载失败');
        }
    });

    updateBoundaryFile = flow(function* (option) {
        try {
            yield TaskService.updateBoundaryFile(option);
        } catch (e) {
            const errMsg = e.message || e || '';
            if (errMsg.includes && errMsg.includes('超时')) {
                message.warning('过程库服务请求超时 /storeQuery');
            }
            console.log('获取底图失败' + errMsg);
        }
        return this.getBoundaryFile();
    });

    getTaskFileMap = (fileNames, completeUrlFn) => {
        const fileMap = { vectors: [], attrs: [], rels: [] };
        fileNames.forEach(fileName => {
            const url = completeUrlFn(fileName, this.activeTask);
            VECTOR_FILES.includes(fileName) && fileMap.vectors.push(url);
            ATTR_FILES.includes(fileName) && fileMap.attrs.push(url);
            REL_FILES.includes(fileName) && fileMap.rels.push(url);
        });
        return fileMap;
    };

    //获取任务文件列表
    getTaskFileList = flow(function* () {
        try {
            if (!this.activeTaskUrl) return;
            const { taskId, processName } = this.activeTask;
            const result = yield EditorService.getFileList({
                taskId: taskId,
                queryType: 'currentTask',
                taskType: processName
            });
            const { successCurrentList } = result?.data ?? {};
            this.taskFileNames = successCurrentList;
            this.taskFileMap = this.getTaskFileMap(successCurrentList, completeEditUrl);
        } catch (e) {
            console.log(`task file list 请求失败：${e.message || e}`);
            throw new Error(this.activeTaskId);
        }
    }).bind(this);

    //获取周边底图文件列表
    getBoundaryFileList = flow(function* () {
        try {
            const { taskId, processName } = this.activeTask;
            const result = yield EditorService.getFileList({
                taskId: taskId,
                queryType: 'boundary',
                taskType: processName
            });
            const { successBoundaryList } = result?.data ?? {};
            if (successBoundaryList.length === 0) throw new Error('当前任务没有周边底图数据');
            this.boundaryFileNames = successBoundaryList;
            this.boundaryFileMap = this.getTaskFileMap(successBoundaryList, completeBoundaryUrl);
        } catch (e) {
            throw new Error('当前任务没有周边底图数据');
        }
    }).bind(this);

    getTaskInfo = flow(function* () {
        try {
            if (!this.activeTaskUrl) return;
            const { taskInfo } = CONFIG.urlConfig;
            const url = completeSecendUrl(taskInfo, this.activeTask);
            const { data } = yield axios.get(url);
            const { projectNames, lidarNames, defaultLidarName, treeContent } = data;
            this.projectNameArr = projectNames.split(';').sort();
            this.multiProjectMap = this.initMultiProjectMap();
            this.lidarNameArr = JSON.parse(lidarNames);
            this.defaultLidarName = JSON.parse(defaultLidarName);
            this.multiProjectTree = treeContent;
            PointCloudStore.initPointCloudMap(data, this.activeTask);
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
        let lidarUrlArr = [];
        Object.entries(this.multiProjectTree).forEach(([projectName, project]) => {
            const projectLidarMap = {};
            Object.entries(project.POINTCLOUD).forEach(([pcName, trees]) => {
                //因雷达名中有特殊符号，需要进行转码
                pcName = encodeURIComponent(pcName);

                //获取该点云所有八叉树的url
                const urls = trees.map(treeName => {
                    const url = completeMultiProjectUrl(
                        `point_clouds/${pcName}/${treeName}/${lastPath}`,
                        this.activeTask,
                        projectName
                    );
                    return url;
                });

                //获取雷达的默认数组，判断当前雷达是否属于默认数组
                const defaultLidarArr = this.defaultLidarName[projectName];
                const isDefaultLidar = defaultLidarArr.includes(pcName);

                projectLidarMap[pcName] = {
                    key: `${projectName}|point_clouds|${pcName}`,
                    label: pcName,
                    layerKey: urls,
                    checked: isDefaultLidar,
                    layerName: 'pointCloudLayer'
                };

                lidarUrlArr = [...lidarUrlArr, ...urls];
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
            const url = completeMultiProjectUrl(lastPath, this.activeTask, projectName);

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

            const { point_clouds, track, region } = CONFIG.urlConfig;
            const { vectors, rels, attrs } = this.taskFileMap;

            let task = {
                point_clouds: this.handleMultiPointCloud(point_clouds),
                tracks: this.handleMultiTrack(track),
                region: completeSecendUrl(region, this.activeTask),
                vectors,
                rels,
                attrs
            };

            return task;
        } catch (e) {
            console.log('获取任务资料路径失败' + e.message || e || '');
            throw new Error(this.activeTaskId);
        }
    };

    completeData = (data, typeName) => {
        this.taskFileMap[typeName].forEach(fileName => {
            const layerName = fileName.match(/\/([^/]+)\.geojson/)[1];
            const isInclude = data.features.find(item => item.name === layerName);
            if (!isInclude) {
                data.features.push({
                    features: [],
                    name: layerName,
                    type: 'FeatureCollection'
                });
            }
        });
        return data;
    };

    //获取当前所有图层名，合并到文件列表中，合成新的文件列表
    getFileNameList = (vectorData, relData, attrData) => {
        const allData = [...vectorData.features, ...relData.features, ...attrData.features];
        const newFileNameList = allData.map(item => item.name + '.geojson');
        const allFileNameList = [...newFileNameList, ...this.taskFileNames];
        const fileNameList = [...new Set(allFileNameList)];
        return fileNameList;
    };

    submit = flow(function* () {
        let vectorData = getAllVectorData(true);
        let relData = yield getAllRelData(true);
        let attrData = yield getAllAttrData(true);
        relData = this.completeData(relData, 'rels');
        attrData = this.completeData(attrData, 'attrs');
        let path = getEditPath(this.activeTask);
        let saveData = {
            saveList: [
                {
                    filePath: path,
                    fileName: 'ads_all',
                    fileFormat: 'geojson',
                    fileData: vectorData
                },
                {
                    filePath: path,
                    fileName: 'attrs',
                    fileFormat: 'geojson',
                    fileData: attrData
                },
                {
                    filePath: path,
                    fileName: 'rels',
                    fileFormat: 'geojson',
                    fileData: relData
                }
            ],
            fileNameList: this.getFileNameList(vectorData, relData, attrData)
        };
        yield TaskService.saveFile(saveData);
        this.taskSaveTime = moment().format('YYYY-MM-DD HH:mm:ss');
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
            let { taskId, processName, Input_imp_data_path: inputImpDataPath } = this.activeTask;
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

    loadLocalTask = flow(function* (task) {
        if (this.taskIdList.includes(Number(task.taskId))) {
            throw new Error('资料目录重复');
        }
        endTaskTimePolling();
        endWorkTimePolling();
        const currentTask = {
            ...task,
            projectId: 1,
            isLocal: true,
            firstTime: true,
            task_sub_type: 'local'
        };
        this.localTasks.push(currentTask);
    });

    tasksPop = flow(function* (currentTaskId) {
        endTaskTimePolling();
        endWorkTimePolling();
        //如果当前任务加载报错，则回到无任务状态
        if (this.activeTaskId == currentTaskId) {
            this.activeTask = {};
        }
        //如果是本地加载任务报错，则从任务列表中删除该任务
        const currentTaskIndex = this.localTasks.findIndex(item => item.taskId === currentTaskId);
        if (currentTaskIndex > -1) {
            const currentTask = this.localTasks[currentTaskIndex];
            const { isLocal, firstTime } = currentTask;
            isLocal && firstTime && this.localTasks.splice(currentTaskIndex, 1);
        }
    }).bind(this);
}

export default new TaskStore();
