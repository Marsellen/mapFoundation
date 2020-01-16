export const COLUMNS_CONFIG = {
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
            title: '参考线类型',
            filterBy: 'typeFilter|AD_ROAD_TYPE'
        },
        {
            dataIndex: 'RD_STATUS',
            title: '道路通行状态',
            filterBy: 'typeFilter|AD_ROAD_RD_STATUS'
        },
        {
            dataIndex: 'RD_CLASS',
            title: '道路等级',
            filterBy: 'typeFilter|AD_ROAD_RD_CLASS'
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
            dataIndex: 'MAX_SPEED',
            title: '最高行驶速度'
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
            dataIndex: 'LANE_TYPE',
            title: '车道类型',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_LANE_TYPE'
        },
        {
            dataIndex: 'RD_LINE',
            title: '参考线标识',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_LINE'
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
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_DIRECTION'
        },
        {
            dataIndex: 'LANESTATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_LANESTATUS'
        },
        {
            dataIndex: 'LANE_NO',
            title: '车道编号'
        },
        {
            dataIndex: 'RD_FORM',
            title: '道路形态',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_RD_FORM'
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
        },
        {
            dataIndex: 'DIRECTION',
            title: '车道通行方向',
            filterBy: 'typeFilter|AD_LANE_DIRECTION'
        },
        {
            dataIndex: 'MAX_SPEED',
            title: '最高行驶速度'
        },
        {
            dataIndex: 'MAX_SP_TYP',
            title: '最高速度来源',
            filterBy: 'typeFilter|AD_LANE_MAX_SP_TYP'
        },
        {
            dataIndex: 'MIN_SPEED',
            title: '最低行驶速度'
        },
        {
            dataIndex: 'MIN_SP_TYP',
            title: '最低速度来源',
            filterBy: 'typeFilter|AD_LANE_MIN_SP_TYP'
        },
        {
            dataIndex: 'STATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_STATUS'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
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
            title: '类型',
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
            dataIndex: 'TYPE',
            title: '文字符号类型',
            filterBy: 'typeFilter|AD_TEXT_TYPE'
        },
        {
            dataIndex: 'VALUE',
            title: '地面文字内容'
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
            dataIndex: 'SIGN_STYLE',
            title: '标志牌类型',
            filterBy: 'typeFilter|AD_TRAFFICSIGN_SIGN_STYLE'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_TS_Content: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'CONT_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'SIGN_ID',
            title: '关联标志牌用户编号'
        },
        {
            dataIndex: 'SIGN_NO',
            title: '交通标志牌编号'
        },
        {
            dataIndex: 'SIGN_TYPE',
            title: '交通标志牌类型',
            filterBy: 'typeFilter|AD_TS_CONTENT_SIGN_TYPE'
        },
        {
            dataIndex: 'CONT_TYPE',
            title: '交通标志牌语义类型',
            filterBy: 'typeFilter|AD_TS_CONTENT_CONT_TYPE'
        },
        {
            dataIndex: 'CONT_VALUE',
            title: '交通标志牌语义内容'
        },
        {
            dataIndex: 'TIMEDOM',
            title: '交通标志牌限制时间描述'
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
            dataIndex: 'TYPE',
            title: '交通灯类型',
            filterBy: 'typeFilter|AD_TRAFFIC_LIGHT_TYPE'
        },
        {
            dataIndex: 'LAYOUT',
            title: '信号灯灯头布局',
            filterBy: 'typeFilter|AD_TRAFFIC_LIGHT_LAYOUT'
        },
        {
            dataIndex: 'LAMP_COUNT',
            title: '信号灯灯头数量'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Sub_Lamp: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'LAMP_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'LIGHT_ID',
            title: '关联信号灯用户编号'
        },
        {
            dataIndex: 'LAMP_NO',
            title: '信号灯灯头编号'
        },
        {
            dataIndex: 'LAMP_TYPE',
            title: '信号灯灯头子类型',
            filterBy: 'adSubLampTypeFilter'
        }
    ],
    AD_Pole: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'POLE_ID',
            title: '用户编号'
        },
        {
            dataIndex: 'RADIUS_UP',
            title: '杆状物立柱顶部半径'
        },
        {
            dataIndex: 'RADIUS_DN',
            title: '杆状物立柱底部半径'
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
            title: '护栏类型',
            filterBy: 'typeFilter|AD_RS_BARRIER_TYPE'
        },
        {
            dataIndex: 'MATERIAL',
            title: '护栏材质',
            filterBy: 'typeFilter|AD_RS_BARRIER_MATERIAL'
        },
        {
            dataIndex: 'UPD_STAT',
            title: '更新标识',
            filterBy: 'updStatFilter'
        }
    ],
    AD_Map_QC: [
        {
            dataIndex: 'index',
            title: '序号'
        },
        {
            dataIndex: 'ID',
            title: '用户编号'
        },
        {
            dataIndex: 'FILE_NAME',
            title: '错误图层名称',
            filterBy: 'typeFilter|AD_MAP_QC_FILE_NAME'
        },
        {
            dataIndex: 'FEAT_ID',
            title: '错误数据ID'
        },
        {
            dataIndex: 'ERROR_TYPE',
            title: '错误类型',
            filterBy: 'typeFilter|AD_MAP_QC_ERROR_TYPE'
        },
        {
            dataIndex: 'ERROR_DESC',
            title: '错误描述'
        },
        {
            dataIndex: 'FIX_STATUS',
            title: '修正状态',
            filterBy: 'typeFilter|AD_MAP_QC_FIX_STATUS'
        },
        {
            dataIndex: 'QC_STATUS',
            title: '检查结果',
            filterBy: 'typeFilter|AD_MAP_QC_QC_STATUS'
        },
        {
            dataIndex: 'FIX_PERSON',
            title: '返工修改人员'
        },
        {
            dataIndex: 'QC_PERSON',
            title: '质检人员'
        }
    ],
    AD_Road_Con: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'FROM_ROAD', title: '进入道路用户编号' },
        { dataIndex: 'TO_ROAD', title: '退出道路用户编号' }
    ],
    AD_Lane_Con: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'FROM_LANE', title: '进入道路用户编号' },
        { dataIndex: 'TO_LANE', title: '退出道路用户编号' }
    ],
    AD_StopL_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'STOPL_ID', title: '关联停止位置用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' }
    ],
    AD_Plg_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'PLG_ID', title: '关联面状标识物用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' }
    ],
    AD_Sign_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'SIGN_ID', title: '关联交通标志牌用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' }
    ],
    AD_Light_Lane_Rel: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'REL_ID', title: '用户编号' },
        { dataIndex: 'LIGHT_ID', title: '关联交通信号灯用户编号' },
        { dataIndex: 'LANE_ID', title: '关联车道中心线用户编号' }
    ],
    AD_Road_Con_RS: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'RS_ID', title: '用户编号' },
        { dataIndex: 'REL_ID', title: '连接关系用户编号' },
        { dataIndex: 'RS_TYPE', title: '限制类型' },
        { dataIndex: 'TIMEDOM', title: '限制时间描述' }
    ],
    AD_Lane_Con_RS: [
        { dataIndex: 'index', title: '序号' },
        { dataIndex: 'RS_ID', title: '用户编号' },
        { dataIndex: 'REL_ID', title: '连接关系用户编号' },
        { dataIndex: 'RS_TYPE', title: '限制类型' },
        { dataIndex: 'TIMEDOM', title: '限制时间描述' }
    ]
};

export const SELECT_OPTIONS = [
    {
        group: '几何要素图层',
        class: 'four-layer-out',
        items: [
            'AD_Road',
            'AD_LaneDivider',
            'AD_Lane',
            'AD_LaneAttrPoint',
            'AD_Arrow',
            'AD_StopLocation',
            'AD_LaneMark_Plg',
            'AD_Text',
            'AD_TrafficSign',
            'AD_TrafficLight',
            'AD_Pole',
            'AD_RS_Barrier'
        ]
    },
    {
        group: '关系图层',
        class: 'three-layer-out',
        items: [
            'AD_Road_Con',
            'AD_Lane_Con',
            'AD_StopL_Lane_Rel',
            'AD_Plg_Lane_Rel',
            'AD_Sign_Lane_Rel',
            'AD_Light_Lane_Rel'
        ]
    },
    {
        group: '属性图层',
        class: 'three-layer-out',
        items: [
            'AD_TS_Content',
            'AD_Sub_Lamp',
            'AD_Lane_RS',
            'AD_Road_Con_RS',
            'AD_Lane_Con_RS'
        ]
    },
    {
        group: '其他图层',
        class: 'three-layer-out',
        items: ['AD_Map_QC']
    }
];
