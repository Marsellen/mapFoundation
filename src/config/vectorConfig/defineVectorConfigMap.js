export const DEFINE_VECTOR_CONFIG_MAP = {
    AD_Road: {
        key: 'AD_Road',
        label: '道路参考线',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
        ],
        typeArr: [
            {
                key: 'TYPE',
                name: '参考线类型',
                type: 'AD_ROAD_TYPE',
                domType: 'RadioIconGroup'
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
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
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
                key: 'LANE_STATUS',
                name: '车道通行状态',
                type: 'AD_LANE_DIVIDER_LANE_STATUS',
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
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
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
        isClassify: true,
        type: 'Point',
        commonStyle: {
            showFields: 'TYPE',
            color: 'rgb(255,255,255)',
            opacity: 0.6,
            radius: 0.15,
            size: 80,
            pointStyle: 'dianyaosu'
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'dianyaosu',
            styleFieldSize: 18
        },
        pointIconOptionArr: [
            { key: 'dianyaosu', icon: 'dianyaosu' },
            { key: 'dianfuhao', icon: 'dianfuhao' },
            { key: 'dianfuhao1', icon: 'dianfuhao1' },
            { key: 'dianfuhao2', icon: 'dianfuhao2' },
            { key: 'dianfuhao3', icon: 'dianfuhao3' },
            { key: 'dianfuhao4', icon: 'dianfuhao4' },
            { key: 'dianfuhao5', icon: 'dianfuhao5' },
            { key: 'dianfuhao6', icon: 'dianfuhao6' },
            { key: 'dianfuhao7', icon: 'dianfuhao7' },
            { key: 'dianfuhao8', icon: 'dianfuhao8' }
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
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'ARR_DIRECT',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
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
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
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
    AD_Text: {
        key: 'AD_Text',
        label: '地面文字符号',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'CONT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'CONT_TYPE',
                name: '文本语义类型',
                type: 'AD_TEXT_CONT_TYPE'
            },
            {
                key: 'VEH_LMT',
                name: '车辆限制描述',
                type: 'AD_TEXT_VEH_LMT'
            }
        ]
    },
    AD_TrafficSign: {
        key: 'AD_TrafficSign',
        label: '交通标志牌',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'SIGN_STYLE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'SIGN_STYLE',
                name: '交通标志牌样式',
                type: 'AD_TRAFFIC_SIGN_STYLE',
                domType: 'Select'
            }
        ]
    },
    AD_TrafficLight: {
        key: 'AD_TrafficLight',
        label: '交通信号灯',
        checked: false,
        isClassify: false,
        type: 'Polygon',
        commonStyle: {
            showFields: 'NOKEY',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ]
    },
    AD_RS_Barrier: {
        key: 'AD_RS_Barrier',
        label: '隔离带、护栏',
        checked: false,
        isClassify: true,
        type: 'Line',
        commonStyle: {
            showFields: 'TYPE',
            lineStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
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
    },
    AD_LaneDivider_Plg: {
        key: 'AD_LaneDivider_Plg',
        label: '几何层：车道线面要素',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_StopLocation_Geo: {
        key: 'AD_StopLocation_Geo',
        label: '几何层：停止位置',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_STOPLOCTION_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_LaneMark_Geo: {
        key: 'AD_LaneMark_Geo',
        label: '几何层：路面车道标记',
        checked: false,
        isClassify: true,
        type: 'Polygon',
        commonStyle: {
            showFields: 'FEAT_TYPE',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1
        },
        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixiankuang' },
            { key: 'dashed', icon: 'xuxiankuang' },
            { key: 'dashed1', icon: 'xuxiankuang1' },
            { key: 'dashed2', icon: 'xuxiankuang2' },
            { key: 'dashed3', icon: 'xuxiankuang3' }
        ],
        typeArr: [
            {
                key: 'FEAT_TYPE',
                name: '要素子类型',
                type: 'AD_LANE_MARK_GEO_FEAT_TYPE',
                domType: 'RadioIconGroup'
            }
        ]
    },
    AD_Pole_Geo: {
        key: 'AD_Pole_Geo',
        label: '几何层：杆状物',
        checked: false,
        isClassify: false,
        type: 'Line',
        commonStyle: {
            showFields: 'NOKEY',
            polygonStyle: 'solid',
            color: 'rgb(255,255,255)',
            opacity: 1,
            arrow: false,
            point: false,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },
        fieldStyle: {
            colorFieldSize: 28,
            colorFieldIcon: 'xianyaosu'
        },
        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
        ]
    }
};
