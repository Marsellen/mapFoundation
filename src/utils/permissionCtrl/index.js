import _ from 'lodash';
import appStore from 'src/store/appStore';
import TaskStore from 'src/pages/Index/store/TaskStore';

export const getEditLayerDisabled = () => {
    const { roleCode } = appStore.loginUser;
    const {
        activeTask: { manualStatus },
        isEditableTask
    } = TaskStore;

    // 未开始任务不可设置编辑图层
    if (!isEditableTask) return true;
    // [4, 5] 返修返工任务类型
    if (roleCode == 'producer' && [4, 5].includes(manualStatus)) {
        return false;
    }

    return !getLayerEditAble();
};

export const getLayerEditAble = () => {
    const { roleCode } = appStore.loginUser;
    return roleCode == 'producer';
};

export const getQualityChecked = record => {
    const { roleCode } = appStore.loginUser;
    if (/quality/.test(roleCode)) {
        return record.status !== 1;
    }
    return record.misrepId ? true : false;
};

/**
 * 通过‘用户权限’和‘检查结果’获取误报操作按钮状态
 * @method getQualityMisrepStatus
 * @param {Object} record 检查结果项
 * @returns {}
 */
export const getQualityMisrepStatus = record => {
    const { roleCode } = appStore.loginUser;
    if (/quality/.test(roleCode)) {
        return {
            addDisabled: record.status === 2,
            delDisabled: record.status === 4
        };
    }
    return {
        addDisabled: !!record.misrepId,
        delDisabled: !record.misrepId
    };
};
