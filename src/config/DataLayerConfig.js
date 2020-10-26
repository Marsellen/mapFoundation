export const DATA_LAYER_MAP = {
    AD_Arrow: {
        label: '地面导向箭头',
        id: 'ARR_ID',
        spec: 'AD_Arrow',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['POLYGON', 'ADD_GROUND_RECTANGLE'],
            manbuild: ['POLYGON', 'ADD_GROUND_RECTANGLE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints'
        ],
        groupRightTools: ['batchAssign'],
        editName: '地面导向\n箭头'
    },
    AD_LaneAttrPoint: {
        label: '车道属性变化点',
        id: 'LAP_ID',
        spec: 'AD_LaneAttrPoint',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: { recognition: ['POINT'], manbuild: ['POINT'] },
        rightTools: ['delete', 'forceDelete', 'movePointFeature'],
        groupRightTools: ['batchAssign'],
        editName: '车道属性\n变化点'
    },
    AD_LaneDivider: {
        label: '车道线',
        id: 'LDIV_ID',
        spec: 'AD_LaneDivider',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'BATCH_TOOL_BOX', 'ATTRIBUTE_BRUSH'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'BATCH_TOOL_BOX', 'ATTRIBUTE_BRUSH']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE', 'CURVED_LINE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break',
            'trim'
        ],
        batchTools: ['LINE_FEATURES_SNAP_TO_STOP_LINE', 'ASSIGN_LINE_NO_IN_BATCH'],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchMerge',
            'batchAssign',
            'reverseOrderLine',
            'breakByLine'
        ],
        editName: '车道线'
    },
    AD_LaneMark_Plg: {
        label: '面状标识物',
        id: 'PLG_ID',
        spec: 'AD_LaneMark_Plg',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['POLYGON', 'ADD_GROUND_RECTANGLE'],
            manbuild: ['POLYGON', 'ADD_GROUND_RECTANGLE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints'
        ],
        groupRightTools: ['batchAssign'],
        editName: '面状标识物'
    },
    AD_StopLocation: {
        label: '停止位置',
        id: 'STOPL_ID',
        spec: 'AD_StopLocation',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['LINE'],
            manbuild: ['LINE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'trim'
        ],
        groupRightTools: ['batchAssign'],
        editName: '停止位置'
    },
    AD_Lane: {
        label: '车道中心线',
        id: 'LANE_ID',
        spec: 'AD_Lane',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'BATCH_TOOL_BOX', 'ATTRIBUTE_BRUSH'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'BATCH_TOOL_BOX', 'ATTRIBUTE_BRUSH']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: [
                'LINE',
                'CURVED_LINE',
                'DIVIDER',
                'DIVIDER_TO_AUTO_CREATE',
                'NEW_STRAIGHT_LINE',
                'NEW_TURN_LINE',
                'NEW_UTURN_LINE'
            ]
        },
        batchTools: ['LINE_FEATURES_SNAP_TO_STOP_LINE', 'ASSIGN_LINE_NO_IN_BATCH'],
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break',
            'trim'
        ],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchMerge',
            'batchAssign',
            'reverseOrderLine',
            'breakByLine'
        ],
        editName: '车道中心线'
    },
    AD_Road: {
        label: '道路参考线',
        id: 'ROAD_ID',
        spec: 'AD_Road',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'BATCH_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'BATCH_TOOL_BOX']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: [
                'LINE',
                'CURVED_LINE',
                'DIVIDER',
                'DIVIDER_TO_AUTO_CREATE',
                'NEW_STRAIGHT_LINE',
                'NEW_TURN_LINE',
                'NEW_UTURN_LINE'
            ]
        },
        batchTools: ['LINE_FEATURES_SNAP_TO_STOP_LINE'],
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'reverseOrderLine',
            'break',
            'trim'
        ],
        groupRightTools: [
            'breakGroup',
            'merge',
            'batchMerge',
            'batchAssign',
            'reverseOrderLine',
            'breakByLine'
        ],
        editName: '道路参考线'
    },
    AD_TrafficLight: {
        label: '交通信号灯',
        id: 'LIGHT_ID',
        spec: 'AD_TrafficLight',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'POSTURE_ADJUST']
        },
        drawTools: {
            recognition: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE'],
            manbuild: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'copyLine',
            'insertPoints',
            'changePoints',
            'deletePoints'
        ],
        groupRightTools: ['batchAssign'],
        editName: '交通信号灯'
    },
    AD_Marker: {
        label: '质检标注图层',
        id: 'ID',
        spec: 'AD_Marker',
        tools: {
            recognition: [],
            manbuild: []
        },
        drawTools: {
            recognition: [],
            manbuild: []
        },
        rightTools: [],
        groupRightTools: [],
        editName: '质检标注图层'
    },
    AD_RS_Barrier: {
        label: '隔离带、护栏',
        id: 'BARR_ID',
        spec: 'AD_RS_Barrier',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE', 'CURVED_LINE']
        },
        rightTools: [
            'delete',
            'forceDelete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'break',
            'trim'
        ],
        groupRightTools: ['breakGroup', 'merge', 'batchAssign', 'breakByLine'],
        editName: '隔离带、\n护栏'
    },
    AD_Lane_RS: {
        label: '车道中心线交通限制信息',
        id: 'RS_ID',
        spec: 'AD_Lane_RS'
    },
    AD_Lane_Con_RS: {
        label: '车道中心线连接关系限制信息',
        id: 'RS_ID',
        spec: 'AD_Lane_Con_RS'
    },
    AD_Road_Con_RS: {
        label: '道路参考线连接关系限制信息',
        id: 'RS_ID',
        spec: 'AD_Road_Con_RS'
    },
    AD_LaneShape: {
        label: '车道中心线曲率坡度信息',
        spec: 'AD_LaneShape'
    },
    AD_TS_Content: {
        label: '交通标志牌子属性',
        id: 'CONT_ID',
        spec: 'AD_TS_Content'
    },
    AD_Sub_Lamp: {
        label: '交通信号灯灯头属性',
        id: 'LAMP_ID',
        spec: 'AD_Sub_Lamp'
    },
    AD_Road_Con: {
        label: '道路参考线连接关系',
        id: 'REL_ID',
        spec: 'AD_Road_Con'
    },
    AD_Lane_Con: {
        label: '车道中心线连接关系',
        id: 'REL_ID',
        spec: 'AD_Lane_Con'
    },
    AD_StopL_Lane_Rel: {
        label: '车道中心线 & 停止位置关联关系',
        id: 'REL_ID',
        spec: 'AD_StopL_Lane_Rel'
    },
    AD_Plg_Lane_Rel: {
        label: '车道中心线 & 面状标识物关联关系',
        id: 'REL_ID',
        spec: 'AD_Plg_Lane_Rel'
    },
    AD_Light_Lane_Rel: {
        label: '车道中心线 & 交通信号灯关联关系',
        id: 'REL_ID',
        spec: 'AD_Light_Lane_Rel'
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VECTOR = '高精地图';
export const RESOURCE_LAYER_TRACK = '轨迹';
export const RESOURCE_LAYER_TASK_SCOPE = '任务范围';
export const RESOURCE_LAYER_BOUNDARY = '周边底图';
export const CONFIDENCE_LAYER = '置信度分区';
export const WRONG_LAYER = '错误区';
export const SUSPECT_LAYER = '怀疑区';

export const TOP_VIEW_DISABLED_LAYERS = ['AD_TrafficLight', 'AD_RS_Barrier'];
export const RESOURCE_LAYER_MULTI_PROJECT = '多工程';
