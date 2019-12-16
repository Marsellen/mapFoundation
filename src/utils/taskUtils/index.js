import CONFIG from 'src/config';

const SECEND_PATH = '13_ED_DATA';
const THIRD_PATH = '1301_RAW_DATA';
const THIRD_PATH_MAP = {
    imp_recognition: '1312_MS_VEC_DES',
    imp_check_after_recognition: '1312_MS_VEC_DES',
    imp_manbuild: '1339_MB_VEC_DES',
    imp_check_after_manbuild: '1339_MB_VEC_DES'
};

//人工构建任务类型枚举: [人工构建, 人工构建后质检]
const manbuildTaskProcess = ['imp_manbuild', 'imp_check_after_manbuild'];

export const getExportShpUrl = task => {
    return `${getEditPath(task)}/${CONFIG.urlConfig.vectors}`;
};

export const getEditPath = task => {
    return `/${task.taskId}/${SECEND_PATH}/${getThirdPath(task)}`;
};

// 补齐点云、轨迹、照片、周边任务数据（不可编辑）数据路径
export const completeSecendUrl = (path, task) => {
    return `${task.Input_imp_data_path}/${SECEND_PATH}/${THIRD_PATH}/${path}`;
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

export const isManbuildTask = task => {
    return manbuildTaskProcess.includes(task.processName);
};
