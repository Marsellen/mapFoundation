export const COMMON_TEXT_CONFIG_MAP = {
    AD_Road: {
        type: 'Line',
        textFields: ['TYPE', 'RD_STATUS', 'CROSSING', 'DIRECTION'],
        showStyles: ['textStyle'],
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE', 'RD_STATUS', 'CROSSING', 'DIRECTION'],
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'RD_EDGE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'LANE_NO', 'DIRECTION', 'STATUS'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Arrow: {
        key: 'AD_Arrow',
        label: '地面导向箭头',
        checked: false,
        defaultStyle: {
            textFields: ['ARR_DIRECT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Text: {
        key: 'AD_Text',
        label: '地面文字符号',
        checked: false,
        defaultStyle: {
            textFields: ['CONT_TYPE', 'SPEED', 'TIMEDOM', 'VEH_LMT', 'TEXT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['SIGN_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['LIGHT_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneDivider_Plg: {
        key: 'AD_LaneDivider_Plg',
        label: '几何层：车道线面要素',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_StopLocation_Geo: {
        key: 'AD_StopLocation_Geo',
        label: '几何层：停止位置',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneMark_Geo: {
        key: 'AD_LaneMark_Geo',
        label: '几何层：路面车道标记',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Pole_Geo: {
        key: 'AD_Pole_Geo',
        label: '几何层：杆状物',
        checked: false,
        defaultStyle: {
            textFields: ['OBJ_ID'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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