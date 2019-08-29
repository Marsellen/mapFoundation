export const COLUMNS_CONFIG = {
    AD_LaneDivider: [
        {
            dataIndex: 'LDIV_ID',
            title: '用户编号',
            filterBy: 'AD_LANE_DIVIDER_LDIV_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '车道线类型',
            filterBy: 'AD_LANE_DIVIDER_TYPE'
        },
        {
            dataIndex: 'LANE_TYPE',
            title: '车道类型',
            filterBy: 'AD_LANE_DIVIDER_LANE_TYPE'
        },
        {
            dataIndex: 'RD_LINE',
            title: '参考线标识',
            filterBy: 'AD_LANE_DIVIDER_RD_LINE'
        },
        {
            dataIndex: 'SHARE_LINE',
            title: '共用车道线标识',
            filterBy: 'AD_LANE_DIVIDER_SHARE_LINE'
        },
        {
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'AD_LANE_DIVIDER_DIRECTION'
        },
        {
            dataIndex: 'LANESTATUS',
            title: '通行状态',
            filterBy: 'AD_LANE_DIVIDER_LANESTATUS'
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号',
            filterBy: 'AD_LANE_DIVIDER_LANE_NO'
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'AD_LANE_DIVIDER_RD_FORM'
        }
    ],
    AD_Text: [
        {
            dataIndex: 'TEXT_ID',
            title: '用户编号',
            filterBy: 'AD_TEXT_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '文字符号类型',
            filterBy: 'AD_TEXT_TYPE'
        },
        {
            dataIndex: 'VALUE',
            title: '文字符号类型',
            filterBy: 'AD_TEXT_VALUE'
        }
    ],
    AD_Road: [
        {
            dataIndex: 'ROAD_ID',
            title: '用户编号',
            filterBy: 'AD_ROAD_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '参考线类型',
            filterBy: 'AD_ROAD_TYPE'
        },
        {
            dataIndex: 'RD_STATUS',
            title: '通行状态',
            filterBy: 'AD_ROAD_RD_STATUS'
        },
        {
            dataIndex: 'RD_CLASS',
            title: '道路等级',
            filterBy: 'AD_ROAD_RD_CLASS'
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'AD_ROAD_RD_FORM'
        },
        {
            dataIndex: 'DIRECTION',
            title: '道路通行方向',
            filterBy: 'AD_ROAD_DIRECTION'
        },
        {
            dataIndex: 'LENGTH',
            title: '道路长度',
            filterBy: 'AD_ROAD_LENGTH',
        },
        {
            dataIndex: 'MAX_SPEED',
            title: '道路最高行驶速度',
            filterBy: 'AD_ROAD_MAX_SPEED',
        }
    ],
    AD_Lane: [
        {
            dataIndex: 'TYPE',
            title: '车道类型',
            filterBy: 'AD_LANE_TYPE'
        },
        {
            dataIndex: 'LANE_ID',
            title: '用户编号',
            filterBy: 'AD_LANE_LANE_ID'
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号',
            filterBy: 'AD_LANE_LANE_NO'
        },
        {
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'AD_LANE_DIRECTION'
        },
        {
            dataIndex: 'MAX_SPEED',
            title: '最高行驶速度',
            filterBy: 'AD_LANE_MAX_SPEED',
        },
        {
            dataIndex: 'MAX_SP_TYP',
            title: '最高速度来源',
            filterBy: 'AD_LANE_MAX_SP_TYP'
        },
        {
            dataIndex: 'MIN_SPEED',
            title: '最低行驶速度',
            filterBy: 'AD_LANE_MIN_SPEED',
        },
        {
            dataIndex: 'MIN_SP_TYP',
            title: '最低速度来源',
            filterBy: 'AD_LANE_MIN_SP_TYP'
        },
        {
            dataIndex: 'STATUS',
            title: '通行状态',
            filterBy: 'AD_LANE_STATUS'
        }
    ],
    AD_StopLocation: [
        {
            dataIndex: 'STOPL_ID',
            title: '用户编号',
            filterBy: 'AD_STOPLOCATION_STOPL_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '类型',
            filterBy: 'AD_STOPLOCATION_TYPE'
        }
    ],
    AD_LaneMark_Plg: [
        {
            dataIndex: 'PLG_ID',
            title: '用户编号',
            filterBy: 'AD_LANEMARK_PLG_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '面要素类型',
            filterBy: 'AD_LANEMARK_PLG_TYPE'
        }
    ],
    AD_Arrow: [
        {
            dataIndex: 'ARR_ID',
            title: '用户编号',
            filterBy: 'AD_ARROW_ID'
        },
        {
            dataIndex: 'ARR_DIRECT',
            title: '箭头方向',
            filterBy: 'AD_ARROW_ARR_DIRECT'
        }
    ],
    AD_LaneAttrPoint: [
        {
            dataIndex: 'LAP_ID',
            title: '用户编号',
            filterBy: 'AD_LANE_ATTRPOINT_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '属性变化点类型',
            filterBy: 'AD_LANE_ATTRPOINT_TYPE'
        }
    ],
    AD_TrafficSign: [
        {
            dataIndex: 'SIGN_ID',
            title: '用户编号',
            filterBy: 'AD_TRAFFICSIGN_ID'
        },
        {
            dataIndex: 'SIGN_STYLE',
            title: '标志牌类型',
            filterBy: 'AD_TRAFFICSIGN_SIGN_STYLE'
        }
    ],
    AD_TrafficLight: [
        {
            dataIndex: 'LIGHT_ID',
            title: '用户编号',
            filterBy: 'AD_TRAFFIC_LIGHT_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '交通灯类型',
            filterBy: 'AD_TRAFFIC_LIGHT_TYPE'
        },
        {
            dataIndex: 'LAYOUT',
            title: '信号灯灯头布局',
            filterBy: 'AD_TRAFFIC_LIGHT_LAYOUT'
        },
        {
            dataIndex: 'LAMP_COUNT',
            title: '信号灯灯头数量',
            filterBy: 'AD_TRAFFIC_LIGHT_LAMP_COUNT'
        }
    ],
    AD_Map_QC: [
        {
            dataIndex: 'ID',
            title: '用户编号',
            filterBy: 'AD_MAP_QC_ID'
        },
        {
            dataIndex: 'FILE_NAME',
            title: '错误图层名称',
            filterBy: 'AD_MAP_QC_FILE_NAME',
        },
        {
            dataIndex: 'FEAT_ID',
            title: '错误数据ID',
            filterBy: 'AD_MAP_QC_FEAT_ID'
        },
        {
            dataIndex: 'ERROR_TYPE',
            title: '错误类型',
            filterBy: 'AD_MAP_QC_ERROR_TYPE'
        },
        {
            dataIndex: 'ERROR_DESC',
            title: '错误描述',
            filterBy: 'AD_MAP_QC_ERROR_DESC'
        },
        {
            dataIndex: 'FIX_STATUS',
            title: '修正状态',
            filterBy: 'AD_MAP_QC_FIX_STATUS'
        },
        {
            dataIndex: 'QC_STATUS',
            title: '检查结果',
            filterBy: 'AD_MAP_QC_QC_STATUS'
        },
        {
            dataIndex: 'FIX_PERSON',
            title: '返工修改人员',
            filterBy: 'AD_MAP_QC_FIX_PERSON'
        },
        {
            dataIndex: 'QC_PERSON',
            title: '质检人员',
            filterBy: 'AD_MAP_QC_QC_PERSON'
        }
    ],
    AD_RS_Barrier: [
        {
            dataIndex: 'BARR_ID',
            title: '用户编号',
            filterBy: 'AD_RS_BARRIER_BARR_ID'
        },
        {
            dataIndex: 'TYPE',
            title: '护栏类型',
            filterBy: 'AD_RS_BARRIER_TYPE'
        },
        {
            dataIndex: 'MATERIAL',
            title: '护栏材质',
            filterBy: 'AD_RS_BARRIER_MATERIAL'
        }
    ],
    AD_Pole: [
        {
            dataIndex: 'POLE_ID',
            title: '用户编号',
            filterBy: 'AD_POLE_ID'
        },
        {
            dataIndex: 'RADIUS_UP',
            title: '杆状物立柱顶部半径',
            filterBy: 'AD_POLE_RADIUS_UP'
        },
        {
            dataIndex: 'RADIUS_DN',
            title: '杆状物立柱底部半径',
            filterBy: 'AD_POLE_RADIUS_DN'
        }
    ]
};
