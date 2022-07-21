// 新增图层配置
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
            recognition: ['ADD_TEMPLATE_ARROW', 'POLYGON', 'ADD_GROUND_RECTANGLE'],
            manbuild: ['ADD_TEMPLATE_ARROW', 'POLYGON', 'ADD_GROUND_RECTANGLE']
        },
        rightTools: ['delete', 'force_delete', 'copy_line', 'change_points', 'group_move'],
        groupRightTools: ['batch_assign', 'group_move', 'delete'],
        editName: '地面导向\n箭头'
    },
    AD_Junction: {
        label: '交叉口',
        id: 'JUNC_ID',
        spec: 'AD_Junction',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['POLYGON'],
            manbuild: ['POLYGON']
        },
        rightTools: ['delete', 'force_delete', 'change_points'],
        groupRightTools: ['delete'],
        editName: '交叉口'
    },
    // 新增图层配置
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
        rightTools: ['delete', 'force_delete', 'change_points','group_move'],
        groupRightTools: ['delete'],
        editName: '中心线压盖'
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
        rightTools: ['delete', 'force_delete', 'move_point_feature'],
        groupRightTools: ['batch_assign', 'delete'],
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
            'buffer_render',
            'delete',
            'force_delete',
            'batch_build',
            'copy_line',
            'change_points',
            'reverse_order_line',
            'break_line',
            'trim',
            'group_move'
        ],
        batchTools: ['LINE_FEATURES_SNAP_TO_STOP_LINE'],
        groupRightTools: [
            'buffer_render',
            'batch_build',
            'break_line_by_point',
            'merge_line',
            'batch_merge_line',
            'batch_assign',
            'reverse_order_line',
            'break_line_by_line',
            'group_move',
            'delete',
            'change_points'
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
        rightTools: ['delete', 'force_delete', 'copy_line', 'change_points'],
        groupRightTools: ['batch_assign', 'delete'],
        editName: '面状标识物'
    },
    AD_Text: {
        label: '地面文字符号',
        id: 'TEXT_ID',
        spec: 'AD_Text',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['ADD_GROUND_RECTANGLE', 'POLYGON'],
            manbuild: ['ADD_GROUND_RECTANGLE', 'POLYGON']
        },
        rightTools: [
            'buffer_render',
            'delete',
            'force_delete',
            'change_points',
            'copy_line',
            'group_move'
        ],
        groupRightTools: ['buffer_render', 'batch_assign', 'group_move', 'delete'],
        editName: '地面文字\n符号'
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
            'buffer_render',
            'delete',
            'force_delete',
            'change_points',
            'trim',
            'group_move',
            'copy_line'
        ],
        groupRightTools: ['buffer_render', 'batch_assign', 'group_move', 'delete'],
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
            'buffer_render',
            'delete',
            'force_delete',
            'copy_line',
            'change_points',
            'reverse_order_line',
            'break_line',
            'trim',
            'group_move'
        ],
        groupRightTools: [
            'buffer_render',
            'break_line_by_point',
            'merge_line',
            'batch_merge_line',
            'batch_assign',
            'reverse_order_line',
            'break_line_by_line',
            'group_move',
            'delete',
            'change_points'
        ],
        editName: '车道中心线'
    },
    AD_TrafficSign: {
        label: '交通标志牌',
        id: 'SIGN_ID',
        spec: 'AD_TrafficSign',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL', 'POSTURE_ADJUST']
        },
        drawTools: {
            recognition: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE'],
            manbuild: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE']
        },
        rightTools: ['delete', 'force_delete', 'change_points', 'copy_line', 'group_move'],
        groupRightTools: ['batch_assign', 'group_move', 'delete'],
        editName: '交通标志牌'
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
            'buffer_render',
            'delete',
            'force_delete',
            'copy_line',
            'change_points',
            'reverse_order_line',
            'break_line',
            'trim',
            'group_move'
        ],
        groupRightTools: [
            'buffer_render',
            'break_line_by_point',
            'merge_line',
            'batch_merge_line',
            'batch_assign',
            'reverse_order_line',
            'break_line_by_line',
            'group_move',
            'delete',
            'change_points'
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
            recognition: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE'],
            manbuild: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE']
        },
        rightTools: ['delete', 'force_delete', 'copy_line', 'change_points', 'group_move'],
        groupRightTools: ['batch_assign', 'group_move', 'delete'],
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
    AD_Information: {
        label: '资料问题图层',
        id: 'ID',
        spec: 'AD_Information',
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
        editName: '资料问题图层'
    },
    AD_RS_Barrier: {
        label: '隔离带、护栏',
        id: 'BARR_ID',
        spec: 'AD_RS_Barrier',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE', 'CURVED_LINE']
        },
        rightTools: [
            'buffer_render',
            'delete',
            'force_delete',
            'change_points',
            'break_line',
            'trim',
            'group_move',
            'copy_line'
        ],
        groupRightTools: [
            'buffer_render',
            'break_line_by_point',
            'merge_line',
            'batch_assign',
            'batch_merge_line',
            'break_line_by_line',
            'group_move',
            'delete',
            'change_points'
        ],
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
    AD_Lane_Speed: {
        label: '车道中心线限速信息',
        id: 'SPEED_ID',
        spec: 'AD_Lane_Speed'
    },
    AD_LaneShape: {
        label: '车道中心线曲率坡度信息',
        spec: 'AD_LaneShape'
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
    AD_Feat_Junc_Rel: {
        label: '交叉口关系',
        id: 'REL_ID',
        spec: 'AD_Feat_Junc_Rel'
    },
    AD_Plg_Lane_Rel: {
        label: '车道中心线 & 面状标识物关联关系',
        id: 'REL_ID',
        spec: 'AD_Plg_Lane_Rel'
    },
    AD_Sign_Lane_Rel: {
        label: '车道中心线 & 交通标志牌关联关系',
        id: 'REL_ID',
        spec: 'AD_Sign_Lane_Rel'
    },
    AD_Light_Lane_Rel: {
        label: '车道中心线 & 交通信号灯关联关系',
        id: 'REL_ID',
        spec: 'AD_Light_Lane_Rel'
    },
    AD_Lane_Arrow_Rel: {
        label: '车道中心线 & 地面导向箭头关联关系',
        id: 'REL_ID',
        spec: 'AD_Lane_Arrow_Rel'
    },
    AD_Lane_Point_Rel: {
        label: '车道中心线 & 车道属性变化点关联关系',
        id: 'REL_ID',
        spec: 'AD_Lane_Point_Rel'
    },
    AD_Road_Point_Rel: {
        label: '道路参考线 & 车道属性变化点关联关系',
        id: 'REL_ID',
        spec: 'AD_Road_Point_Rel'
    },
    AD_Road_Boundary_Rel: {
        label: '道路边界 & 参考线关联关系',
        id: 'REL_ID',
        spec: 'AD_Road_Boundary_Rel'
    },
    AD_Boundary_Rel: {
        label: '道路边界 & 道路边界关联关系',
        id: 'REL_ID',
        spec: 'AD_Boundary_Rel'
    },
    AD_RS_Barrier_Rel: {
        label: '隔离带护栏 & 车道线',
        id: 'REL_ID',
        spec: 'AD_RS_Barrier_Rel'
    },
    AD_LaneDivider_Pln: {
        label: '几何层：车道线线要素',
        id: 'OBJ_ID',
        spec: 'AD_LaneDivider_Pln',
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
            'copy_line',
            'reverse_order_line',
            'change_points',
            'break_line',
            'trim',
            'force_delete'
        ],
        groupRightTools: [
            'break_line_by_point',
            'merge_line',
            'batch_merge_line',
            'break_line_by_line',
            'batch_assign',
            'delete'
        ],
        editName: '几何层：\n车道线线要素'
    },
    AD_LaneDivider_Plg: {
        label: '几何层：车道线面要素',
        id: 'OBJ_ID',
        spec: 'AD_LaneDivider_Plg',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            // 关联配置 配置工具栏是否显示按钮
            manbuild: ['DRAW_TOOL_BOX','ADD_REL', 'DEL_REL']
        },
      
        drawTools: {
            recognition: ['ADD_GROUND_RECTANGLE', 'POLYGON', 'DASHED_POLYGON_CREATE'],
            manbuild: ['ADD_GROUND_RECTANGLE', 'POLYGON', 'DASHED_POLYGON_CREATE']
        },
        rightTools: [
            'buffer_render',
            'delete',
            'copy_line',
            'change_points',
            'force_delete',
            'group_move'
        ],
        groupRightTools: ['buffer_render', 'batch_assign', 'group_move', 'delete'],
        editName: '几何层：\n车道线面要素'
    },
    AD_StopLocation_Geo: {
        label: '几何层：停止位置',
        id: 'OBJ_ID',
        spec: 'AD_StopLocation_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX','ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['ADD_GROUND_RECTANGLE', 'POLYGON'],
            manbuild: ['ADD_GROUND_RECTANGLE', 'POLYGON']
        },
        rightTools: [
            'buffer_render',
            'delete',
            'copy_line',
            'change_points',
            'force_delete',
            'group_move'
        ],
        groupRightTools: ['buffer_render', 'batch_assign', 'group_move', 'delete'],
        editName: '几何层：\n停止位置'
    },
    AD_Arrow_Geo: {
        label: '几何层：箭头',
        id: 'OBJ_ID',
        spec: 'AD_Arrow_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX']
        },
        drawTools: {
            recognition: ['POLYGON', 'ADD_GROUND_RECTANGLE'],
            manbuild: ['POLYGON', 'ADD_GROUND_RECTANGLE']
        },
        rightTools: ['delete', 'copy_line', 'change_points', 'force_delete'],
        groupRightTools: ['batch_assign', 'delete'],
        editName: '几何层：\n箭头'
    },
    AD_LaneMark_Geo: {
        label: '几何层：路面车道标记',
        id: 'OBJ_ID',
        spec: 'AD_LaneMark_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['POLYGON', 'ADD_GROUND_RECTANGLE'],
            manbuild: ['POLYGON', 'ADD_GROUND_RECTANGLE']
        },
        rightTools: ['delete', 'copy_line', 'change_points', 'force_delete', 'group_move'],
        groupRightTools: ['batch_assign', 'group_move', 'delete'],
        editName: '几何层：\n路面车道标记'
    },
    AD_Pole_Geo: {
        label: '几何层：杆状物',
        id: 'OBJ_ID',
        spec: 'AD_Pole_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX'],
            manbuild: ['DRAW_TOOL_BOX', 'ADD_REL', 'DEL_REL']
        },
        drawTools: {
            recognition: ['LINE', 'CURVED_LINE'],
            manbuild: ['LINE', 'CURVED_LINE']
        },
        rightTools: [
            'buffer_render',
            'delete',
            'change_points',
            'force_delete',
            'group_move',
            'copy_line'
        ],
        groupRightTools: ['buffer_render', 'batch_assign', 'group_move', 'delete'],
        editName: '几何层：\n杆状物'
    },
    AD_TrafficSign_Geo: {
        label: '几何层：交通标志牌',
        id: 'OBJ_ID',
        spec: 'AD_TrafficSign_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST'],
            manbuild: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST']
        },
        drawTools: {
            recognition: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE'],
            manbuild: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE', 'ADD_CIRCLE']
        },
        rightTools: ['delete', 'copy_line', 'change_points', 'force_delete'],
        groupRightTools: ['batch_assign', 'delete'],
        editName: '几何层：\n交通标志牌'
    },
    AD_TrafficLight_Geo: {
        label: '几何层：交通信号灯',
        id: 'OBJ_ID',
        spec: 'AD_TrafficLight_Geo',
        tools: {
            recognition: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST'],
            manbuild: ['DRAW_TOOL_BOX', 'POSTURE_ADJUST']
        },
        drawTools: {
            recognition: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE'],
            manbuild: ['ADD_OUTSIDE_RECTANGLE', 'POLYGON', 'ADD_FACADE_RECTANGLE']
        },
        rightTools: ['delete', 'copy_line', 'change_points', 'force_delete'],
        groupRightTools: ['batch_assign', 'delete'],
        editName: '几何层：\n交通信号灯'
    }
};

