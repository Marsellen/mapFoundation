// 关联关系图层
export const REL_DATA_SET = [
    'AD_Lane_Con',
    'AD_Road_Con',
    'AD_StopL_Lane_Rel',
    'AD_Plg_Lane_Rel',
    'AD_Sign_Lane_Rel',
    'AD_Light_Lane_Rel',
    'AD_Road_Boundary_Rel',
    'AD_Boundary_Rel',
    'AD_Feat_Junc_Rel'
];

// 属性关联关系图层
export const ATTR_REL_DATA_SET = ['AD_Lane', 'AD_Arrow', 'AD_LaneAttrPoint'];

// IndexDB对象类型描述映射
export const REL_TYPE_KEY_MAP = {
    DEFAULT: {
        name: '未知关系关联对象',
        validates: 'Numeric|maxLength|15'
    },
    L_LDIV: {
        name: '关联左侧车道线',
        validates: 'Numeric|maxLength|15'
    },
    R_LDIV: {
        name: '关联右侧车道线',
        validates: 'Numeric|maxLength|15'
    },
    ROAD: {
        name: '关联参考线',
        validates: 'Numeric|maxLength|15'
    },
    LANE: {
        name: '关联车道中心线',
        validates: 'Numeric|maxLength|15'
    },
    FROM_LANE: {
        name: '驶入车道中心线',
        withAttr: true,
        validates: 'Numeric|maxLength|15'
    },
    TO_LANE: {
        name: '驶出车道中心线',
        withAttr: true,
        validates: 'Numeric|maxLength|15'
    },
    FROM_ROAD: {
        name: '驶入参考线',
        withAttr: true,
        validates: 'Numeric|maxLength|15'
    },
    TO_ROAD: {
        name: '驶出参考线',
        withAttr: true,
        validates: 'Numeric|maxLength|15'
    },
    STOPL: {
        name: '关联停止位置',
        validates: 'Numeric|maxLength|15'
    },
    PLG: {
        name: '关联面状标识物',
        validates: 'Numeric|maxLength|15'
    },
    LIGHT: {
        name: '关联交通信号灯',
        validates: 'Numeric|maxLength|15'
    },
    SIGN: {
        name: '关联交通标志牌',
        validates: 'Numeric|maxLength|15'
    },
    ARROW: {
        name: '关联地面箭头',
        validates: 'Numeric|maxLength|15'
    },
    TEXT: {
        name: '关联地面文字',
        validates: 'Numeric|maxLength|15'
    },
    LANEP: {
        name: '关联属性变化点',
        validates: 'Numeric|maxLength|15'
    },
    F_LDIV_ID: {
        name: '关联道路边界',
        validates: 'Numeric|maxLength|15'
    },
    S_LDIV_ID: {
        name: '关联道路边界',
        validates: 'Numeric|maxLength|15'
    },
    LDIV: {
        name: '关联车道线',
        validates: 'Numeric|maxLength|15'
    },
    POLE: {
        name: '关联杆状物',
        validates: 'Numeric|maxLength|15'
    },
    JUNC: {
        name: '关联交叉口',
        validates: 'Numeric|maxLength|15'
    }
};

// 各个矢量图层包含关联查询的索引与对象类型的映射
export const SPEC_REL_KEY_SET = [
    { spec: 'AD_Lane', relKey: 'LANE', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Lane', relKey: 'LANE', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Lane', relKey: 'TO_LANE', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Lane', relKey: 'FROM_LANE', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'TO_ROAD', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'FROM_ROAD', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_Road', relKey: 'ROAD', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Arrow', relKey: 'ARROW', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Text', relKey: 'TEXT', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneMark_Geo', relKey: 'PLG', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_StopLocation', relKey: 'STOPL', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_TrafficSign', relKey: 'SIGN', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_TrafficLight', relKey: 'LIGHT', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'S_LDIV_ID', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'F_LDIV_ID', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneAttrPoint', relKey: 'LANEP', relType: 'OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'L_LDIV', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'R_LDIV', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_LaneDivider', relKey: 'LDIV', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Pole_Geo', relKey: 'POLE', relType: 'REL_OBJ_TYPE_KEYS' },
    { spec: 'AD_Junction', relKey: 'JUNC', relType: 'OBJ_TYPE_KEYS' }
];

// 索引与被关联对象的存储位置映射关系
export const REL_OBJ_KEY_MAP = {
    OBJ_TYPE_KEYS: { id: 'relObjId', type: 'relObjType' },
    REL_OBJ_TYPE_KEYS: { id: 'objId', type: 'objType' }
};

