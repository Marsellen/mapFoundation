export const DATA_LAYER_MAP = {
    AD_Arrow: {
        label: '地面导向箭头',
        id: 'ARR_ID',
        spec: 'AD_Arrow',
        tools: ['POLYGON', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_LaneAttrPoint: {
        label: '车道属性变化点',
        id: 'LAP_ID',
        spec: 'AD_LaneAttrPoint',
        tools: ['POINT', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete'],
        groupRightTools: ['batchAssign']
    },
    AD_LaneDivider: {
        label: '车道线',
        id: 'LDIV_ID',
        spec: 'AD_LaneDivider',
        tools: ['LINE', 'ADD_REL', 'DEL_REL'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break'
        ],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchAssign',
            'reverseOrderLine'
        ]
    },
    AD_LaneMark_Plg: {
        label: '面状标识物',
        id: 'PLG_ID',
        spec: 'AD_LaneMark_Plg',
        tools: ['POLYGON', 'ADD_GROUND_RECTANGLE', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_Text: {
        label: '地面文字符号',
        id: 'TEXT_ID',
        spec: 'AD_Text',
        tools: ['POLYGON', 'ADD_GROUND_RECTANGLE', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_StopLocation: {
        label: '停止位置',
        id: 'STOPL_ID',
        spec: 'AD_StopLocation',
        tools: ['LINE', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_Lane: {
        label: '车道中心线',
        id: 'LANE_ID',
        spec: 'AD_Lane',
        tools: [
            'LINE',
            'ADD_REL',
            'DEL_REL',
            'DIVIDER_TO_AUTO_CREATE',
            'HALF_AUTO_CREATE'
        ],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break'
        ],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchAssign',
            'reverseOrderLine'
        ]
    },
    AD_TrafficSign: {
        label: '交通标志牌',
        id: 'SIGN_ID',
        spec: 'AD_TrafficSign',
        tools: [
            'POLYGON',
            'ADD_FACADEREC_TANGLE',
            'ADD_OUTSIDE_RECTANGLE',
            'ADD_CIRCLE',
            'ADD_REL',
            'DEL_REL'
        ],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_Road: {
        label: '道路参考线',
        id: 'ROAD_ID',
        spec: 'AD_Road',
        tools: [
            'LINE',
            'ADD_REL',
            'DEL_REL',
            'DIVIDER_TO_AUTO_CREATE',
            'HALF_AUTO_CREATE'
        ],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break'
        ],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchAssign',
            'reverseOrderLine'
        ]
    },
    AD_TrafficLight: {
        label: '交通信号灯',
        id: 'LIGHT_ID',
        spec: 'AD_TrafficLight',
        tools: [
            'POLYGON',
            'ADD_FACADEREC_TANGLE',
            'ADD_OUTSIDE_RECTANGLE',
            'ADD_REL',
            'DEL_REL'
        ],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_Pole: {
        label: '杆状物',
        id: 'POLE_ID',
        spec: 'AD_Pole',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints'],
        groupRightTools: ['batchAssign']
    },
    AD_Map_QC: {
        label: '标记图层',
        id: 'ID',
        spec: 'AD_Map_QC',
        tools: ['POINT'],
        rightTools: ['delete'],
        groupRightTools: ['batchAssign']
    },
    AD_RS_Barrier: {
        label: '隔离带、护栏',
        id: 'BARR_ID',
        spec: 'AD_RS_Barrier',
        tools: ['LINE'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'break'
        ],
        groupRightTools: ['breakGroup', 'merge', 'batchAssign']
    },
    AD_Lane_RS: {
        label: '车道中心线交通限制信息',
        id: 'RS_ID',
        spec: 'AD_Lane_RS'
    },
    AD_Lane_Con_RS: {
        label: '车道中心线的连接关系交通限制',
        id: 'RS_ID',
        spec: 'AD_Lane_Con_RS'
    },
    AD_LaneShape: {
        label: '车道中心线曲率坡度信息',
        spec: 'AD_LaneShape'
    },
    AD_TS_Content: {
        label: '交通标志牌相关属性',
        id: 'CONT_ID',
        spec: 'AD_TS_Content'
    },
    AD_Sub_Lamp: {
        label: '交通信号灯灯头相关属性',
        id: 'LAMP_ID',
        spec: 'AD_Sub_Lamp'
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
export const RESOURCE_LAYER_TASK_SCOPE = '任务范围';
export const RESOURCE_LAYER_BOUNDARY = '周边底图';
