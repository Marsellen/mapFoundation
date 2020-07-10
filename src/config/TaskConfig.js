//任务类型映射
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
//作业任务类型
export const TASK_FIX_TYPES = ['imp_recognition', 'imp_manbuild'];
//质检任务类型
export const TASK_QC_TYPES = ['imp_check_after_recognition', 'imp_check_after_manbuild'];
//任务已领取、进行中状态
export const TASK_FIX_STATUS = [1, 2];
//任务返工、返修状态
export const TASK_REFIX_STATUS = [4, 5];
