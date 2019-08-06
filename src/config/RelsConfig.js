// 关联关系图层
export const REL_DATA_SET = [
    'AD_Lane_Con',
    'AD_Road_Con',
    'AD_StopL_Lane_Rel',
    'AD_Plg_Lane_Rel',
    'AD_Sign_Lane_Rel',
    'AD_Light_Lane_Rel',
    'AD_Lane',
    'AD_Arrow',
    'AD_Text'
];

// 属性关联关系图层
export const ATTR_REL_DATA_SET = ['AD_Lane', 'AD_Arrow', 'AD_Text'];

// 各个图层解析到IndexDB的字段对照，用于解析关联关系数据为IndexDB关系记录数据
export const REL_DATA_MAP = {
    AD_Lane_Con: [
        {
            objId: 'FROM_LANE', // AD_Lane_Con表中FROM_LANE字段解析为objId
            relObjId: 'TO_LANE', // AD_Lane_Con表中TO_LANE字段解析为relObjId
            objType: 'FROM_LANE', // 记录objType为FROM_LANE
            relObjType: 'TO_LANE' // 记录relObjType为TO_LANE
        }
    ],
    AD_Road_Con: [
        {
            objId: 'FROM_ROAD',
            relObjId: 'TO_ROAD',
            objType: 'FROM_ROAD',
            relObjType: 'TO_ROAD'
        }
    ],
    AD_StopL_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'STOPL_ID',
            objType: 'LANE',
            relObjType: 'STOPL'
        }
    ],
    AD_Plg_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'PLG_ID',
            objType: 'LANE',
            relObjType: 'PLG'
        }
    ],
    AD_Sign_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'SIGN_ID',
            objType: 'LANE',
            relObjType: 'SIGN'
        }
    ],
    AD_Light_Lane_Rel: [
        {
            objId: 'LANE_ID',
            relObjId: 'LIGHT_ID',
            objType: 'LANE',
            relObjType: 'LIGHT'
        }
    ],
    AD_Lane: [
        {
            objId: 'LANE_ID',
            relObjId: 'ROAD_ID',
            objType: 'LANE',
            relObjType: 'ROAD'
        },
        {
            objId: 'LANE_ID',
            relObjId: 'L_LDIV_ID',
            objType: 'LANE',
            relObjType: 'L_LDIV'
        },
        {
            objId: 'LANE_ID',
            relObjId: 'R_LDIV_ID',
            objType: 'LANE',
            relObjType: 'R_LDIV'
        }
    ]
};

// 矢量图层两两关联对应的IndexDB表中关联类型，用于对象构建关联关系
export const OBJ_REL_DATA_MAP = {
    AD_Lane: {
        AD_LaneDivider: {
            objType: 'LANE',
            relObjType: ['L_LDIV', 'R_LDIV'],
            spec: 'AD_Lane'
        },
        AD_Road: {
            objType: 'LANE',
            relObjType: 'ROAD',
            spec: 'AD_Lane'
        },
        AD_Arrow: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow'
        },
        AD_Text: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text'
        },
        AD_StopLocation: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel'
        },
        AD_LaneMark_Plg: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel'
        },
        AD_TrafficSign: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel'
        },
        AD_TrafficLight: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel'
        }
    },
    AD_Arrow: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow',
            reverse: true
        }
    },
    AD_Text: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text',
            reverse: true
        }
    },
    AD_LaneMark_Plg: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel',
            reverse: true
        }
    },
    AD_StopLocation: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficSign: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficLight: {
        AD_Lane: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel',
            reverse: true
        }
    },
    AD_Road: {
        AD_LaneAttrPoint: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint',
            reverse: true
        }
    },
    AD_LaneAttrPoint: {
        AD_Road: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint'
        }
    }
};

