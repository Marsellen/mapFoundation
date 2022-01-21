export const BUFFER_CONFIG_MAP = {
    AD_LaneDivider: {
        type: 'Line',
        bufferFields: ['RD_EDGE'],
        order: 14,
        showStyles: ['bufferStyle'],
        key: 'AD_LaneDivider',
        label: '车道线',
        checked: false,
        bufferStyle: {
            RD_EDGE: [
                {
                    key: 'RD_EDGE',
                    value: 1,
                    label: '道路边界',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_Pole_Geo: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 16,
        showStyles: ['bufferStyle'],
        key: 'AD_Pole_Geo',
        label: '几何层：杆状物',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_Lane: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 17,
        showStyles: ['bufferStyle'],
        key: 'AD_Lane',
        label: '车道中心线',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_Road: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 18,
        showStyles: ['bufferStyle'],
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_StopLocation: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 19,
        showStyles: ['bufferStyle'],
        key: 'AD_StopLocation',
        label: '停止位置',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    }
};

export const BUFFER_LAYER_STYLE_CONFIG = {
    type: 'Line',
    bufferFields: ['NOKEY'],
    order: 20,
    showStyles: ['bufferStyle'],
    key: 'AD_buffer',
    label: 'buffer',
    bufferStyle: {
        NOKEY: [
            {
                style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
            }
        ]
    }
};

export const BUFFER_STYLE = { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 };

export const PART_OF_BUFFER_ENABLE_LAYERS = ['AD_LaneDivider'];