export const REL_SPEC_CONFIG = [
    {
        source: 'AD_Lane',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'L_LDIV_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_LaneDivider',
        objType: 'LANE',
        relObjType: 'L_LDIV'
    },
    {
        source: 'AD_Lane',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'R_LDIV_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_LaneDivider',
        objType: 'LANE',
        relObjType: 'R_LDIV'
    },
    {
        source: 'AD_Lane',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'ROAD_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_Road',
        objType: 'LANE',
        relObjType: 'ROAD'
    },
    {
        source: 'AD_Lane_Con',
        objKeyName: 'FROM_LANE',
        relObjKeyName: 'TO_LANE',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_Lane',
        objType: 'FROM_LANE',
        relObjType: 'TO_LANE'
    },
    {
        source: 'AD_Road_Con',
        objKeyName: 'FROM_ROAD',
        relObjKeyName: 'TO_ROAD',
        objSpec: 'AD_Road',
        relObjSpec: 'AD_Road',
        objType: 'FROM_ROAD',
        relObjType: 'TO_ROAD'
    },
    {
        source: 'AD_StopL_Lane_Rel',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'STOPL_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_StopLocation',
        objType: 'LANE',
        relObjType: 'STOPL'
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_LaneMark_Geo',
        objType: 'JUNC',
        relObjType: 'PLG',
        relObjFeatTypes: [
            { name: 'FEAT_TYPE', value: 9901, label: '人行横道', featType: 1 },
            { name: 'FEAT_TYPE', value: 9902, label: '禁止停车区', featType: 2 },
            { name: 'FEAT_TYPE', value: 4002, label: '减速带', featType: 3 },
            { name: 'FEAT_TYPE', value: 9903, label: '导流区', featType: 6 }
        ]
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_StopLocation',
        objType: 'JUNC',
        relObjType: 'STOPL',
        relObjFeatType: 4
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_Text',
        objType: 'JUNC',
        relObjType: 'TEXT',
        relObjFeatType: 5
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_Arrow',
        objType: 'JUNC',
        relObjType: 'ARROW',
        relObjFeatType: 7
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_LaneDivider',
        objType: 'JUNC',
        relObjType: 'LDIV',
        relObjFeatType: 8
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_Pole_Geo',
        objType: 'JUNC',
        relObjType: 'POLE',
        relObjFeatType: 9
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_TrafficSign',
        objType: 'JUNC',
        relObjType: 'SIGN',
        relObjFeatType: 12
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_TrafficLight',
        objType: 'JUNC',
        relObjType: 'LIGHT',
        relObjFeatType: 14
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_Road',
        objType: 'JUNC',
        relObjType: 'ROAD',
        relObjFeatType: 15
    },
    {
        source: 'AD_Feat_Junc_Rel',
        objKeyName: 'JUNC_ID',
        relObjKeyName: 'FEAT_ID',
        objSpec: 'AD_Junction',
        relObjSpec: 'AD_Lane',
        objType: 'JUNC',
        relObjType: 'LANE',
        relObjFeatType: 16
    },
    {
        source: 'AD_Plg_Lane_Rel',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'PLG_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_LaneMark_Geo',
        objType: 'LANE',
        relObjType: 'PLG'
    },
    {
        source: 'AD_Sign_Lane_Rel',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'SIGN_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_TrafficSign',
        objType: 'LANE',
        relObjType: 'SIGN'
    },
    {
        source: 'AD_Light_Lane_Rel',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'LIGHT_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_TrafficLight',
        objType: 'LANE',
        relObjType: 'LIGHT'
    },
    {
        source: 'AD_LaneAttrPoint',
        objKeyName: 'LAP_ID',
        relObjKeyName: 'ROAD_ID',
        objSpec: 'AD_LaneAttrPoint',
        relObjSpec: 'AD_Road',
        objType: 'LANEP',
        relObjType: 'ROAD'
    },
    {
        source: 'AD_LaneAttrPoint',
        objKeyName: 'LAP_ID',
        relObjKeyName: 'LANE_ID',
        objSpec: 'AD_LaneAttrPoint',
        relObjSpec: 'AD_Lane',
        objType: 'LANEP',
        relObjType: 'LANE'
    },
    {
        source: 'AD_Arrow',
        objKeyName: 'LANE_ID',
        relObjKeyName: 'ARR_ID',
        objSpec: 'AD_Lane',
        relObjSpec: 'AD_Arrow',
        objType: 'LANE',
        relObjType: 'ARROW'
    },
    {
        source: 'AD_Road_Boundary_Rel',
        objKeyName: 'LDIV_ID',
        relObjKeyName: 'ROAD_ID',
        objSpec: 'AD_LaneDivider',
        relObjSpec: 'AD_Road',
        objType: 'LDIV',
        relObjType: 'ROAD'
    },
    {
        source: 'AD_Boundary_Rel',
        objKeyName: 'F_LDIV_ID',
        relObjKeyName: 'S_LDIV_ID',
        objSpec: 'AD_LaneDivider',
        relObjSpec: 'AD_LaneDivider',
        objType: 'F_LDIV_ID',
        relObjType: 'S_LDIV_ID'
    }
];

export const JUNC_REL_SPEC_CONFIG = REL_SPEC_CONFIG.filter(
    item => item.source === 'AD_Feat_Junc_Rel'
);

export const CONNECTION_RELS = ['AD_Lane_Con', 'AD_Road_Con', 'AD_Boundary_Rel'];

export const CONNECT_REL_LAYERS = ['AD_Lane', 'AD_Road'];