export const RESOURCE_LAYER_VECTOR = '高精地图';
export const RESOURCE_LAYER_BOUNDARY = '周边底图';
export const RESOURCE_LAYER_MULTI_PROJECT = '多工程';
export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_TRACK = '轨迹';
export const RESOURCE_LAYER_TASK_SCOPE = '任务范围';
export const RESOURCE_LAYER_CHECK = '检查结果';
export const RESOURCE_LAYER_MARKER = '质检标注';
export const RESOURCE_LAYER_INFORMATION = '资料问题';
export const CONFIDENCE_LAYER = '置信度分区';
export const WRONG_LAYER = '错误区';
export const SUSPECT_LAYER = '怀疑区';
export const IMP_RECOGNITION_DISABLED_LAYERS = ['AD_Road', 'AD_Lane'];

//人工识别设置编辑图层配置
export const MS_EDIT_LAYER_MAP = {
    LOGIC: [
        'AD_LaneDivider',
        'AD_LaneAttrPoint',
        'AD_Arrow',
        'AD_StopLocation',
        'AD_Text',
        'AD_TrafficLight',
        'AD_TrafficSign',
        'AD_Junction',
        'AD_RS_Barrier', 
         // 新增图层配置
         'AD_Lane_Overlap'
    ],
    GEOMETRY: ['AD_LaneDivider_Plg', 'AD_StopLocation_Geo', 'AD_LaneMark_Geo', 'AD_Pole_Geo']
};

