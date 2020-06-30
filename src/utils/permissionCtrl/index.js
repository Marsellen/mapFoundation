import _ from 'lodash';
import appStore from 'src/store/appStore';
import TaskStore from 'src/pages/Index/store/TaskStore';

const PERMISSION_CONFIG = {
    producer: {
        reject: ['AD_Map_QC']
    },
    quality: {
        enable: ['AD_Map_QC']
    },
    producer_quality_manager: {
        enable: ['AD_Map_QC']
    }
};

export const getEditLayers = layers => {
    layers = _.cloneDeep(
        (layers || []).map(layer => {
            let { value, label } = layer;
            return { value, label };
        })
    );
    layers.forEach(layer => {
        layer.disabled = getEditLayerDisabled(layer.value);
    });

    return layers ? [{ value: false, label: '不启用' }, ...layers] : [];
};

export const getEditLayerDisabled = layerName => {
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

    return !getLayerEditAble(layerName);
};

export const getLayerEditAble = layerName => {
    const { roleCode } = appStore.loginUser;
    let config = PERMISSION_CONFIG[roleCode];
    if (config && config.reject) {
        return !config.reject.includes(layerName);
    } else if (config && config.enable) {
        return config.enable.includes(layerName);
    }
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