// IndexDB对象类型描述映射
export const REL_TYPE_KEY_MAP = {
    DEFAULT: {
        name: '未知关系关联对象'
    },
    L_LDIV: {
        name: '关联左侧车道线'
    },
    R_LDIV: {
        name: '关联右侧车道线'
    },
    ROAD: {
        name: '关联参考线'
    },
    LANE: {
        name: '关联车道中心线'
    },
    FROM_LANE: {
        name: '驶入车道中心线'
    },
    FROM_ROAD: {
        name: '驶入参考线'
    },
    TO_LANE: {
        name: '驶出车道中心线'
    },
    STOPL: {
        name: '关联停止位置'
    },
    PLG: {
        name: '关联面状标识物'
    },
    LIGHT: {
        name: '关联交通信号灯'
    },
    SIGN: {
        name: '关联交通标志牌'
    },
    TO_ROAD: {
        name: '驶出参考线'
    },
    ARROW: {
        name: '关联地面箭头'
    },
    TEXT: {
        name: '关联地面文字'
    }
};

// 各个矢量图层包含关联查询的索引与对象类型的映射
export const SPEC_REL_KEY_SET = [
    { spec: 'AD_Lane', relKey: 'LANE', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Lane', relKey: 'FROM_LANE', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Lane', relKey: 'TO_LANE', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'FROM_ROAD', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'TO_ROAD', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'ROAD', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Arrow', relKey: 'ARROW', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Text', relKey: 'TEXT', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneMark_Plg', relKey: 'PLG', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_StopLocation', relKey: 'STOPL', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_TrafficSign', relKey: 'SIGN', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_TrafficLight', relKey: 'LIGHT', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneAttrPoint', relKey: 'LANEP', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'L_LDIV', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'R_LDIV', relType: 'REL_OBJ_TYPE_KEYS' }
];

// 索引与被关联对象的存储位置映射关系
export const REL_OBJ_KEY_MAP = {
    OBJ_TYPE_KEYS: { id: 'relObjId', type: 'relObjType' },
    REL_OBJ_TYPE_KEYS: { id: 'objId', type: 'objType' }
};

// 矢量图层与关联对象类型对应的IndexDB表中关联类型，用于对象修改关联关系，结构由OBJ_REL_DATA_MAP展开得出
export const OBJ_TYPE_REL_MAP = {
    AD_Lane: {
        L_LDIV: {
            objType: 'LANE',
            relObjType: 'L_LDIV',
            spec: 'AD_Lane'
        },
        R_LDIV: {
            objType: 'LANE',
            relObjType: 'R_LDIV',
            spec: 'AD_Lane'
        },
        ROAD: {
            objType: 'LANE',
            relObjType: 'ROAD',
            spec: 'AD_Lane'
        },
        ARROW: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow'
        },
        TEXT: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text'
        },
        STOPL: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel'
        },
        PLG: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel'
        },
        SIGN: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel'
        },
        LIGHT: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel'
        }
    },
    AD_Arrow: {
        LANE: {
            objType: 'LANE',
            relObjType: 'ARROW',
            spec: 'AD_Arrow',
            reverse: true
        }
    },
    AD_Text: {
        LANE: {
            objType: 'LANE',
            relObjType: 'TEXT',
            spec: 'AD_Text',
            reverse: true
        }
    },
    AD_LaneMark_Plg: {
        LANE: {
            objType: 'LANE',
            relObjType: 'PLG',
            spec: 'AD_Plg_Lane_Rel',
            reverse: true
        }
    },
    AD_StopLocation: {
        LANE: {
            objType: 'LANE',
            relObjType: 'STOPL',
            spec: 'AD_StopL_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficSign: {
        LANE: {
            objType: 'LANE',
            relObjType: 'SIGN',
            spec: 'AD_Sign_Lane_Rel',
            reverse: true
        }
    },
    AD_TrafficLight: {
        LANE: {
            objType: 'LANE',
            relObjType: 'LIGHT',
            spec: 'AD_Light_Lane_Rel',
            reverse: true
        }
    },
    AD_Road: {
        LANEP: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint',
            reverse: true
        }
    },
    AD_LaneAttrPoint: {
        ROAD: {
            objType: 'LANEP',
            relObjType: 'ROAD',
            spec: 'AD_LaneAttrPoint'
        }
    }
};
