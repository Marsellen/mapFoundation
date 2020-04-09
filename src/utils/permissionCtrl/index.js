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
