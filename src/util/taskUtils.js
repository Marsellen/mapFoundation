import React from 'react';
import { message } from 'antd';
import CONFIG from 'src/config';
import TaskStore from 'src/store/home/taskStore';
import OperateHistoryStore from 'src/store/home/operateHistoryStore';
import Relevance from 'src/util/relevance';
import Attr from 'src/util/attr';
import editLog from 'src/util/editLog';
import TaskService from 'src/service/taskService';
import { throttle } from './utils';
import SettingStore from 'src/store/setting/settingStore';
import { MB_EDIT_LAYER_MAP, MS_EDIT_LAYER_MAP } from 'src/config/dataLayerConfig';
import appStore from 'src/store/common/appStore';
import BuriedPoint from 'src/util/buriedPoint';
import { operateLock } from 'src/util/decorator';

const SECEND_PATH = {
    imp_recognition: '13_ED_DATA',
    imp_check_after_recognition: '13_ED_DATA',
    imp_manbuild: '13_ED_DATA',
    imp_check_after_manbuild: '13_ED_DATA',
    imp_map_second_check: '13_ED_DATA',
    imp_std_precompile_man_repair: '03_STD_ED_DATA'
};
const THIRD_PATH = {
    imp_recognition: '1301_RAW_DATA',
    imp_check_after_recognition: '1301_RAW_DATA',
    imp_manbuild: '1301_RAW_DATA',
    imp_check_after_manbuild: '1301_RAW_DATA',
    imp_map_second_check: '1301_RAW_DATA',
    imp_std_precompile_man_repair: '0301_RAW_DATA'
};
const THIRD_PATH_MAP = {
    imp_recognition: '1312_MS_VEC_DES',
    imp_check_after_recognition: '1312_MS_VEC_DES',
    imp_manbuild: '1339_MB_VEC_DES',
    imp_check_after_manbuild: '1339_MB_VEC_DES',
    imp_map_second_check: '1339_MB_VEC_DES',
    imp_std_precompile_man_repair: '0303_STD_ED_DES'
};
const BOUNDARY_PATH_MAP = {
    imp_recognition: '1302_MS_AROUND_DATA',
    imp_check_after_recognition: '1303_MS_QC_AROUND_DATA',
    imp_manbuild: '1304_MB_AROUND_DATA',
    imp_check_after_manbuild: '1305_MB_QC_AROUND_DATA',
    imp_map_second_check: '1305_MB_QC_AROUND_DATA',
    imp_std_precompile_man_repair: '0304_STD_AROUND_DES'
};

const GEO_PATH_MAP={
    imp_std_precompile_man_repair: '/ADMAP/COMPILE_STD2RMD/PRECOMP_TASKS/'
};
//人工构建任务类型枚举: [人工构建, 人工构建后质检]
const manbuildTaskProcess = [
    'imp_manbuild',
    'imp_check_after_manbuild',
    'imp_map_second_check',
    'imp_std_precompile_man_repair'
];

export const getExportShpUrl = task => {
    return `${getEditPath(task)}/${CONFIG.urlConfig.vectors}`;
};

export const getEditPath = task => {
    return `/${task.taskId}/${SECEND_PATH[task.processName]}/${getThirdPath(task)}`;
};

// 补齐切片矢量数据路径titlePath
export const completeTitleUrl = (path, task) => {
    const getBoundaryUrl = BOUNDARY_PATH_MAP[task.processName];
    return `${task.Input_imp_data_path}/${SECEND_PATH[task.processName]
        }/${getBoundaryUrl}/${task.titlePath}/${path}?time=${Date.now()}`;
};
 
export const filePathTitleUrl = (task) => {
    
    let url=GEO_PATH_MAP[task.processName]+`${task.taskId}/${SECEND_PATH[task.processName]}/${BOUNDARY_PATH_MAP[task.processName]}/`;
    return  GEO_PATH_MAP[task.processName]+`${task.taskId}/${SECEND_PATH[task.processName]}/${BOUNDARY_PATH_MAP[task.processName]}/`;
};


// 补齐轨迹、照片数据路径
export const completeSecendUrl = (path, task) => {
    return `${task.Input_imp_data_path}/${SECEND_PATH[task.processName]}/${THIRD_PATH[task.processName]
        }/${path}`;
};

// 补齐多工程数据路径，如：点云、轨迹
export const completeMultiProjectUrl = (path, task, projectName) => {
    return `${task.Input_imp_data_path}/${SECEND_PATH[task.processName]}/${THIRD_PATH[task.processName]
        }/${projectName}/${path}`;
};

// 补齐周边底图数据路径
export const completeBoundaryUrl = (path, task) => {
    const getBoundaryUrl = BOUNDARY_PATH_MAP[task.processName];
    return `${task.Input_imp_data_path}/${SECEND_PATH[task.processName]
        }/${getBoundaryUrl}/around/${path}`;
};

// 补齐矢量（可编辑）数据路径
export const completeEditUrl = (path, task) => {
    return `${getEditUrl(task)}/${path}?time=${Date.now()}`;
};

const getEditUrl = task => {
    return `${task.Input_imp_data_path}/${SECEND_PATH[task.processName]}/${getThirdPath(task)}`;
};

const getThirdPath = task => {
    return THIRD_PATH_MAP[task.processName];
};

