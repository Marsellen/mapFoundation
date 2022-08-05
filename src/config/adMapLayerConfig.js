
// 适配 库配置---图层对应的字段 【已有图层 新增字段】
export const LAYER_MAP_FIELD = {
    AD_Lane:
        [{
            // 基础配置
            key: 'TURN_TYPE',
            name: '车道转向方向',
            type: 'AD_LANE_TURN_TYPE',
            domType: 'Select',
            // 
            value: 'TURN_TYPE',
            label: '车道转向方向',
            // 表
            dataIndex: 'TRAVERSAL',
            title: '车道转向方向',
            width: 260,
            ellipsis: true,
            filterBy: 'typeFilter|AD_LANE_TURN_TYPE'
        }]
}

// *************【新增图层】配置 从无到有**********
// 1.适配图层字段【字段配置】，否则保存后无法显示字段
export const DEFAULT_PROPERTIES_LAYER = {
    // 【适配字段】
    AD_Lane_Overlap: {
        OVERLAP_ID: 0,
        LANE_ID: 0,
        PLG_ID: 0
    },
    AD_Lane: {
        TYPE: 1,
        DIRECTION: 1,
        LANE_NO: 0,
        STATUS: 1,
        // TRAVERSAL: 1,
        L_LDIV_ID: 0,
        R_LDIV_ID: 0,
        ROAD_ID: 0,
        TURN_TYPE: 0
    },
}
// 2.显示内容
//#region  点击图层弹出【属性窗体】配置
export const TABLE_DATA_LAYER = {
    AD_LaneDivider: [
        {
            key: 'LDIV_ID',
            name: '用户编号',
            type: 'AD_LANE_DIVIDER_LDIV_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '车道线类型',
            type: 'AD_LANE_DIVIDER_TYPE',
            domType: 'RadioIconGroup',
            link: {
                default: {
                    RD_EDGE: 2
                },
                11: {
                    RD_EDGE: 1
                },
                13: {
                    RD_EDGE: 1
                },
                14: {
                    RD_EDGE: 1
                },
                15: {
                    RD_EDGE: 1
                },
                16: {
                    RD_EDGE: 1
                },
                99: {
                    RD_EDGE: 1
                }
            }
        },
        {
            key: 'TYPE_PLUS',
            name: '车道线类型(附加)',
            type: 'AD_LANE_DIVIDER_TYPE',
            domType: 'CheckBoxIconGroup'
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
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Text: [
        {
            key: 'TEXT_ID',
            name: '用户编号',
            type: 'AD_TEXT_ID',
            domType: 'Text'
        },
        {
            key: 'CONT_TYPE',
            name: '文本语义类型',
            type: 'AD_TEXT_CONT_TYPE',
            domType: 'RadioIconGroup',
            link: {
                0: { SPEED: 0, TIMEDOM: '', VEH_LMT: 0 },
                1: { SPEED: 120, TIMEDOM: '', VEH_LMT: 1 },
                2: { SPEED: 60, TIMEDOM: '', VEH_LMT: 1 },
                3: { SPEED: 0 },
                4: { SPEED: 0 },
                5: { SPEED: 0 },
                6: { SPEED: 0 },
                99: { SPEED: 0, TIMEDOM: '', VEH_LMT: 0 }
            },
            linkDisabled: {
                0: ['SPEED', 'TIMEDOM', 'VEH_LMT'],
                1: ['TIMEDOM'],
                2: ['TIMEDOM'],
                3: ['SPEED'],
                4: ['SPEED'],
                5: ['SPEED'],
                6: ['SPEED'],
                99: ['SPEED', 'TIMEDOM', 'VEH_LMT']
            }
        },
        {
            key: 'SPEED',
            name: '限速值',
            domType: 'InputNumber',
            validates: 'Numeric|range|0|150'
        },
        {
            key: 'TIMEDOM',
            name: '时间限制描述',
            domType: 'AdDateInput',
            validates: 'Char|250'
        },
        {
            key: 'VEH_LMT',
            name: '车辆限制描述',
            type: 'AD_TEXT_VEH_LMT',
            domType: 'Select'
        },
        {
            key: 'TEXT',
            name: '其他文本描述',
            domType: 'Input'
        },
        {
            key: 'LANE_ID',
            name: '关联对应车道中心线ID',
            domType: 'Input'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Road: [
        {
            key: 'ROAD_ID',
            name: '用户编号',
            type: 'AD_ROAD_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '参考线类型',
            type: 'AD_ROAD_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'RD_STATUS',
            name: '道路通行状态',
            type: 'AD_ROAD_RD_STATUS',
            domType: 'Select'
        },
        {
            key: 'CROSSING',
            name: '交叉路口标识',
            type: 'AD_ROAD_CROSSING',
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
        },
        {
            key: 'LENGTH',
            name: '道路长度',
            type: 'AD_ROAD_LENGTH',
            required: true,
            validates: 'Decimal|10|2',
            domType: 'InputNumber'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Lane: [
        {
            key: 'LANE_ID',
            name: '用户编号',
            type: 'AD_LANE_LANE_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '车道类型',
            type: 'AD_LANE_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO',
            required: true,
            domType: 'InputNumber',
            validates: 'Numeric|range|-99|99'
        }
    ].concat(LAYER_MAP_FIELD?.AD_Lane).concat(
        [{
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
            key: 'TRAVERSAL',
            name: '可跨越性',
            type: 'AD_LANE_TRAVERSAL',
            domType: 'Select'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
        ]
    ),

    AD_StopLocation: [
        {
            key: 'STOPL_ID',
            name: '用户编号',
            type: 'AD_STOPLOCATION_STOPL_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '停车线类型',
            type: 'AD_STOPLOCATION_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_LaneMark_Plg: [
        {
            key: 'PLG_ID',
            name: '用户编号',
            type: 'AD_LANEMARK_PLG_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '面状标识物类型',
            type: 'AD_LANEMARK_PLG_TYPE',
            domType: 'RadioIconGroup'
        }
    ],
    AD_Arrow: [
        {
            key: 'ARR_ID',
            name: '用户编号',
            type: 'AD_ARROW_ID',
            domType: 'Text'
        },
        {
            key: 'ARR_DIRECT',
            name: '箭头方向',
            type: 'AD_ARROW_ARR_DIRECT',
            domType: 'CheckBoxIconGroup'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Junction: [
        {
            key: 'JUNC_ID',
            name: '用户编号',
            type: 'AD_JUNCTION_ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_LaneAttrPoint: [
        {
            key: 'LAP_ID',
            name: '用户编号',
            type: 'AD_LANE_ATTRPOINT_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '属性变化点类型',
            type: 'AD_LANE_ATTRPOINT_TYPE',
            domType: 'RadioIconGroup',
            link: {
                default: {
                    NUMBER: 0
                }
            },
            linkDisabled: {
                0: ['NUMBER'],
                1801: ['NUMBER'],
                1802: ['NUMBER'],
                1803: ['NUMBER'],
                1804: ['NUMBER'],
                1805: ['NUMBER'],
                1806: ['NUMBER'],
                1808: ['NUMBER'],
                1809: ['NUMBER'],
                1810: ['NUMBER'],
                1811: ['NUMBER'],
                1821: ['NUMBER'],
                1841: ['NUMBER'],
                1842: ['NUMBER'],
                1843: ['NUMBER'],
                1844: ['NUMBER'],
                1845: ['NUMBER'],
                1846: ['NUMBER'],
                1847: ['NUMBER'],
                1848: ['NUMBER']
            }
        },
        {
            key: 'NUMBER',
            name: '收费站通道数',
            type: 'AD_LANE_ATTRPOINT_NUMBER',
            domType: 'InputNumber'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
        // {
        //     key: 'TYPE',
        //     name: '交通灯类型',
        //     type: 'AD_TRAFFIC_LIGHT_TYPE',
        //     domType: 'RadioIconGroup'
        // },
        // {
        //     key: 'LAYOUT',
        //     name: '信号灯灯头布局',
        //     type: 'AD_TRAFFIC_LIGHT_LAYOUT',
        //     domType: 'Select'
        // },
        // {
        //     key: 'LAMP_COUNT',
        //     name: '信号灯灯头数量',
        //     type: 'AD_TRAFFIC_LIGHT_LAMP_COUNT',
        //     required: true,
        //     validates: 'Numeric|range|0|99',
        //     domType: 'InputNumber'
        // }
    ],
    AD_TrafficSign: [
        {
            key: 'SIGN_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        },
        {
            key: 'OBJ_FUNC',
            name: '存储标牌对象',
            domType: 'AdTrafficSignContent'
        }
    ],
    AD_RS_Barrier: [
        {
            key: 'BARR_ID',
            name: '用户编号',
            type: 'AD_RS_BARRIER_BARR_ID',
            domType: 'Text'
        },
        {
            key: 'TYPE',
            name: '隔离带护栏类型',
            type: 'AD_RS_BARRIER_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'TILT',
            name: '是否倾斜',
            type: 'AD_RS_BARRIER_TILT',
            domType: 'Select'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_LaneDivider_Pln: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'LDIV_ID',
            name: '关联对应的车道线ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_StopLocation_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_STOPLOCTION_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'STOPL_ID',
            name: '关联的逻辑层停止位置',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Arrow_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_ARROW_GEO_FEAT_TYPE',
            domType: 'CheckBoxIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_LaneMark_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_MARK_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_Pole_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ],
    AD_TrafficSign_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_SIGN_GEO_FEAT_TYPE',
            domType: 'SearchIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    AD_TrafficLight_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            domType: 'Text'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE',
            domType: 'RadioIconGroup'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            domType: 'Text'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            domType: 'Text'
        }
    ],
    // 新增图层配置     点击弹出【属性显示】的字段
    AD_Lane_Overlap: [
        {
            key: 'OVERLAP_ID',
            name: '用户编号',
            type: 'AD_LANE_OVERLAP_ID',
            domType: 'Text'
        },
        {
            key: 'UPD_STAT',
            name: '更新标识',
            filterBy: 'updStatFilter',
            domType: 'Text'
        }
    ]
}
//#endregion


// 3.增加标注  【标注文字展示】
//#region  【标注配置】
export const LAYER_TYPE_LAYER = {
    AD_LaneDivider: [
        {
            key: 'LDIV_ID',
            name: '用户编号',
            type: 'AD_LANE_DIVIDER_LDIV_ID'
        },
        {
            key: 'TYPE',
            name: '车道线类型',
            type: 'AD_LANE_DIVIDER_TYPE'
        },
        {
            key: 'TYPE_PLUS',
            name: '车道线类型(附加)',
            type: 'AD_LANE_DIVIDER_TYPE'
        },
        {
            key: 'SHARE_LINE',
            name: '共用车道线标识',
            type: 'AD_LANE_DIVIDER_SHARE_LINE'
        },
        {
            key: 'RD_EDGE',
            name: '道路边界标识',
            type: 'AD_LANE_DIVIDER_RD_EDGE'
        }
    ],
    AD_Text: [
        {
            key: 'TEXT_ID',
            name: '用户编号',
            type: 'AD_TEXT_ID'
        },
        {
            key: 'CONT_TYPE',
            name: '文本语义类型',
            type: 'AD_TEXT_CONT_TYPE'
        },
        {
            key: 'SPEED',
            name: '限速值'
        },
        {
            key: 'TIMEDOM',
            name: '时间限制描述'
        },
        {
            key: 'VEH_LMT',
            name: '车辆限制描述',
            type: 'AD_TEXT_VEH_LMT'
        },
        {
            key: 'TEXT',
            name: '其他文本描述'
        }
    ],
    AD_Road: [
        {
            key: 'ROAD_ID',
            name: '用户编号',
            type: 'AD_ROAD_ID'
        },
        {
            key: 'TYPE',
            name: '参考线类型',
            type: 'AD_ROAD_TYPE'
        },
        {
            key: 'RD_STATUS',
            name: '道路通行状态',
            type: 'AD_ROAD_RD_STATUS'
        },
        {
            key: 'CROSSING',
            name: '交叉路口标识',
            type: 'AD_ROAD_CROSSING'
        },
        {
            key: 'RD_FORM',
            name: '道路形态',
            type: 'AD_ROAD_RD_FORM'
        },
        {
            key: 'DIRECTION',
            name: '道路通行方向',
            type: 'AD_ROAD_DIRECTION'
        },
        {
            key: 'LENGTH',
            name: '道路长度',
            type: 'AD_ROAD_LENGTH'
        }
    ],
    AD_Lane: [
        {
            key: 'RS_VALUE',
            name: '交通限制'
        },
        {
            key: 'SPEED',
            name: '交通限速'
        },
        {
            key: 'LANE_ID',
            name: '用户编号',
            type: 'AD_LANE_LANE_ID'
        },
        {
            key: 'TYPE',
            name: '车道类型',
            type: 'AD_LANE_TYPE'
        },
        {
            key: 'LANE_NO',
            name: '车道编号',
            type: 'AD_LANE_LANE_NO'
        },
        {
            key: 'DIRECTION',
            name: '车道通行方向',
            type: 'AD_LANE_DIRECTION'
        },
        {
            key: 'STATUS',
            name: '车道通行状态',
            type: 'AD_LANE_STATUS'
        },
        {
            key: 'TRAVERSAL',
            name: '可跨越性',
            type: 'AD_LANE_TRAVERSAL'
        },
        {
            key: 'ROAD_ID',
            name: '关联道路参考线ID',
            type: 'AD_LANE_ROAD_ID'
        },
        {
            key: 'L_LDIV_ID',
            name: '关联左侧车道线ID',
            type: 'AD_LANE_L_LDIV_ID'
        },
        {
            key: 'R_LDIV_ID',
            name: '关联右侧车道线ID',
            type: 'AD_LANE_R_LDIV_ID'
        }
    ].concat(LAYER_MAP_FIELD?.AD_Lane),
    AD_StopLocation: [
        {
            key: 'STOPL_ID',
            name: '用户编号',
            type: 'AD_STOPLOCATION_STOPL_ID'
        },
        {
            key: 'TYPE',
            name: '停车线类型',
            type: 'AD_STOPLOCATION_TYPE'
        }
    ],
    AD_LaneMark_Plg: [
        {
            key: 'PLG_ID',
            name: '用户编号',
            type: 'AD_LANEMARK_PLG_ID'
        },
        {
            key: 'TYPE',
            name: '面状标识物类型',
            type: 'AD_LANEMARK_PLG_TYPE'
        }
    ],
    AD_Arrow: [
        {
            key: 'ARR_ID',
            name: '用户编号',
            type: 'AD_ARROW_ID'
        },
        {
            key: 'ARR_DIRECT',
            name: '箭头方向',
            type: 'AD_ARROW_ARR_DIRECT'
        },
        {
            key: 'LANE_ID',
            name: '关联车道中心线ID',
            type: 'AD_ARROW_LANE_ID'
        }
    ],
    AD_Junction: [
        {
            key: 'JUNC_ID',
            name: '用户编号',
            type: 'AD_JUNCTION_ID'
        }
    ],
    AD_TrafficSign: [
        {
            key: 'SIGN_ID',
            name: '用户编号'
        }
    ],
    AD_TrafficLight: [
        {
            key: 'LIGHT_ID',
            name: '用户编号',
            type: 'AD_TRAFFIC_LIGHT_ID'
        }
    ],
    AD_RS_Barrier: [
        {
            key: 'BARR_ID',
            name: '用户编号',
            type: 'AD_RS_BARRIER_BARR_ID'
        },
        {
            key: 'TYPE',
            name: '隔离带护栏类型',
            type: 'AD_RS_BARRIER_TYPE'
        },
        {
            key: 'TILT',
            name: '是否倾斜',
            type: 'AD_RS_BARRIER_TILT'
        }
    ],
    AD_LaneDivider_Pln: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLN_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_DIVIDER_PLN_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_DIVIDER_PLN_CFD_FEAT'
        }
    ],
    AD_LaneDivider_Plg: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_DIVIDER_PLG_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_DIVIDER_PLG_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_DIVIDER_PLG_CFD_FEAT'
        }
    ],
    AD_StopLocation_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_STOPLOCTION_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_STOPLOCTION_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_STOPLOCTION_GEO_CFD_FEAT'
        }
    ],
    AD_Arrow_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_ARROW_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_ARROW_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_ARROW_GEO_CFD_FEAT'
        }
    ],
    AD_LaneMark_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_LANE_MARK_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_LANE_MARK_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_LANE_MARK_GEO_CFD_FEAT'
        }
    ],
    AD_TrafficSign_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_SIGN_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_TRAFFIC_SIGN_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_TRAFFIC_SIGN_GEO_CFD_FEAT'
        }
    ],
    AD_TrafficLight_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号'
        },
        {
            key: 'FEAT_TYPE',
            name: '要素子类型',
            type: 'AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_TRAFFIC_LIGHT_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_TRAFFIC_LIGHT_GEO_CFD_FEAT'
        }
    ],
    AD_Pole_Geo: [
        {
            key: 'OBJ_ID',
            name: '用户编号',
            type: 'AD_POLE_GEO_OBJ_ID'
        },
        {
            key: 'CFD_GEO',
            name: '几何形状置信度',
            type: 'AD_POLE_GEO_CFD_GEO'
        },
        {
            key: 'CFD_FEAT',
            name: '要素类型置信度',
            type: 'AD_POLE_GEO_CFD_FEAT'
        }
    ],
    AD_LaneAttrPoint: [
        {
            key: 'LAP_ID',
            name: '用户编号',
            type: 'AD_LANE_ATTRPOINT_ID'
        },
        {
            key: 'TYPE',
            name: '属性变化点类型',
            type: 'AD_LANE_ATTRPOINT_TYPE'
        },
        {
            key: 'ROAD_ID',
            name: '关联道路参考线ID',
            type: 'AD_LANE_ATTRPOINT_ROAD_ID'
        },
        {
            key: 'LANE_ID',
            name: '关联车道中心线ID',
            type: 'AD_LANE_ATTRPOINT_LANE_ID'
        },
        {
            key: 'NUMBER',
            name: '收费站通道数',
            type: 'AD_LANE_ATTRPOINT_NUMBER'
        }
    ],
    AD_Lane_Overlap: [
        {
            key: 'OVERLAP_ID',
            name: '用户编号',
            type: 'AD_LANE_OVERLAP_ID'
        }
    ]
}
//#endregion

