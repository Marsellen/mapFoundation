import _ from 'lodash';

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

export const getEditLayers = (
    layers,
    { roleCode } = {},
    { manualStatus } = {}
) => {
    layers = _.cloneDeep(
        (layers || []).map(layer => {
            let { value, label } = layer;
            return { value, label };
        })
    );
    let configs = PERMISSION_CONFIG;
    if (roleCode == 'producer' && [4, 5].includes(manualStatus)) {
        configs = {
            ...PERMISSION_CONFIG,
            producer: {}
        };
    }

    let config = configs[roleCode];
    if (config && config.reject) {
        layers.forEach(layer => {
            if (config.reject.includes(layer.value)) {
                layer.disabled = true;
            }
        });
    } else if (config && config.enable) {
        layers.forEach(layer => {
            if (!config.enable.includes(layer.value)) {
                layer.disabled = true;
            }
        });
    }

    return layers ? [{ value: false, label: '不启用' }, ...layers] : [];
};
