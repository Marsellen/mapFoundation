export const COLUMNS_CONFIG = {
    AD_LaneDivider: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'LDIV_ID',
            title: '用户编号',
            width: 93
            // fixed: 'left'
        },
        {
            dataIndex: 'TYPE',
            title: '车道线类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_TYPE',
            width: 107
        },
        {
            dataIndex: 'LANE_TYPE',
            title: '车道类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_LANE_TYPE',
            width: 93
        },
        {
            dataIndex: 'RD_LINE',
            title: '参考线标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_LINE',
            width: 107
        },
        {
            dataIndex: 'SHARE_LINE',
            title: '共用车道线标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_SHARE_LINE',
            width: 135
        },
        {
            dataIndex: 'RD_EDGE',
            title: '道路边界标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_EDGE',
            width: 135
        },
        {
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_DIRECTION',
            width: 121
        },
        {
            dataIndex: 'LANESTATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_LANESTATUS',
            width: 121
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号',
            width: 93
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_FORM',
            width: 93
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Text: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'TEXT_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '文字符号类型',
            filterBy: 'typeFilter|AD_TEXT_TYPE',
            width: 121
        },
        {
            dataIndex: 'VALUE',
            title: '地面文字内容',
            width: 121
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Road: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'ROAD_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '参考线类型',
            filterBy: 'typeFilter|AD_ROAD_TYPE',
            width: 107
        },
        {
            dataIndex: 'RD_STATUS',
            title: '道路通行状态',
            filterBy: 'typeFilter|AD_ROAD_RD_STATUS',
            width: 121
        },
        {
            dataIndex: 'RD_CLASS',
            title: '道路等级',
            filterBy: 'typeFilter|AD_ROAD_RD_CLASS',
            width: 93
        },
        {
            dataIndex: 'CROSSING',
            title: '交叉路口标识',
            filterBy: 'typeFilter|AD_ROAD_CROSSING',
            width: 121
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'typeFilter|AD_ROAD_RD_FORM',
            width: 93
        },
        {
            dataIndex: 'DIRECTION',
            title: '道路通行方向',
            filterBy: 'typeFilter|AD_ROAD_DIRECTION',
            width: 121
        },
        {
            dataIndex: 'LENGTH',
            title: '道路长度',
            width: 93
        },
        {
            dataIndex: 'MAX_SPEED',
            title: '最高行驶速度',
            width: 121
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Lane: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'LANE_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '车道类型',
            filterBy: 'typeFilter|AD_LANE_TYPE',
            width: 93
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号',
            width: 93
        },
        {
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'typeFilter|AD_LANE_DIRECTION',
            width: 121
        },
        {
            dataIndex: 'MAX_SPEED',
            title: '最高行驶速度',
            width: 121
        },
        {
            dataIndex: 'MAX_SP_TYP',
            title: '最高速度来源',
            filterBy: 'typeFilter|AD_LANE_MAX_SP_TYP',
            width: 121
        },
        {
            dataIndex: 'MIN_SPEED',
            title: '最低行驶速度',
            width: 121
        },
        {
            dataIndex: 'MIN_SP_TYP',
            title: '最低速度来源',
            filterBy: 'typeFilter|AD_LANE_MIN_SP_TYP',
            width: 121
        },
        {
            dataIndex: 'STATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_STATUS',
            width: 121
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_StopLocation: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'STOPL_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '类型',
            filterBy: 'typeFilter|AD_STOPLOCATION_TYPE',
            width: 70
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_LaneMark_Plg: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'PLG_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '面要素类型',
            filterBy: 'typeFilter|AD_LANEMARK_PLG_TYPE',
            width: 107
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Arrow: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'ARR_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'ARR_DIRECT',
            title: '箭头方向',
            filterBy: 'typeFilter|AD_ARROW_ARR_DIRECT',
            width: 93
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_LaneAttrPoint: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'LAP_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '属性变化点类型',
            filterBy: 'typeFilter|AD_LANE_ATTRPOINT_TYPE',
            width: 135
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_TrafficSign: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'SIGN_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'SIGN_STYLE',
            title: '标志牌类型',
            filterBy: 'typeFilter|AD_TRAFFICSIGN_SIGN_STYLE',
            width: 107
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_TrafficLight: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'LIGHT_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '交通灯类型',
            filterBy: 'typeFilter|AD_TRAFFIC_LIGHT_TYPE',
            width: 107
        },
        {
            dataIndex: 'LAYOUT',
            title: '信号灯灯头布局',
            filterBy: 'typeFilter|AD_TRAFFIC_LIGHT_LAYOUT',
            width: 135
        },
        {
            dataIndex: 'LAMP_COUNT',
            title: '信号灯灯头数量',
            width: 135
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Map_QC: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'FILE_NAME',
            title: '错误图层名称',
            filterBy: 'typeFilter|AD_MAP_QC_FILE_NAME',
            width: 122
        },
        {
            dataIndex: 'FEAT_ID',
            title: '错误数据ID',
            width: 108
        },
        {
            dataIndex: 'ERROR_TYPE',
            title: '错误类型',
            filterBy: 'typeFilter|AD_MAP_QC_ERROR_TYPE',
            width: 93
        },
        {
            dataIndex: 'ERROR_DESC',
            title: '错误描述',
            width: 93
        },
        {
            dataIndex: 'FIX_STATUS',
            title: '修正状态',
            filterBy: 'typeFilter|AD_MAP_QC_FIX_STATUS',
            width: 93
        },
        {
            dataIndex: 'QC_STATUS',
            title: '检查结果',
            filterBy: 'typeFilter|AD_MAP_QC_QC_STATUS',
            width: 93
        },
        {
            dataIndex: 'FIX_PERSON',
            title: '返工修改人员',
            width: 122
        },
        {
            dataIndex: 'QC_PERSON',
            title: '质检人员',
            width: 93
        }
    ],
    AD_RS_Barrier: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'BARR_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'TYPE',
            title: '护栏类型',
            filterBy: 'typeFilter|AD_RS_BARRIER_TYPE',
            width: 93
        },
        {
            dataIndex: 'MATERIAL',
            title: '护栏材质',
            filterBy: 'typeFilter|AD_RS_BARRIER_MATERIAL',
            width: 93
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ],
    AD_Pole: [
        {
            dataIndex: 'index',
            title: '序号',
            width: 70
        },
        {
            dataIndex: 'POLE_ID',
            title: '用户编号',
            width: 93
        },
        {
            dataIndex: 'RADIUS_UP',
            title: '杆状物立柱顶部半径',
            width: 70
        },
        {
            dataIndex: 'RADIUS_DN',
            title: '杆状物立柱底部半径',
            width: 70
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter',
            width: 93
        }
    ]
};
