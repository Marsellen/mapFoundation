export const BUFFER_CONFIG_MAP = {
    AD_LaneDivider: {
        type: 'Line',
        bufferFields: ['RD_EDGE'],
        order: 1,
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
                    style: { color: 'rgb(255,255,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_RS_Barrier: {
        type: 'Line',
        bufferFields: ['TYPE'],
        order: 15,
        showStyles: ['bufferStyle'],
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        bufferStyle: {
            TYPE: [
                {
                    key: 'TYPE',
                    value: 3102,
                    label: '路侧防护栏',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }, 
                {
                    key: 'TYPE',
                    value: 3103,
                    label: '路缘石',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }, 
                {
                    key: 'TYPE',
                    value: 3104,
                    label: '隔音墙',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }, 
                {
                    key: 'TYPE',
                    value: 3105,
                    label: '其他墙体',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }, 
                {
                    key: 'TYPE',
                    value: 3106,
                    label: '道路轮廓标',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                },
                {
                    key: 'TYPE',
                    value: 3121,
                    label: '新泽西护栏',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                },
                {
                    key: 'TYPE',
                    value: 3122,
                    label: '市政护栏',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                },
                {
                    key: 'TYPE',
                    value: 3199,
                    label: '其他',
                    style: { color: 'rgb(255,800,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_Pole_Geo: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_Pole_Geo',
        label: '几何层：杆状物',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,255,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_LaneDivider_Plg: {
        type: 'Polygon',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_LaneDivider_Plg',
        label: '几何层：车道线面要素',
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: {
                        color: 'rgb(255,255,80)',
                        opacity: 0.1,
                        radius: 0.2,
                        longRadius: 0,
                        shortRadius: 0.5,
                        corner: false
                    }
                }
            ]
        }
    },
    AD_Text: {
        type: 'Polygon',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_Text',
        label: '地面文字符号',
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: {
                        color: 'rgb(255,255,80)',
                        opacity: 0.1,
                        radius: 0.2,
                        longRadius: 0.3,
                        shortRadius: 0.5,
                        corner: false
                    }
                }
            ]
        }
    },
    AD_Lane: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_Lane',
        label: '车道中心线',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,255,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_Road: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 2,
        showStyles: ['bufferStyle'],
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,255,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_StopLocation: {
        type: 'Line',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_StopLocation',
        label: '停止位置',
        checked: false,
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: { color: 'rgb(255,255,80)', opacity: 0.2, radius: 0.2 }
                }
            ]
        }
    },
    AD_StopLocation_Geo: {
        type: 'Polygon',
        bufferFields: ['NOKEY'],
        order: 1,
        showStyles: ['bufferStyle'],
        key: 'AD_StopLocation_Geo',
        label: '几何层：停止位置',
        bufferStyle: {
            NOKEY: [
                {
                    key: 'NOKEY',
                    style: {
                        color: 'rgb(255,255,80)',
                        opacity: 0.1,
                        radius: 0.2,
                        longRadius: 0.5,
                        shortRadius: 0.3,
                        corner: false
                    }
                }
            ]
        }
    }
};

export const BUFFER_LAYER_STYLE_CONFIG = {
    type: 'Line',
    bufferFields: ['NOKEY'],
    order: 1,
    showStyles: ['bufferStyle'],
    key: 'AD_buffer',
    label: 'buffer',
    bufferStyle: {
        NOKEY: [
            {
                key: 'NOKEY',
                style: {
                    color: 'rgb(255,255,80)',
                    opacity: 0.2,
                    radius: 0.2,
                    longRadius: 0,
                    shortRadius: 0.5,
                    corner: false
                }
            }
        ]
    }
};

export const BUFFER_STYLE = {
    color: 'rgb(255,255,80)',
    opacity: 0.2,
    radius: 0.2,
    longRadius: 0,
    shortRadius: 0.5
};

export const PART_OF_BUFFER_ENABLE_LAYERS = ['AD_LaneDivider', 'AD_RS_Barrier'];