// 4.新增图层对应的工具【工具栏】
export const DATA_LAYER_LAYER = {
    AD_Lane_Overlap: {
        label: '中心线压盖',
        id: 'OVERLAP_ID',
        spec: 'AD_Lane_Overlap',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'ATTRIBUTE_BRUSH']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE',
                'CURVED_LINE']
        },
        rightTools: ['delete', 'force_delete', 'change_points', 'group_move'],
        groupRightTools: ['delete'],
        editName: '中心线压盖'
    }
}
// 5.图层样式-- 初始化图层样式  【图层样式】
export const DEFAULT_STYLE = {
    // 新增图层配置
    AD_Lane_Overlap: {
        type: 'Line',
        showFields: ['NOKEY'],
        order: 1,
        showStyles: ['vectorStyle'],
        vectorStyle: {
            NOKEY: [
                {
                    style: { color: 'rgb(255,110,100,1)', linewidth: 1 }
                }
            ]
        },
        level: 15,
        tocLevel: true
    }
}

//#region  6.表格展示字段【属性列表】
export const COLUMNS_CONFIG_LAYER = {
    AD_Road: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'ROAD_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '道路参考线类型',
            filterBy: 'typeFilter|AD_ROAD_TYPE'
        },
        {
            dataIndex: 'RD_STATUS',
            title: '道路通行状态',
            filterBy: 'typeFilter|AD_ROAD_RD_STATUS'
        },
        {
            dataIndex: 'CROSSING',
            title: '交叉路口标识',
            filterBy: 'typeFilter|AD_ROAD_CROSSING'
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'typeFilter|AD_ROAD_RD_FORM'
        },
        {
            dataIndex: 'DIRECTION',
            title: '道路通行方向',
            filterBy: 'typeFilter|AD_ROAD_DIRECTION'
        },
        {
            dataIndex: 'LENGTH',
            title: '道路长度'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_LaneDivider: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'LDIV_ID',
            title: '用户编号'
            // fixed: 'left'
        },
        {
            dataIndex: 'TYPE',
            title: '车道线类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_TYPE'
        },
        {
            dataIndex: 'TYPE_PLUS',
            title: '车道线类型(附加)',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_TYPE'
        },
        {
            dataIndex: 'SHARE_LINE',
            title: '共用车道线标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_SHARE_LINE'
        },
        {
            dataIndex: 'RD_EDGE',
            title: '道路边界标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_EDGE'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Lane: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'LANE_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '车道类型',
            filterBy: 'typeFilter|AD_LANE_TYPE'
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号'
        }].concat(LAYER_MAP_FIELD?.AD_Lane).concat([{
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'typeFilter|AD_LANE_DIRECTION'
        },
        {
            dataIndex: 'TRAVERSAL',
            title: '可跨越性',
            width: 260,
            ellipsis: true,
            filterBy: 'typeFilter|AD_LANE_TRAVERSAL'
        },
        {
            dataIndex: 'ROAD_ID',
            title: '关联道路参考线ID'
        },
        {
            dataIndex: 'L_LDIV_ID',
            title: '关联左侧车道线ID'
        },
        {
            dataIndex: 'R_LDIV_ID',
            title: '关联右侧车道线ID'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }]),
    AD_Lane_RS: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'RS_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联中心线用户编号'
        },
        {
            dataIndex: 'RS_TYPE',
            title: '限制类型',
            filterBy: 'typeFilter|AD_LANE_RS_TYPE'
        },
        {
            dataIndex: 'RS_VALUE',
            title: '限制取值',
            filterBy: 'adLaneRsValueFilter'
        },
        {
            dataIndex: 'TIMEDOM',
            title: '限制时间描述'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Lane_Speed: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'SPEED_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联车道中心线用户编号'
        },
        {
            dataIndex: 'SPD_TYPE',
            title: '车道限速类型',
            filterBy: 'typeFilter|AD_LANE_SPD_TYPE'
        },
        {
            dataIndex: 'SPEED',
            title: '车道限速值',
            filterBy: 'adLaneRsValueFilter'
        },
        {
            dataIndex: 'SPD_SOURCE',
            title: '车道限速来源',
            filterBy: 'typeFilter|AD_LANE_SPD_TYPE'
        },
        {
            dataIndex: 'OFFSET',
            title: '车道限速有效区间',
            filterBy: 'adLaneRsValueFilter'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_LaneAttrPoint: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'LAP_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '属性变化点类型',
            filterBy: 'typeFilter|AD_LANE_ATTRPOINT_TYPE'
        },
        {
            dataIndex: 'ROAD_ID',
            title: '关联道路参考线ID'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联车道中心线ID'
        },
        {
            dataIndex: 'NUMBER',
            title: '收费站通道数'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Arrow: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'ARR_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'ARR_DIRECT',
            title: '箭头方向',
            filterBy: 'typeFilter|AD_ARROW_ARR_DIRECT'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联车道中心线用户编号'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Junction: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'JUNC_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],

    AD_StopLocation: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'STOPL_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '停车线类型',
            filterBy: 'typeFilter|AD_STOPLOCATION_TYPE'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_LaneMark_Plg: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'PLG_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '面要素类型',
            filterBy: 'typeFilter|AD_LANEMARK_PLG_TYPE'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Text: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'TEXT_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'CONT_TYPE',
            title: '文本语义类型',
            filterBy: 'typeFilter|AD_TEXT_CONT_TYPE'
        },
        {
            dataIndex: 'SPEED',
            title: '限速值'
        },
        {
            dataIndex: 'TIMEDOM',
            title: '时间限制描述'
        },
        {
            dataIndex: 'VEH_LMT',
            title: '车辆限制描述',
            filterBy: 'typeFilter|AD_TEXT_VEH_LMT'
        },
        {
            dataIndex: 'TEXT',
            title: '其他文本描述'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联对应车道中心线ID'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_TrafficSign: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'SIGN_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'OBJ_FUNC',
            title: '存储标牌对象',
            filterBy: 'signContentFilter'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_TrafficLight: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'LIGHT_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_RS_Barrier: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'BARR_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'TYPE',
            title: '类型',
            filterBy: 'typeFilter|AD_RS_BARRIER_TYPE'
        },
        {
            dataIndex: 'TILT',
            title: '是否倾斜',
            filterBy: 'typeFilter|AD_RS_BARRIER_TILT'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Road_Con: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'FROM_ROAD', title: '进入道路用户编号' },
        { dataIndex: 'TO_ROAD', title: '退出道路用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Lane_Con: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'FROM_LANE', title: '进入道路用户编号' },
        { dataIndex: 'TO_LANE', title: '退出道路用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_StopL_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'STOPL_ID', title: '关联停止位置用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Feat_Junc_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'JUNC_ID', title: '交叉口用户编号' },
        { dataIndex: 'FEAT_ID', title: '关联路口的要素用户编号' },
        { dataIndex: 'FEAT_TYPE', title: '关联路口的要素类型' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Plg_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'PLG_ID', title: '关联面状标识物用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Sign_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'SIGN_ID', title: '关联交通标志牌用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Light_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'LIGHT_ID', title: '关联交通信号灯用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_RS_Barrier_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'BARR_ID', title: '关联隔离带护栏用户编号' },
        { dataIndex: 'LDIV_ID', title: '关联车道线用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Road_Con_RS: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'RS_ID', title: '用户编号' },
        { dataIndex: 'REL_ID', title: '连接关系用户编号' },
        { dataIndex: 'RS_TYPE', title: '限制类型' },
        { dataIndex: 'TIMEDOM', title: '限制时间描述' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Lane_Con_RS: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'RS_ID', title: '用户编号' },
        { dataIndex: 'REL_ID', title: '连接关系用户编号' },
        { dataIndex: 'RS_TYPE', title: '限制类型' },
        { dataIndex: 'TIMEDOM', title: '限制时间描述' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Road_Boundary_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'ROAD_ID', title: '关联道路参考线用户编号' },
        { dataIndex: 'LDIV_ID', title: '关联道路边界用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Boundary_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'F_LDIV_ID', title: '关联道路边界用户编号' },
        { dataIndex: 'S_LDIV_ID', title: '关联道路边界用户编号' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_LaneDivider_Pln: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_PLN_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_LaneDivider_Plg: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_PLG_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'LDIV_ID', title: '关联对应的车道线ID' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_StopLocation_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_STOPLOCTION_GEO_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'STOPL_ID', title: '关联的逻辑层停止位置' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Arrow_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_ARROW_GEO_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_LaneMark_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_LANE_MARK_GEO_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Pole_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_TrafficSign_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_TRAFFIC_SIGN_GEO_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_TrafficLight_Geo: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'OBJ_ID', title: '用户编号' },
        {
            dataIndex: 'FEAT_TYPE',
            title: '要素子类型',
            filterBy: 'typeFilter|AD_TRAFFIC_LIGHT_GEO_FEAT_TYPE'
        },
        { dataIndex: 'CFD_GEO', title: '几何形状置信度' },
        { dataIndex: 'CFD_FEAT', title: '要素类型置信度' },
        { dataIndex: 'UPD_STAT', title: '更新标识', filterBy: 'updStatFilter' }
    ],
    AD_Lane_Overlap: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'OVERLAP_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'LANE_ID',
            title: '关联车道中心线用户编号'
        },
        {
            dataIndex: 'PLG_ID',
            title: '关联路面车道标记几何形状用户编号'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ]
}
//#endregion


// 7.符号配置-定点检修模式 [配置]
export const CHECK_VECTOR_CONFIG_LAYER = {
    AD_Lane_Overlap: {
        key: 'AD_Lane_Overlap',
        label: '中心线压盖',
        checked: false,
        isClassify: false,
        type: 'Line',
        commonStyle: {
            showFields: 'NOKEY',
            lineStyle: 'solid',
            color: 'rgb(255,110,100)',
            opacity: 1,
            arrow: true,
            point: true,
            pointEnabledStatus: true,
            arrowEnabledStatus: true,
            pointSize: 0.1
        },

        fieldStyle: {
            colorFieldSize: 26,
            colorFieldIcon: 'mianyaosu'
        },

        styleOptionArr: [
            { key: 'solid', icon: 'zhixian' },
            { key: 'dashed', icon: 'xuxian' },
            { key: 'dashed1', icon: 'xuxian1' },
            { key: 'dashed2', icon: 'xuxian2' },
            { key: 'dashed3', icon: 'xuxian3' }
        ]
    }
}

//8.更新图层标识
export const UPD_STAT_VECTOR_CONFIG_LAYER = {
    AD_Lane_Overlap: {
        type: 'Line',
        iconFields: ['UPD_STAT'],
        showStyles: ['iconStyle'],
        key: 'AD_Lane_Overlap',
        order: 1,
        iconStyle: {}
    }
}

// 9.人工识别设置 【编辑图层列表】配置【人工识别】
export const MS_EDIT_LAYER_LAYER = {
    LOGIC: [
        'AD_Lane_Overlap'
    ]
}
// 10.人工识别设置【编辑图层列表】配置【人工构建】

export const MB_EDIT_LAYER_MAP_LAYER = {
    LOGIC: [
        'AD_Lane_Overlap'
    ]
}
// 11.图层控制修改
export const SELECT_OPTIONS_LAYER = {
    items: [
        'AD_Lane_Overlap'
    ]
}
// 12. 检查当前编辑图层和要操作条目是否匹配
export const OPTION_LAYER = {
    AD_Lane_Overlap: ['AD_Lane_Overlap']
}
// 13.验证是否包含，如果不包含此图层，不会渲染
export const VECTOR_FILES_LAYER =
    ['AD_Lane_Overlap.geojson']

// 14.-----------关联关系配置------
export const REL_FILES_LAYER =
    ['AD_Lane_Overlap.geojson']
// 关联关系主键配置
export const SPEC_REL_KEY_SET_LAYER = [
    { spec: 'AD_Lane_Overlap', relKey: 'LANE_OVERLAP', relType: 'REL_OBJ_TYPE_KEYS' }
]
export const LAYER_NAME_MAP_LAYER = {
    LANE_OVERLAP: { layerName: 'AD_Lane_Overlap', key: 'OVERLAP_ID' }
}
// 关联关系配置
export const REL_SPEC_CONFIG_LAYER = [
    //  中心线压盖-车道线
    {
        source: 'AD_Lane_Overlap',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'OVERLAP_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_Lane_Overlap',
        objType: 'LANE',
        relObjType: 'LANE_OVERLAP'
    },
    // 中心线压盖-道路车道标记
    {
        source: 'AD_Lane_Overlap',
        objKeyName: 'PLG_ID',
        relObjKeyName: 'OVERLAP_ID',
        objSpec: 'AD_LaneMark_Geo',
        relObjSpec: 'AD_Lane_Overlap',
        objType: 'PLG',
        relObjType: 'LANE_OVERLAP'
    }
]

// 属性关联关系图层  关联配置  配置是否对图层做关联操作
export const ATTR_REL_DATA_SET_LAYER = ['AD_Lane_Overlap'];

//  判断是否一对多
export const SPEC_LAYER = [
    'AD_Arrow', 'AD_Pole_Geo', 'AD_LaneDivider_Plg', 'AD_Text', 'AD_StopLocation_Geo', 'AD_StopLocation', 'AD_Lane_Overlap'
]

// 关联关系渲染 做检查 
export const CONFIGURABLE_LAYER = [
    'AD_Lane_Overlap'
];
// *****************END 新增图层******************
