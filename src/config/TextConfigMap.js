export const COMMON_TEXT_CONFIG_MAP = {
    AD_Road: {
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
            textFields: ['TYPE', 'LANE_TYPE', 'SHARE_LINE', 'DIRECTION', 'LANESTATUS', 'LANE_NO'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'LANE_NO', 'DIRECTION', 'STATUS'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            offset: 10,
            showMode: 'top',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['ARR_DIRECT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['CONT_TYPE', 'SPEED', 'TIMEDOM', 'VEH_LMT', 'TEXT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['SIGN_STYLE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['LIGHT_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE', 'MATERIAL'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
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
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
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

const MS_TASK_TEXT_CONFIG_MAP = {
    AD_Road: {
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
        checked: true,
        defaultStyle: {
            textFields: ['TYPE', 'LANE_TYPE', 'SHARE_LINE', 'DIRECTION', 'LANESTATUS', 'LANE_NO'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'LANE_NO', 'DIRECTION', 'STATUS'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            offset: 10,
            showMode: 'top',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
        checked: true,
        defaultStyle: {
            textFields: ['ARR_DIRECT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['CONT_TYPE', 'SPEED', 'TIMEDOM', 'VEH_LMT', 'TEXT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['SIGN_STYLE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['LIGHT_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE', 'MATERIAL'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
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
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
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

const MB_TASK_TEXT_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: true,
        defaultStyle: {
            textFields: ['TYPE', 'RD_STATUS', 'CROSSING', 'DIRECTION'],
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'LANE_TYPE', 'SHARE_LINE', 'DIRECTION', 'LANESTATUS', 'LANE_NO'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
        checked: true,
        defaultStyle: {
            textFields: ['TYPE', 'LANE_NO', 'DIRECTION', 'STATUS'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            offset: 10,
            showMode: 'top',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['ARR_DIRECT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['CONT_TYPE', 'SPEED', 'TIMEDOM', 'VEH_LMT', 'TEXT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['SIGN_STYLE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['LIGHT_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE', 'MATERIAL'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
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
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
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

const QC_TASK_TEXT_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE'],
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE', 'LANE_NO'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            offset: 10,
            showMode: 'top',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['ARR_DIRECT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['TYPE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['CONT_TYPE', 'SPEED', 'TIMEDOM', 'VEH_LMT', 'TEXT'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['SIGN_STYLE'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
            textFields: ['LIGHT_ID'], //看数据规格
            interval: 10,
            showMode: 'polygon-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        defaultStyle: {
            textFields: ['TYPE', 'MATERIAL'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_LaneDivider_Pln: {
        key: 'AD_LaneDivider_Pln',
        label: '几何层：车道线线要素',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'line-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_Arrow_Geo: {
        key: 'AD_Arrow_Geo',
        label: '几何层：箭头',
        checked: false,
        defaultStyle: {
            textFields: ['FEAT_TYPE'], //看数据规格
            interval: 10,
            showMode: 'longest-center',
            fontSize: 40,
            strokeColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            textColor: 'rgba(255,255,255,1)'
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
    AD_TrafficSign_Geo: {
        key: 'AD_TrafficSign_Geo',
        label: ' 几何层：交通标志牌',
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
    AD_TrafficLight_Geo: {
        key: 'AD_TrafficLight_Geo',
        label: '几何层：交通信号灯',
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

export const TASK_TEXT_CONFIG_MAP = {
    imp_recognition: MS_TASK_TEXT_CONFIG_MAP, //人工识别
    imp_check_after_recognition: QC_TASK_TEXT_CONFIG_MAP, //人工识别后质检
    imp_manbuild: MB_TASK_TEXT_CONFIG_MAP, //人工构建
    imp_check_after_manbuild: QC_TASK_TEXT_CONFIG_MAP //人工构建后质检
};