export const getImgPath = (task, imgUrl) => {
    if (!imgUrl) return;
    const { Input_imp_data_path, taskId } = task;
    const imgPath = imgUrl.replace('/ADMAP', '');
    // 对不同环境适配生产环境/IMP_MAPPING_DATA 开发测试预发/task
    const url = Input_imp_data_path.indexOf('IMP_MAPPING_DATA') != -1 ?
        Input_imp_data_path.replace(`/IMP_MAPPING_DATA/${taskId}`, '') :
        Input_imp_data_path.replace(`/task/${taskId}`, '');
    return `${url}${imgPath}`;
};

export const isManbuildTask = () => {
    let task = TaskStore.activeTask;
    return manbuildTaskProcess.includes(task.processName);
};

export const getTaskProcessType = () => {
    if (isManbuildTask()) {
        return 'manbuild';
    } else {
        return 'recognition';
    }
};

export const saveTaskData = async channel => {
    const isAutoSave = channel === 'auto';
    const type = isAutoSave ? 'auto_save' : 'save';
    try {
        operateLock.lock('保存');
        BuriedPoint.toolBuriedPointStart(type, channel);
        BuriedPoint.toolLoadBuriedPointStart(type, 'tool_start');
        message.loading({ key: 'save', content: '正在保存...', duration: 0 });
        await saveData(isAutoSave);
        message.success({ key: 'save', content: '保存完成', duration: 2 });
        BuriedPoint.toolLoadBuriedPointEnd(type, 'success');
        BuriedPoint.toolBuriedPointEnd(type, 'success');
    } catch (e) {
        BuriedPoint.toolLoadBuriedPointEnd(type, 'error');
        BuriedPoint.toolBuriedPointEnd(type, 'error');
        message.error({
            key: 'save',
            content: '保存失败，数据可能出错，请再次保存',
            duration: 2
        });
    } finally {
        operateLock.unlock();
    }
};

const saveData = async isAutoSave => {
    let hasEmptyData = await checkEmptyData();
    if (hasEmptyData) {
        let log = {
            action: 'save-with-empty',
            result: 'success',
            message: 'agree'
        };
        editLog.add(log);
    }
    await TaskStore.submit();
    await TaskStore.writeEditLog();
    isAutoSave ? OperateHistoryStore.autoSave() : OperateHistoryStore.save();
};

const checkEmptyData = async () => {
    let attrs = await Attr.store.getAll();
    let hasEmptyData = attrs.length === 0;
    if (isManbuildTask()) {
        let rels = await Relevance.store.getAll();
        hasEmptyData = hasEmptyData || rels.length === 0;
    }
    return hasEmptyData;
};

export const statisticsTime = async status => {
    try {
        const {
            activeTask: { taskFetchId },
            isEditableTask
        } = TaskStore;
        const { username } = appStore.loginUser;
        if (!username) return;
        if (!isEditableTask && status === 1) return;
        if (!taskFetchId) return;
        const params = {
            startOrEnd: status,
            username,
            taskFetchId
        };
        await TaskService.statisticsTime(params);
    } catch (e) {
        console.error(`统计作业时间接口异常：${e.message || e}`);
    }
};

//requestAnimationFrame模拟setInterval
const setRequestAnimationFrame = (fn, delay, timerName) => {
    let lastTime = 0;
    let nowTime = 0;
    const timer = () => {
        nowTime = Date.now();
        if (nowTime - lastTime > delay) {
            lastTime = nowTime;
            fn();
        }
        window[timerName] = requestAnimationFrame(timer);
    };
    timer();
};

//开始任务统计时间轮询
export const startTaskTimePolling = () => {
    if (!window.isLogin) return;
    const { overallPollingInterval } = SettingStore.getConfig('OTHER_CONFIG');
    const pollingTime = overallPollingInterval * 1000;
    if (window.taskTimer) return;
    setRequestAnimationFrame(
        () => {
            statisticsTime(0);
        },
        pollingTime,
        'taskTimer'
    );
};

//结束任务统计时间轮询
export const endTaskTimePolling = () => {
    if (!window.taskTimer) return;
    cancelAnimationFrame(window.taskTimer);
    window.taskTimer = null;
};

//结束精细化作业时间轮询
export const endWorkTimePolling = () => {
    if (!window.workTimer) return;
    cancelAnimationFrame(window.workTimer);
    window.workTimer = null;
};

export const windowObserver = () => {
    const body = document.querySelector('html');
    const { statisticInterval, finePollingInterval } = SettingStore.getConfig('OTHER_CONFIG');
    const overtime = statisticInterval * 1000; //停止动作间隔时间
    const pollingTime = finePollingInterval * 1000; //轮询间隔时间
    let startTime; //开始时间
    const eventFun = throttle(() => {
        if (!window.isLogin) return;
        if (!TaskStore.editTaskId) return; //没有开始任务，返回
        startTime = Date.now(); //获取开始动作时间
        if (window.workTimer) return; //正在轮询中，返回
        setRequestAnimationFrame(
            () => {
                const endTime = Date.now(); //获取当前轮询时间
                //当前轮询时间-开始动作时间=停止动作时间，停止动作时间超过阀值，即停止轮询
                if (endTime - startTime > overtime) {
                    endWorkTimePolling();
                } else {
                    statisticsTime(2); //发送给工作流记录
                }
            },
            pollingTime,
            'workTimer'
        );
    }, 200); //防抖时间
    body.addEventListener('click', eventFun);
    body.addEventListener('keydown', eventFun);
    body.addEventListener('mousemove', eventFun);
    body.addEventListener('mousewheel', eventFun);
};

export const getEditableLayerConfig = () => {
    if (isManbuildTask()) {
        return MB_EDIT_LAYER_MAP;
    } else {
        return MS_EDIT_LAYER_MAP;
    }
};
