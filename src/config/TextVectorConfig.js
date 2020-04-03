export const LAYER_TEXT_MAP = {
    AD_ROAD: {
        key: 'AD_ROAD',
        label: '道路参考线',
        checked: false,
        interval: 10,
        showMode: 'line-repeat',
        fontSize: 32,
        textKey: 'TYPE',
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'ROAD_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '道路参考线类型'
            },
            {
                key: 'RD_CLASS',
                label: '道路等级'
            },
            {
                key: 'CROSSING',
                label: '交叉路口标识'
            },
            {
                key: 'RD_STATUS',
                label: '道路通行状态'
            },
            {
                key: 'RD_FORM',
                label: '道路形态'
            },
            {
                key: 'DIRECTION',
                label: '道路通行方向'
            },
            {
                key: 'LENGTH',
                label: '道路长度'
            },
            {
                key: 'MAX_SPEED',
                label: '道路最高行驶速度'
            }
        ]
    },
    AD_LANEDIVIDER: {
        key: 'AD_LANEDIVIDER',
        label: '车道线',
        checked: false,
        interval: 10,
        showMode: 'line-repeat',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'LDIV_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '车道线类型'
            },
            {
                key: 'RD_LINE',
                label: '道路参考线标识'
            },
            {
                key: 'SHARE_LINE',
                label: '共用车道线标识'
            },
            {
                key: 'RD_EDGE',
                label: '道路边界标识'
            },
            {
                key: 'DIRECTION',
                label: '车道通行方向'
            },
            {
                key: 'LANESTATUS',
                label: '车道通行状态'
            },
            {
                key: 'LANE_TYPE',
                label: '车道类型'
            },
            {
                key: 'LANE_NO',
                label: '车道编号'
            },
            {
                key: 'RD_FORM',
                label: '道路形态'
            }
        ]
    },
    AD_LANE: {
        key: 'AD_LANE',
        label: '车道中心线',
        checked: false,
        interval: 10,
        showMode: 'line-repeat',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'LANE_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '车道类型'
            },
            {
                key: 'LANE_NO',
                label: '车道编号'
            },
            {
                key: 'DIRECTION',
                label: '车道通行方向'
            },
            {
                key: 'STATUS',
                label: '车道通行状态'
            },
            {
                key: 'MAX_SPEED',
                label: '车道最高行驶速度'
            },
            {
                key: 'MIN_SPEED',
                label: '车道最低行驶速度'
            },
            {
                key: 'MAX_SP_TYP',
                label: '车道最高行驶速度数据来源'
            },
            {
                key: 'MIN_SP_TYP',
                label: '车道最低行驶速度数据来源'
            },
            {
                key: 'ROAD_ID',
                label: '关联道路参考线ID'
            },
            {
                key: 'L_LDIV_ID',
                label: '关联左侧车道线ID'
            },
            {
                key: 'R_LDIV_ID',
                label: '关联右侧车道线ID'
            }
        ]
    },
    AD_LANEATTRPOINT: {
        key: 'AD_LANEATTRPOINT',
        label: '车道属性变化点',
        checked: false,
        offset: 10,
        showMode: 'top',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'LAP_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '属性变化点类型'
            },
            {
                key: 'ROAD_ID',
                label: '关联道路参考线ID'
            }
        ]
    },
    AD_ARROW: {
        key: 'AD_ARROW',
        label: '地面导向箭头',
        checked: false,
        interval: 10,
        showMode: 'longest-center',
        fontSize: 32,
        textKey: 'ARR_DIRECT', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polyon-center': { key: 'polyon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        },
        textTypeArr: [
            {
                key: 'ARR_ID',
                label: '用户编号'
            },
            {
                key: 'ARR_DIRECT',
                label: '箭头方向'
            },
            {
                key: 'LANE_ID',
                label: '关联车道中心线ID'
            }
        ]
    },
    AD_STOPLOCATION: {
        key: 'AD_STOPLOCATION',
        label: '停止位置',
        checked: false,
        interval: 10,
        showMode: 'line-center',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'STOPL_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '停车线类型'
            }
        ]
    },
    AD_LANEMARK_PLG: {
        key: 'AD_LANEMARK_PLG',
        label: '面状标识物',
        checked: false,
        interval: 10,
        showMode: 'polyon-center',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polyon-center': { key: 'polyon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        },
        textTypeArr: [
            {
                key: 'PLG_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '面状标识物类型'
            }
        ]
    },
    AD_TEXT: {
        key: 'AD_TEXT',
        label: '地面文字符号',
        checked: false,
        interval: 10,
        showMode: 'longest-center',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polyon-center': { key: 'polyon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        },
        textTypeArr: [
            {
                key: 'TEXT_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '地面文字符号类型'
            },
            {
                key: 'VALUE',
                label: '地面文字内容'
            },
            {
                key: 'LANE_ID',
                label: '关联车道中心线ID'
            }
        ]
    },
    AD_TRAFFICSIGN: {
        key: 'AD_TRAFFICSIGN',
        label: '交通标志牌',
        checked: false,
        interval: 10,
        showMode: 'polyon-center',
        fontSize: 32,
        textKey: 'SIGN_STYLE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polyon-center': { key: 'polyon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        },
        textTypeArr: [
            {
                key: 'SIGN_ID',
                label: '用户编号'
            },
            {
                key: 'SIGN_STYLE',
                label: '交通标志牌样式'
            }
        ]
    },
    AD_TRAFFICLIGHT: {
        key: 'AD_TRAFFICLIGHT',
        label: '交通信号灯',
        checked: false,
        interval: 10,
        showMode: 'polyon-center',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
        defaultIntervalMap: {
            'line-repeat': 10
        },
        textModeMap: {
            'polyon-center': { key: 'polyon-center', label: '面中心' },
            'longest-center': { key: 'longest-center', label: '最长边中心' },
            'line-repeat': {
                key: 'line-repeat',
                label: '边线循环',
                interval: true
            }
        },
        textTypeArr: [
            {
                key: 'LIGHT_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '交通信号灯类型'
            },
            {
                key: 'LAYOUT',
                label: '交通信号灯灯头布局'
            },
            {
                key: 'LAMP_COUNT',
                label: '交通信号灯灯头数量'
            }
        ]
    },
    AD_POLE: {
        key: 'AD_POLE',
        label: '杆状物',
        checked: false,
        interval: 10,
        showMode: 'line-center',
        fontSize: 32,
        textKey: 'POLE_ID', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'POLE_ID',
                label: '用户编号'
            },
            {
                key: 'RADIUS_UP',
                label: '顶部半径'
            },
            {
                key: 'RADIUS_DN',
                label: '底部半径'
            }
        ]
    },
    AD_RS_BARRIER: {
        key: 'AD_RS_BARRIER',
        label: '隔离带、护栏',
        checked: false,
        interval: 10,
        showMode: 'line-repeat',
        fontSize: 32,
        textKey: 'TYPE', //看数据规格
        borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
        backgroundColor: { r: 0, g: 0, b: 0, a: 0.7 },
        textColor: { r: 255, g: 255, b: 255, a: 1.0 },
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
        },
        textTypeArr: [
            {
                key: 'BARR_ID',
                label: '用户编号'
            },
            {
                key: 'TYPE',
                label: '护栏类型'
            },
            {
                key: 'MATERIAL',
                label: '护栏材质'
            }
        ]
    }
};
