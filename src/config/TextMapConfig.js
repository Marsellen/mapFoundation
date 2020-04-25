export const LAYER_TEXT_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        defaultStyle: {
            textField: 'TYPE',
            interval: 10,
            showMode: 'line-repeat',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    },
    AD_LaneDivider: {
        key: 'AD_LaneDivider',
        label: '车道线',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'line-repeat',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    },
    AD_Lane: {
        key: 'AD_Lane',
        label: '车道中心线',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'line-repeat',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    },
    AD_LaneAttrPoint: {
        key: 'AD_LaneAttrPoint',
        label: '车道属性变化点',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            offset: 10,
            showMode: 'top',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultOffsetMap: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        textModeMap: {
            top: { key: 'top', label: '上方', offset: true },
            right: { key: 'right', label: '右侧', offset: true },
            bottom: { key: 'bottom', label: '下方', offset: true },
            left: { key: 'left', label: '左侧', offset: true }
        }
    },
    AD_Arrow: {
        key: 'AD_Arrow',
        label: '地面导向箭头',
        checked: false,
        defaultStyle: {
            textField: 'ARR_DIRECT', //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polygon-center': { key: 'polygon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        }
    },
    AD_StopLocation: {
        key: 'AD_StopLocation',
        label: '停止位置',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    },
    AD_LaneMark_Plg: {
        key: 'AD_LaneMark_Plg',
        label: '面状标识物',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polygon-center': { key: 'polygon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        }
    },
    AD_Text: {
        key: 'AD_Text',
        label: '地面文字符号',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polygon-center': { key: 'polygon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        }
    },
    AD_TrafficSign: {
        key: 'AD_TrafficSign',
        label: '交通标志牌',
        checked: false,
        defaultStyle: {
            textField: 'SIGN_STYLE', //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polygon-center': { key: 'polygon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        }
    },
    AD_TrafficLight: {
        key: 'AD_TrafficLight',
        label: '交通信号灯',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polygon-center': { key: 'polygon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        }
    },
    AD_Pole: {
        key: 'AD_Pole',
        label: '杆状物',
        checked: false,
        defaultStyle: {
            textField: 'POLE_ID', //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    },
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        defaultStyle: {
            textField: 'TYPE', //看数据规格
            interval: 10,
            showMode: 'line-repeat',
            fontSize: 32,
            strokeColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
            textColor: { r: 255, g: 255, b: 255, a: 1.0 }
        },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'line-center': { key: 'line-center', label: '线中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '线上循环',
                interval: true
            }
        }
    }
};
