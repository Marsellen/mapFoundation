//任务环节映射
export const TASK_PROCESS_NAME = [
    { value: 'imp_recognition', label: '人工识别' },
    { value: 'imp_manbuild', label: '人工构建' },
    { value: 'imp_check_after_recognition', label: '人工识别后质检' },
    { value: 'imp_check_after_manbuild', label: '人工构建后质检' }
];
//任务状态映射
export const TASK_MANNUAL_STATUS = [
    { value: 0, label: '下发前' },
    { value: 1, label: '已领取' },
    { value: 2, label: '进行中' },
    { value: 3, label: '挂起' },
    { value: 4, label: '返修' },
    { value: 5, label: '返工' },
    { value: 6, label: '已完成' }
];
//作业任务环节
export const TASK_FIX_TYPES = ['imp_recognition', 'imp_manbuild'];
//质检任务环节
export const TASK_QC_TYPES = ['imp_check_after_recognition', 'imp_check_after_manbuild'];
//任务已领取、进行中状态
export const TASK_FIX_STATUS = [1, 2];
//任务返工、返修状态
export const TASK_REFIX_STATUS = [4, 5];

//过程库查询底图数据时，不同任务环节和参数字段映射
export const UPDATE_BOUNDARY_PARAM_MAP = {
    imp_recognition: {
        referData: 'MS_EDITOR_QUERYDB_PATHS',
        outDir: '1302_MS_AROUND_DATA'
    },
    imp_check_after_recognition: {
        referData: 'MS_EDITOR_QUERYDB_PATHS',
        outDir: '1303_MS_QC_AROUND_DATA'
    },
    imp_manbuild: {
        referData: 'MB_EDITOR_QUERYDB_PATHS',
        outDir: '1304_MB_AROUND_DATA'
    },
    imp_check_after_manbuild: {
        referData: 'MB_EDITOR_QUERYDB_PATHS',
        outDir: '1305_MB_AROUND_DATA'
    }
};

//任务类型
export const TASK_TYPE = {
    100: '底图新增',
    101: '底图更新',
    102: '单点问题修正'
};
