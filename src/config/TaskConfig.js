export const TASK_PROCESS_NAME = [
    { value: 'imp_recognition', label: '人工识别' },
    { value: 'imp_manbuild', label: '人工构建' },
    { value: 'imp_check_after_recognition', label: '人工识别后质检' },
    { value: 'imp_check_after_manbuild', label: '人工构建后质检' }
];

export const TASK_MANNUAL_STATUS = [
    { value: 0, label: '下发前' },
    { value: 1, label: '已领取' },
    { value: 2, label: '进行中' },
    { value: 3, label: '挂起' },
    { value: 4, label: '返修' },
    { value: 5, label: '返工' },
    { value: 6, label: '已完成' }
];

export const PROD_TASK_TYPES = ['imp_recognition', 'imp_manbuild'];
export const TASK_START_STATUS = [0, 1, 2];
