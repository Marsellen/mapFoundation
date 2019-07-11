export const DATA_LAYER_MAP = {
    Arrow: {
        label: '地面引导箭头',
        id: 'OBJECT_ID',
        spec: 'AD_Arrow',
        tools: ['POLYGON']
    },
    LaneAttrPoint: {
        label: '车道属性变化点',
        id: 'ALAP_ID',
        spec: 'AD_LaneAttrPoint',
        tools: ['POINT']
    },
    LaneDivider: {
        label: '车道线',
        id: 'ALDIV_ID',
        spec: 'AD_LaneDivider',
        tools: ['LINE']
    },
    Polygon: {
        label: '地面面要素',
        id: 'OBJECT_ID',
        spec: 'AD_Polygon',
        tools: ['POLYGON']
    },
    StopLocation: {
        label: '地面停车线',
        id: 'OBJECT_ID',
        spec: 'AD_StopLocation',
        tools: ['LINE']
    },
    Lane: {
        label: '车道中心线',
        id: 'ALANE_ID',
        spec: 'AD_Lane',
        tools: ['LINE']
    },
    TrafficSign: {
        label: '交通标志牌',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficSign',
        tools: ['ADD_FACADEREC_TANGLE']
    },
    ReferenceLine: {
        label: '道路参考线',
        id: 'REFLINE_ID',
        spec: 'AD_ReferenceLine',
        tools: ['LINE']
    },
    TrafficLight: {
        label: '交通灯',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficLight',
        tools: ['ADD_FACADEREC_TANGLE']
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
