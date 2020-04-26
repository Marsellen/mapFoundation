export const LAYER_VECTOR_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        showFields: 'TYPE',
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:首尾带圆点的实线
            // 箭头:尾部箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '参考线类型',
                type: 'AD_ROAD_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_CLASS',
                name: '道路等级',
                type: 'AD_ROAD_RD_CLASS',
                domType: 'Select'
            },
            {
                key: 'CROSSING',
                name: '交叉路口标识',
                type: 'AD_ROAD_CROSSING',
                domType: 'Select'
            },
            {
                key: 'RD_STATUS',
                name: '道路通行状态',
                type: 'AD_ROAD_RD_STATUS',
                domType: 'Select'
            },
            {
                key: 'RD_FORM',
                name: '道路形态',
                type: 'AD_ROAD_RD_FORM',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: '道路通行方向',
                type: 'AD_ROAD_DIRECTION',
                domType: 'Select'
            }
        ]
    },
    AD_LaneDivider: {
        key: 'AD_LaneDivider',
        label: '车道线',
        checked: false,
        showFields: 'TYPE',
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:首尾带圆点的实线
            // 箭头:尾部箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '车道线类型',
                type: 'AD_LANE_DIVIDER_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_LINE',
                name: '道路参考线标识',
                type: 'AD_LANE_DIVIDER_RD_LINE',
                domType: 'Select'
            },
            {
                key: 'SHARE_LINE',
                name: '共用车道线标识',
                type: 'AD_LANE_DIVIDER_SHARE_LINE',
                domType: 'Select'
            },
            {
                key: 'RD_EDGE',
                name: '道路边界标识',
                type: 'AD_LANE_DIVIDER_RD_EDGE',
                domType: 'Select'
            },
            {
                key: 'DIRECTION',
                name: '车道通行方向',
                type: 'AD_LANE_DIVIDER_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'LANESTATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANESTATUS',
                domType: 'Select'
            },
            {
                key: 'LANE_TYPE',
                name: '车道类型',
                type: 'AD_LANE_DIVIDER_LANE_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'RD_FORM',
                name: '道路形态',
                type: 'AD_LANE_DIVIDER_RD_FORM',
                domType: 'Select'
            }
        ]
    },
    AD_Lane: {
        key: 'AD_Lane',
        label: '车道中心线',
        checked: false,
        showFields: 'TYPE',
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:首尾带圆点的实线
            // 箭头:尾部箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '车道类型',
                type: 'AD_LANE_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'DIRECTION',
                name: '车道通行方向',
                type: 'AD_LANE_DIRECTION',
                domType: 'Select'
            },
            {
                key: 'STATUS',
                name: '车道通行状态',
                type: 'AD_LANE_STATUS',
                domType: 'Select'
            },
            {
                key: 'MAX_SP_TYP',
                name: '最高速度来源',
                type: 'AD_LANE_MAX_SP_TYP',
                domType: 'Select'
            },
            {
                key: 'MIN_SP_TYP',
                name: '最低速度来源',
                type: 'AD_LANE_MIN_SP_TYP',
                domType: 'Select'
            }
        ]
    },
    AD_LaneAttrPoint: {
        key: 'AD_LaneAttrPoint',
        label: '车道属性变化点',
        checked: false,
        showFields: 'TYPE',
        type: 'Point',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 },
            // 样式:定位点
            radius: 0.03
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'dianyaosu',
            styleFieldSize: 18
        },
        styleOptionArr: [
            { key: 0, icon: 'dianyaosu' },
            { key: 1, icon: 'dianfuhao' },
            { key: 2, icon: 'dianfuhao1' },
            { key: 3, icon: 'dianfuhao2' },
            { key: 4, icon: 'dianfuhao3' },
            { key: 5, icon: 'dianfuhao4' },
            { key: 6, icon: 'dianfuhao5' },
            { key: 7, icon: 'dianfuhao6' },
            { key: 8, icon: 'dianfuhao7' },
            { key: 9, icon: 'dianfuhao8' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '属性变化点类型',
                type: 'AD_LANE_ATTRPOINT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Arrow: {
        key: 'AD_Arrow',
        label: '地面导向箭头',
        checked: false,
        showFields: 'ARR_DIRECT',
        type: 'Polygon',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线边线
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'zhixiankuang' },
            { key: 1, icon: 'xuxiankuang' }
        ],
        typeArr: [
            {
                key: 'ARR_DIRECT',
                name: '箭头方向',
                type: 'AD_ARROW_ARR_DIRECT',
                domType: 'CheckBoxIconGroup'
            }
        ]
    },
    AD_StopLocation: {
        key: 'AD_StopLocation',
        label: '停止位置',
        checked: false,
        showFields: 'TYPE',
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线
            // 箭头:无箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '停车线类型',
                type: 'AD_STOPLOCATION_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_LaneMark_Plg: {
        key: 'AD_LaneMark_Plg',
        label: '面状标识物',
        checked: false,
        showFields: 'TYPE',
        type: 'Polygon',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线边线
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'zhixiankuang' },
            { key: 1, icon: 'xuxiankuang' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '面状标识物类型',
                type: 'AD_LANEMARK_PLG_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Text: {
        key: 'AD_Text',
        label: '地面文字符号',
        checked: false,
        showFields: 'TYPE',
        type: 'Polygon',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线边线
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'zhixiankuang' },
            { key: 1, icon: 'xuxiankuang' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '文字符号类型',
                type: 'AD_TEXT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_TrafficSign: {
        key: 'AD_TrafficSign',
        label: '交通标志牌',
        checked: false,
        showFields: 'SIGN_STYLE',
        type: 'Polygon',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线边线
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'zhixiankuang' },
            { key: 1, icon: 'xuxiankuang' }
        ],
        typeArr: [
            {
                key: 'SIGN_STYLE',
                name: '交通标志牌样式',
                type: 'AD_TRAFFICSIGN_SIGN_STYLE',
                domType: 'Select'
            }
        ]
    },
    AD_TrafficLight: {
        key: 'AD_TrafficLight',
        label: '交通信号灯',
        checked: false,
        showFields: 'TYPE',
        type: 'Polygon',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线边线
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'zhixiankuang' },
            { key: 1, icon: 'xuxiankuang' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '交通灯类型',
                type: 'AD_TRAFFIC_LIGHT_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'LAYOUT',
                name: '信号灯灯头布局',
                type: 'AD_TRAFFIC_LIGHT_LAYOUT',
                domType: 'Select'
            }
        ]
    },
    AD_Pole: {
        key: 'AD_Pole',
        label: '杆状物',
        checked: false,
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:实线
            // 箭头:无箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ]
    },
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        showFields: 'TYPE',
        type: 'Line',
        defaultStyle: {
            color: { r: 255, g: 255, b: 255, a: 1 }
            // 样式:首尾带圆点的实线
            // 箭头:无箭头
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 0, icon: 'dianzhixian' },
            { key: 1, icon: 'dianxuxian' },
            { key: 2, icon: 'zhixian' },
            { key: 3, icon: 'xuxian' }
        ],
        arrowOptionArr: [
            { key: 0, icon: 'jiantou' },
            { key: 1, icon: 'wujiantou' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '护栏类型',
                type: 'AD_RS_BARRIER_TYPE',
                domType: 'RadioIconGroup'
            },
            {
                key: 'MATERIAL',
                name: '护栏材质',
                type: 'AD_RS_BARRIER_MATERIAL',
                domType: 'Select'
            }
        ]
    }
};
