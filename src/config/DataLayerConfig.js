export const DATA_LAYER_MAP = {
    Arrow: {
        label: '地面引导箭头',
        id: 'OBJECT_ID',
        spec: 'AD_Arrow',
        tools: ['POLYGON'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    LaneAttrPoint: {
        label: '车道属性变化点',
        id: 'ALAP_ID',
        spec: 'AD_LaneAttrPoint',
        tools: ['POINT'],
        rightTools: ['delete']
    },
    LaneDivider: {
        label: '车道线',
        id: 'ALDIV_ID',
        spec: 'AD_LaneDivider',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    Polygon: {
        label: '面状要素',
        id: 'OBJECT_ID',
        spec: 'AD_Polygon',
        tools: ['POLYGON'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    StopLocation: {
        label: '停止位置',
        id: 'OBJECT_ID',
        spec: 'AD_StopLocation',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    Lane: {
        label: '车道中心线',
        id: 'ALANE_ID',
        spec: 'AD_Lane',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    TrafficSign: {
        label: '交通标志牌',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficSign',
        tools: ['ADD_FACADEREC_TANGLE'],//, 'ADD_CIRCLE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    ReferenceLine: {
        label: '道路参考线',
        id: 'REFLINE_ID',
        spec: 'AD_ReferenceLine',
        tools: ['LINE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    },
    TrafficLight: {
        label: '交通信号灯',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficLight',
        tools: ['ADD_FACADEREC_TANGLE'],
        rightTools: ['delete', 'insertPoints', 'changePoints', 'deletePoints']
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
