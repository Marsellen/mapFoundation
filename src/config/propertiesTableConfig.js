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
            title: '道路参考线类型',
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
            title: '道路参考线标识',
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
            dataIndex: 'LANE_STATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_DIVIDER_LANE_STATUS'
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
            title: '车道最高行驶速度'
        },
        {
            dataIndex: 'MAX_SP_TYP',
            title: '车道最高行驶速度数据来源',
            filterBy: 'typeFilter|AD_LANE_MAX_SP_TYP'
        },
        {
            dataIndex: 'MIN_SPEED',
            title: '车道最低行驶速度'
        },
        {
            dataIndex: 'MIN_SP_TYP',
            title: '车道最低行驶速度数据来源',
            filterBy: 'typeFilter|AD_LANE_MIN_SP_TYP'
        },
        {
            dataIndex: 'STATUS',
            title: '车道通行状态',
            filterBy: 'typeFilter|AD_LANE_STATUS'
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
            filterBy: 'typeFilter|AD_TRAFFIC_SIGN_STYLE'
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
            dataIndex: 'MATERIAL',
            title: '材质',
            filterBy: 'typeFilter|AD_RS_BARRIER_MATERIAL'
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
    ]
};

export const SELECT_OPTIONS = [
    {
        group: '逻辑层：几何要素图层',
        type: 'vector',
        class: 'four-layer-out',
        items: [
            'AD_Road',
            'AD_LaneDivider',
            'AD_Lane',
            'AD_LaneAttrPoint',
            'AD_Arrow',
            'AD_StopLocation',
            // 'AD_LaneMark_Plg',
            'AD_Text',
            'AD_TrafficSign',
            'AD_TrafficLight',
            'AD_RS_Barrier'
        ]
    },
    {
        group: '逻辑层：关系图层',
        type: 'rel',
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
        group: '逻辑层：属性图层',
        type: 'attr',
        class: 'three-layer-out',
        items: ['AD_Lane_RS', 'AD_Road_Con_RS', 'AD_Lane_Con_RS']
    },
    {
        group: '几何层',
        type: 'vector',
        class: 'three-layer-out',
        items: [
            // 'AD_LaneDivider_Pln',
            'AD_LaneDivider_Plg',
            'AD_StopLocation_Geo',
            // 'AD_Arrow_Geo',
            'AD_LaneMark_Geo',
            'AD_Pole_Geo'
            // 'AD_TrafficSign_Geo',
            // 'AD_TrafficLight_Geo'
        ]
    }
];

export const OPTION_LAYER_MAP = {
    //矢量要素
    AD_Road: ['AD_Road'],
    AD_LaneDivider: ['AD_LaneDivider'],
    AD_Lane: ['AD_Lane'],
    AD_LaneAttrPoint: ['AD_LaneAttrPoint'],
    AD_Arrow: ['AD_Arrow'],
    AD_StopLocation: ['AD_StopLocation'],
    AD_LaneMark_Plg: ['AD_LaneMark_Plg'],
    AD_Text: ['AD_Text'],
    AD_TrafficSign: ['AD_TrafficSign'],
    AD_TrafficLight: ['AD_TrafficLight'],
    AD_RS_Barrier: ['AD_RS_Barrier'],
    AD_LaneDivider_Pln: ['AD_LaneDivider_Pln'],
    AD_LaneDivider_Plg: ['AD_LaneDivider_Plg'],
    AD_StopLocation_Geo: ['AD_StopLocation_Geo'],
    AD_Arrow_Geo: ['AD_Arrow_Geo'],
    AD_LaneMark_Geo: ['AD_LaneMark_Geo'],
    AD_Pole_Geo: ['AD_Pole_Geo'],
    AD_TrafficSign_Geo: ['AD_TrafficSign_Geo'],
    AD_TrafficLight_Geo: ['AD_TrafficLight_Geo'],
    //关联关系
    AD_Road_Con: ['AD_Road'],
    AD_Lane_Con: ['AD_Lane'],
    AD_StopL_Lane_Rel: ['AD_Lane', 'AD_StopLocation'],
    AD_Plg_Lane_Rel: ['AD_Lane', 'AD_LaneMark_Geo'],
    AD_Sign_Lane_Rel: ['AD_Lane', 'AD_TrafficSign'],
    AD_Light_Lane_Rel: ['AD_Lane', 'AD_TrafficLight'],
    //关联属性
    AD_TS_Content: ['AD_TrafficSign'],
    AD_Lane_RS: ['AD_Lane'],
    AD_Road_Con_RS: ['AD_Road'],
    AD_Lane_Con_RS: ['AD_Lane']
};
