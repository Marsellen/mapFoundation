export const DATA_LAYER_MAP = {
    Arrow: {
        label: '地面引导箭头',
        type: 'POLYGON',
        id: 'OBJECT_ID',
        spec: 'AD_Arrow'
    },
    LaneAttrPoint: {
        label: '车道属性变化点',
        type: 'POINT',
        id: 'ALAP_ID',
        spec: 'AD_LaneAttrPoint'
    },
    LaneDivider: {
        label: '车道线',
        type: 'LINE',
        id: 'ALDIV_ID',
        spec: 'AD_LaneDivider'
    },
    Polygon: {
        label: '地面面要素',
        type: 'POLYGON',
        id: 'OBJECT_ID',
        spec: 'AD_Polygon'
    },
    StopLocation: {
        label: '地面停车线',
        type: 'LINE',
        id: 'OBJECT_ID',
        spec: 'AD_StopLocation'
    },
    Lane: {
        label: '车道中心线',
        type: 'LINE',
        id: 'ALANE_ID',
        spec: 'AD_Lane'
    },
    TrafficSign: {
        label: '交通标志牌',
        type: 'AREA',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficSign'
    },
    ReferenceLine: {
        label: '道路参考线',
        type: 'LINE',
        id: 'REFLINE_ID',
        spec: 'AD_ReferenceLine'
    },
    TrafficLight: {
        label: '交通灯',
        type: 'AREA',
        id: 'OBJECT_ID',
        spec: 'AD_TrafficLight'
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
