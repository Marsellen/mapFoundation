import { LAYER_MAP_FIELD, COLUMNS_CONFIG_LAYER, SELECT_OPTIONS_LAYER, OPTION_LAYER } from './adMapLayerConfig';
// 新增图层配置  -表展示
export const COLUMNS_CONFIG = {
};
Object.assign(COLUMNS_CONFIG, COLUMNS_CONFIG_LAYER);
// 新增图层配置 图层控制
export const SELECT_OPTIONS = [
    {
        group: '逻辑层：几何要素图层',
        type: 'vector',
        class: 'four-layer-out',
        items: [
            'AD_Road',
            'AD_LaneDivider',
            'AD_Lane',
            'AD_LaneAttrPoint',
            'AD_Arrow',
            'AD_StopLocation',
            // 'AD_LaneMark_Plg',
            'AD_Text',
            'AD_TrafficSign',
            'AD_TrafficLight',

            'AD_Junction',
            'AD_RS_Barrier'
        ].concat(SELECT_OPTIONS_LAYER.items)
    },
    {
        group: '逻辑层：关系图层',
        type: 'rel',
        class: 'three-layer-out',
        items: [
            'AD_Road_Con',
            'AD_Lane_Con',
            'AD_StopL_Lane_Rel',
            'AD_Plg_Lane_Rel',
            'AD_Sign_Lane_Rel',
            'AD_Light_Lane_Rel',
            'AD_Road_Boundary_Rel',
            'AD_Boundary_Rel',
            'AD_Feat_Junc_Rel',
            'AD_RS_Barrier_Rel'
        ]
    },
    {
        group: '逻辑层：属性图层',
        type: 'attr',
        class: 'three-layer-out',
        items: ['AD_Lane_RS', 'AD_Road_Con_RS', 'AD_Lane_Con_RS', 'AD_Lane_Speed']
    },
    {
        group: '几何层',
        type: 'vector',
        class: 'three-layer-out',
        items: [
            // 'AD_LaneDivider_Pln',
            'AD_LaneDivider_Plg',
            'AD_StopLocation_Geo',
            // 'AD_Arrow_Geo',
            'AD_LaneMark_Geo',
            'AD_Pole_Geo'
            // 'AD_TrafficSign_Geo',
            // 'AD_TrafficLight_Geo'
        ]
    }
];
// 新增图层配置 检查当前编辑图层和要操作条目是否匹配
export const OPTION_LAYER_MAP = {
    //矢量要素
    AD_Road: ['AD_Road'],
    AD_LaneDivider: ['AD_LaneDivider'],
    AD_Lane: ['AD_Lane'],
    AD_LaneAttrPoint: ['AD_LaneAttrPoint'],
    AD_Arrow: ['AD_Arrow'],
    AD_StopLocation: ['AD_StopLocation'],
    AD_LaneMark_Plg: ['AD_LaneMark_Plg'],
    AD_Text: ['AD_Text'],
    AD_TrafficSign: ['AD_TrafficSign'],
    AD_TrafficLight: ['AD_TrafficLight'],
    AD_RS_Barrier: ['AD_RS_Barrier'],
    AD_Junction: ['AD_Junction'],
    AD_LaneDivider_Pln: ['AD_LaneDivider_Pln'],
    AD_LaneDivider_Plg: ['AD_LaneDivider_Plg'],
    AD_StopLocation_Geo: ['AD_StopLocation_Geo'],
    AD_Arrow_Geo: ['AD_Arrow_Geo'],
    AD_LaneMark_Geo: ['AD_LaneMark_Geo'],
    AD_Pole_Geo: ['AD_Pole_Geo'],
    AD_TrafficSign_Geo: ['AD_TrafficSign_Geo'],
    AD_TrafficLight_Geo: ['AD_TrafficLight_Geo'],
    //关联关系
    AD_Road_Con: ['AD_Road'],
    AD_Lane_Con: ['AD_Lane'],
    AD_StopL_Lane_Rel: ['AD_Lane', 'AD_StopLocation'],
    AD_Plg_Lane_Rel: ['AD_Lane', 'AD_LaneMark_Geo'],
    AD_Sign_Lane_Rel: ['AD_Lane', 'AD_TrafficSign'],
    AD_Light_Lane_Rel: ['AD_Lane', 'AD_TrafficLight'],
    AD_Lane_Arrow_Rel: ['AD_Lane', 'AD_Arrow'],
    AD_Lane_Point_Rel: ['AD_Lane', 'AD_LaneAttrPoint'],
    AD_Road_Point_Rel: ['AD_LaneAttrPoint', 'AD_Road'],
    AD_Road_Boundary_Rel: ['AD_LaneDivider', 'AD_Road'],
    AD_Boundary_Rel: ['AD_LaneDivider'],
    AD_RS_Barrier_Rel: ['AD_RS_Barrier', 'AD_LaneDivider'],
    //关联属性
    AD_TS_Content: ['AD_TrafficSign'],
    AD_Lane_RS: ['AD_Lane'],
    AD_Lane_Speed: ['AD_Lane'],
    AD_Road_Con_RS: ['AD_Road'],
    AD_Lane_Con_RS: ['AD_Lane']
};
Object.assign(OPTION_LAYER_MAP, OPTION_LAYER)