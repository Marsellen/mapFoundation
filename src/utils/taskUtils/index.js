import CONFIG from 'src/config';
import TaskStore from 'src/pages/Index/store/TaskStore';

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
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${getBoundaryUrl}/${path}`;
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