//人工构建设置编辑图层配置
export const MB_EDIT_LAYER_MAP = {
    LOGIC: [
        'AD_Road',
        'AD_LaneDivider',
        'AD_Lane',
        'AD_LaneAttrPoint',
        'AD_Arrow',
        'AD_StopLocation',
        'AD_Text',
        'AD_TrafficLight',
        'AD_TrafficSign', 
        'AD_RS_Barrier',
        // 新增图层配置
        'AD_Lane_Overlap'
    ],
    GEOMETRY: ['AD_LaneDivider_Plg', 'AD_StopLocation_Geo', 'AD_LaneMark_Geo', 'AD_Pole_Geo']
};

export const TASK_EDIT_LAYER_MAP = {
    imp_recognition: Object.values(MS_EDIT_LAYER_MAP).flat(),
    imp_manbuild: Object.values(MB_EDIT_LAYER_MAP).flat(),
    imp_std_precompile_man_repair: Object.values(MB_EDIT_LAYER_MAP).flat()
};

export const EDIT_LAYER_TYPE_MAP = { LOGIC: '逻辑层', GEOMETRY: '几何层' };

export const LINE_LAYERS = [
    'AD_Road',
    'AD_LaneDivider',
    'AD_Lane',
    'AD_StopLocation',
    'AD_RS_Barrier',
    'AD_Pole_Geo'
];
