export const DATA_LAYER_MAP = {
    AD_Arrow: {
        label: '地面引导箭头',
        id: 'ARR_ID',
        spec: 'AD_Arrow',
        tools: ['POLYGON', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_LaneAttrPoint: {
        label: '车道属性变化点',
        id: 'LAP_ID',
        spec: 'AD_LaneAttrPoint',
        tools: ['POINT', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete']
    },
    AD_LaneDivider: {
        label: '车道线',
        id: 'LDIV_ID',
        spec: 'AD_LaneDivider',
        tools: ['LINE'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'break'
        ],
        groupRightTools: ['breakGroup', 'merge']
    },
    AD_LaneMark_Plg: {
        label: '面状标识物',
        id: 'PLG_ID',
        spec: 'AD_LaneMark_Plg',
        tools: ['POLYGON', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_Text: {
        label: '道路文字符号',
        id: 'TEXT_ID',
        spec: 'AD_Text',
        tools: ['POLYGON', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_StopLocation: {
        label: '停止位置',
        id: 'STOPL_ID',
        spec: 'AD_StopLocation',
        tools: ['LINE', 'ADD_REL', 'DEL_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_Lane: {
        label: '车道中心线',
        id: 'LANE_ID',
        spec: 'AD_Lane',
        tools: ['LINE', 'ADD_REL', 'DEL_REL'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'break'
        ],
        groupRightTools: ['breakGroup', 'merge']
    },
    AD_TrafficSign: {
        label: '交通标志牌',
        id: 'SIGN_ID',
        spec: 'AD_TrafficSign',
        tools: ['POLYGON', 'ADD_FACADEREC_TANGLE', 'ADD_CIRCLE', 'ADD_REL'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_Road: {
        label: '道路参考线',
        id: 'ROAD_ID',
        spec: 'AD_Road',
        tools: ['LINE', 'ADD_REL', 'DEL_REL'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'break'
        ],
        groupRightTools: ['breakGroup', 'merge']
    },
    AD_TrafficLight: {
        label: '交通信号灯',
        id: 'LIGHT_ID',
        spec: 'AD_TrafficLight',
        tools: ['ADD_FACADEREC_TANGLE'],
        rightTools: [
            'delete',
            'insertPoints',
            'changePoints',
            'deletePoints',
            'ADD_REL'
        ]
    },
    AD_Pole: {
        label: '杆状物',
        id: 'POLE_ID',
        spec: 'AD_Pole',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    AD_Map_QC: {
        label: '标记图层',
        id: 'ID',
        spec: 'AD_Map_QC',
        tools: ['POINT'],
        rightTools: ['delete']
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
