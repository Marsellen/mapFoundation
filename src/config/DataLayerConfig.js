export const DATA_LAYER_MAP = {
    Arrow: {
        label: '地面引导箭头',
        type: 'POLYGON',
        id: 'OBJECT_ID'
    },
    LaneAttrPoint: {
        label: '车道属性变化点',
        type: 'POINT',
        id: 'ALAP_ID'
    },
    LaneDivider: {
        label: '车道线',
        type: 'LINE',
        id: 'ALDIV_ID'
    },
    Polygon: {
        label: '地面面要素',
        type: 'POLYGON',
        id: 'OBJECT_ID'
    },
    StopLocation: {
        label: '地面停车线',
        type: 'LINE',
        id: 'OBJECT_ID'
    },
    Lane: {
        label: '车道中心线',
        type: 'LINE',
        id: 'ALANE_ID'
    },
    TrafficSign: {
        label: '交通标志牌',
        type: 'AREA',
        id: 'OBJECT_ID'
    },
    ReferenceLine: {
        label: '道路参考线',
        type: 'LINE',
        id: 'REFLINE_ID'
    },
    TrafficLight: {
        label: '交通灯',
        type: 'AREA',
        id: 'OBJECT_ID'
    }
};

export const RESOURCE_LAYER_POINT_CLOUD = '点云';
export const RESOURCE_LAYER_VETOR = '高精地图';
export const RESOURCE_LAYER_TRACE = '轨迹';
