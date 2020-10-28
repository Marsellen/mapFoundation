import React from 'react';
import { message } from 'antd';
import CONFIG from 'src/config';
import TaskStore from 'src/pages/Index/store/TaskStore';
import OperateHistoryStore from 'src/pages/Index/store/OperateHistoryStore';
import Relevance from 'src/models/relevance';
import Attr from 'src/models/attr';
import editLog from 'src/models/editLog';
import TaskService from 'src/services/TaskService';
import { throttle } from '../utils';
import sysProperties from 'src/models/sysProperties';

const SECEND_PATH = '13_ED_DATA';
const THIRD_PATH = '1301_RAW_DATA';
const THIRD_PATH_MAP = {
    imp_recognition: '1312_MS_VEC_DES',
    imp_check_after_recognition: '1312_MS_VEC_DES',
    imp_manbuild: '1339_MB_VEC_DES',
    imp_check_after_manbuild: '1339_MB_VEC_DES'
};
const BOUNDARY_PATH_MAP = {
    imp_recognition: '1302_MS_AROUND_DATA',
    imp_check_after_recognition: '1303_MS_QC_AROUND_DATA',
    imp_manbuild: '1304_MB_AROUND_DATA',
    imp_check_after_manbuild: '1305_MB_QC_AROUND_DATA'
};

//人工构建任务类型枚举: [人工构建, 人工构建后质检]
const manbuildTaskProcess = ['imp_manbuild', 'imp_check_after_manbuild'];

export const getExportShpUrl = task => {
    return `${getEditPath(task)}/${CONFIG.urlConfig.vectors}`;
};

export const getEditPath = task => {
    return `/${task.taskId}/${SECEND_PATH}/${getThirdPath(task)}`;
};

// 补齐轨迹、照片数据路径
export const completeSecendUrl = (path, task) => {
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${THIRD_PATH}/${path}`;
};

// 补齐多工程数据路径，如：点云、轨迹
export const completeMultiProjectUrl = (path, task, projectName) => {
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${THIRD_PATH}/${projectName}/${path}`;
};

// 补齐周边底图数据路径
export const completeBoundaryUrl = (path, task) => {
    const getBoundaryUrl = BOUNDARY_PATH_MAP[task.processName];
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${getBoundaryUrl}/around/${path}`;
};

// 补齐矢量（可编辑）数据路径
export const completeEditUrl = (path, task) => {
    return `${getEditUrl(task)}/${path}?time=${Date.now()}`;
};

const getEditUrl = task => {
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${getThirdPath(task)}`;
};

const getThirdPath = task => {
    return THIRD_PATH_MAP[task.processName];
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
export const saveTaskData = isAutoSave => {
    return new Promise(async resolve => {
        let hasEmptyData = await checkEmptyData();
        if (hasEmptyData) {
            let log = {
                action: 'save-with-empty',
                result: 'success',
                message: 'agree'
            };
            editLog.add(log);
        }
        await saveData(isAutoSave);
        resolve();
    });
};

const saveData = async isAutoSave => {
    message.loading({ key: 'save', content: '正在保存...', duration: 0 });
    try {
        await statisticsTime(1);
        await TaskStore.submit();
        await TaskStore.writeEditLog();
        isAutoSave ? OperateHistoryStore.autoSave() : OperateHistoryStore.save();
        message.success({ key: 'save', content: '保存完成', duration: 2 });
    } catch (e) {
        message.error({
            key: 'save',
            content: '保存失败，数据可能出错，请再次保存',
            duration: 2
        });
    }
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

export const statisticsTime = status => {
    let {
        activeTask: { taskFetchId },
        isEditableTask
    } = TaskStore;
    if (!isEditableTask && status === 1) return;
    if (!taskFetchId) return;
    let params = {
        startOrEnd: status,
        taskFetchId
    };
    return TaskService.statisticsTime(params);
};

export const windowObserver = () => {
    var body = document.querySelector('html');
    var min = sysProperties.getConfig('statisticInterval') || 10;
    var time = min * 1000;
    var editTaskId = null;
    var timer;
    var handler = () => {
        statisticsTime(3);
        editTaskId = null;
    };
    var eventFun = throttle(() => {
        timer && clearTimeout(timer);
        if (!TaskStore.isEditableTask) return;
        timer = setTimeout(handler, time);
        if (!editTaskId || editTaskId !== TaskStore.editTaskId) {
            statisticsTime(2);
            editTaskId = TaskStore.editTaskId;
        }
    }, 1000);
    body.addEventListener('click', eventFun);
    body.addEventListener('keydown', eventFun);
    body.addEventListener('mousemove', eventFun);
    body.addEventListener('mousewheel', eventFun);
};
