import common from 'src/asset/img/common.png';
// import check from 'src/asset/img/check.png';
import selfCheck from 'src/asset/img/selfcheck.png';
import relation from 'src/asset/img/relation.png';
import update from 'src/asset/img/update.png';
import define from 'src/asset/img/define.png';
const jihexinzeng = require('src/asset/img/jihexinzeng.png');
const jihexiugai = require('src/asset/img/jihexiugai.png');
const shuxingxiugai = require('src/asset/img/shuxingxiugai.png');
const guanxixiugai = require('src/asset/img/guanxixiugai.png');

//渲染模式配置
export const RENDER_MODE_MAP = [
    {
        mode: 'common',
        title: '通用符号模式',
        desc: '用于人工作业、人工质检，各作业阶段配色不同',
        icon: common
    },
    {
        mode: 'selfCheck',
        title: '自查符号模式',
        desc: '用于人工识别生产时的打断/自查环节',
        icon: selfCheck
    },
    // {
    //     mode: 'check',
    //     title: '质检符号模式',
    //     desc: '用于人工识别质检、人工构建生产、人工构建质检',
    //     icon: check
    // },
    {
        mode: 'relation',
        title: '关联关系查看模式',
        desc: '用于关联关系查看',
        icon: relation
    },
    {
        mode: 'update',
        title: '更新查看模式',
        desc: '提供系统的更新状态符号策略\n及更新数据查看工具',
        icon: update
    },
    {
        mode: 'define',
        title: '自定义符号模式',
        desc: '基于空白模板，可按需自定义渲染样式',
        icon: define
    }
];

//专题图下拉框配置
export const REL_SELECT_OPTIONS = [
    {
        title: '车道中心线 连接关系',
        key: 'AD_Lane_Con',
        checked: false
    },
    {
        title: '道路参考线 连接关系',
        key: 'AD_Road_Con',
        checked: false
    },
    {
        title: '车道中心线 & 左右侧车道线',
        key: 'AD_Lane_Divider_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 道路参考线',
        key: 'AD_Lane_Road_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 停止位置',
        key: 'AD_StopL_Lane_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 面状标识物',
        key: 'AD_Plg_Lane_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 交通标志牌',
        key: 'AD_Sign_Lane_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 交通信号灯',
        key: 'AD_Light_Lane_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 地面导向箭头',
        key: 'AD_Lane_Arrow_Rel',
        checked: false
    },
    {
        title: '道路边界 & 道路参考线',
        key: 'AD_Road_Boundary_Rel',
        checked: false
    },
    {
        title: '道路边界 & 道路边界',
        key: 'AD_Boundary_Rel',
        checked: false
    },
    {
        title: '道路参考线 & 车道属性变化点',
        key: 'AD_Road_Point_Rel',
        checked: false
    },
    {
        title: '车道中心线 & 车道属性变化点',
        key: 'AD_Lane_Point_Rel',
        checked: false
    },
    {
        title: '交叉口关系',
        key: 'AD_Feat_Junc_Rel',
        checked: false
    },
    {
        title: '隔离带护栏 & 车道线',
        key: 'AD_RS_Barrier_Rel',
        checked: false
    }
];

// 更新标识几何新增
export const GEOMETRY_ADD = '"GEOMETRY":"ADD"';
// 更新标识几何修改
export const GEOMETRY_MOD = '"GEOMETRY":"MOD"';
// 更新标识关系变化
export const RELATION_MOD = '"RELATION":"MOD"';

// 每个图层的更新标识属性修改
export const AD_ROAD_ATTRIBUTE_MOD =
    '"TYPE":"MOD"|"RD_STATUS":"MOD"|"CROSSING":"MOD"|"RD_FORM":"MOD"|"DIRECTION":"MOD"|"LENGTH":"MOD"';
export const AD_LANEDIVIDER_ATTRIBUTE_MOD = '"TYPE":"MOD"|"SHARE_LINE":"MOD"|"RD_EDGE":"MOD"';
export const AD_LANE_ATTRIBUTE_MOD =
    '"TYPE":"MOD"|"LANE_NO":"MOD"|"DIRECTION":"MOD"|"STATUS":"MOD"|"ROAD_ID":"MOD"|"L_LDIV_ID":"MOD"|"R_LDIV_ID":"MOD"';
export const AD_ARROW_ATTRIBUTE_MOD = '"ARR_DIRECT":"MOD"|"LANE_ID":"MOD"';
export const AD_STOPLOCATION_ATTRIBUTE_MOD = '"TYPE":"MOD"';
export const AD_TEXT_ATTRIBUTE_MOD =
    '"CONT_TYPE":"MOD"|"SPEED":"MOD"|"TIMEDOM":"MOD"|"VEH_LMT":"MOD"|"TEXT":"MOD"';
export const AD_TRAFFICSIGN_ATTRIBUTE_MOD = '"OBJ_FUNC":"MOD"';
export const AD_TRAFFICLIGHT_ATTRIBUTE_MOD = '"NOKEY":"MOD"';
export const AD_LANEDIVIDER_PLG_ATTRIBUTE_MOD =
    '"FEAT_TYPE":"MOD"|"CFD_GEO":"MOD"|"CFD_FEAT":"MOD"';
export const AD_STOPLOCATION_GEO_ATTRIBUTE_MOD =
    '"FEAT_TYPE":"MOD"|"CFD_GEO":"MOD"|"CFD_FEAT":"MOD"';
export const AD_LANEMARK_GEO_ATTRIBUTE_MOD = '"FEAT_TYPE":"MOD"|"CFD_GEO":"MOD"|"CFD_FEAT":"MOD"';
export const AD_POLE_GEO_ATTRIBUTE_MOD = '"CFD_GEO":"MOD"|"CFD_FEAT":"MOD"';

// 所有图层的更新标识属性修改
const ALL_LAYER_ATTRIBUTE_MOD =
    AD_ROAD_ATTRIBUTE_MOD +
    '|' +
    AD_LANEDIVIDER_ATTRIBUTE_MOD +
    '|' +
    AD_LANE_ATTRIBUTE_MOD +
    '|' +
    AD_ARROW_ATTRIBUTE_MOD +
    '|' +
    AD_STOPLOCATION_ATTRIBUTE_MOD +
    '|' +
    AD_TEXT_ATTRIBUTE_MOD +
    '|' +
    AD_TRAFFICSIGN_ATTRIBUTE_MOD +
    '|' +
    AD_TRAFFICLIGHT_ATTRIBUTE_MOD +
    '|' +
    AD_LANEDIVIDER_PLG_ATTRIBUTE_MOD +
    '|' +
    AD_STOPLOCATION_GEO_ATTRIBUTE_MOD +
    '|' +
    AD_LANEMARK_GEO_ATTRIBUTE_MOD +
    '|' +
    AD_POLE_GEO_ATTRIBUTE_MOD;
// 更新查看模式专题图下拉框配置
export const UPD_STAT_CHECK_GROUP = [
    {
        title: '几何新增',
        key: GEOMETRY_ADD,
        icon: jihexinzeng
    },
    {
        title: '几何修改',
        key: GEOMETRY_MOD,
        icon: jihexiugai
    },
    {
        title: '属性修改',
        key: ALL_LAYER_ATTRIBUTE_MOD,
        icon: shuxingxiugai
    },
    {
        title: '关系修改',
        key: RELATION_MOD,
        icon: guanxixiugai
    }
];

//id与图层名、key值映射
export const LAYER_NAME_MAP = {
    LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    L_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    R_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    F_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    S_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    ROAD_ID: { layerName: 'AD_Road', key: 'ROAD_ID' },
    LANE_ID: { layerName: 'AD_Lane', key: 'LANE_ID' },
    FROM_LANE: { layerName: 'AD_Lane', key: 'LANE_ID' },
    FROM_LANE_ID: { layerName: 'AD_Lane', key: 'LANE_ID' },
    TO_LANE: { layerName: 'AD_Lane', key: 'LANE_ID' },
    TO_LANE_ID: { layerName: 'AD_Lane', key: 'LANE_ID' },
    FROM_ROAD: { layerName: 'AD_Road', key: 'ROAD_ID' },
    FROM_ROAD_ID: { layerName: 'AD_Road', key: 'ROAD_ID' },
    TO_ROAD: { layerName: 'AD_Road', key: 'ROAD_ID' },
    TO_ROAD_ID: { layerName: 'AD_Road', key: 'ROAD_ID' },
    STOPL_ID: { layerName: 'AD_StopLocation', key: 'STOPL_ID' },
    PLG: { layerName: 'AD_LaneMark_Geo', key: 'OBJ_ID' },
    PLG_ID: { layerName: 'AD_LaneMark_Geo', key: 'OBJ_ID' },
    ARR: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    ARR_ID: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    ARROW: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    ARROW_ID: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    TEXT_ID: { layerName: 'AD_Text', key: 'TEXT_ID' },
    SIGN_ID: { layerName: 'AD_TrafficSign', key: 'SIGN_ID' },
    LAP_ID: { layerName: 'AD_LaneAttrPoint', key: 'LAP_ID' },
    LANEP_ID: { layerName: 'AD_LaneAttrPoint', key: 'LAP_ID' },
    LIGHT_ID: { layerName: 'AD_TrafficLight', key: 'LIGHT_ID' },
    POLE: { layerName: 'AD_Pole_Geo', key: 'OBJ_ID' },
    POLE_ID: { layerName: 'AD_Pole_Geo', key: 'OBJ_ID' },
    JUNC: { layerName: 'AD_Junction', key: 'JUNC_ID' },
    JUNC_ID: { layerName: 'AD_Junction', key: 'JUNC_ID' },
    BARR_ID: { layerName: 'AD_RS_Barrier', key: 'BARR_ID' }
};

//关联关系与id映射
export const RELS_ID_MAP = {
    AD_Lane_Con: ['FROM_LANE', 'TO_LANE'],
    AD_Road_Con: ['FROM_ROAD', 'TO_ROAD'],
    AD_Lane_Divider_Rel: ['LANE_ID', 'L_LDIV_ID', 'R_LDIV_ID'],
    AD_Lane_Road_Rel: ['LANE_ID', 'ROAD_ID'],
    AD_StopL_Lane_Rel: ['LANE_ID', 'STOPL_ID'],
    AD_Plg_Lane_Rel: ['LANE_ID', 'PLG_ID'],
    AD_Sign_Lane_Rel: ['LANE_ID', 'SIGN_ID'],
    AD_Light_Lane_Rel: ['LANE_ID', 'LIGHT_ID'],
    AD_Lane_Arrow_Rel: ['ARR_ID', 'LANE_ID'],
    AD_Road_Boundary_Rel: ['LDIV_ID', 'ROAD_ID'],
    AD_Boundary_Rel: ['F_LDIV_ID', 'S_LDIV_ID'],
    AD_Road_Point_Rel: ['LAP_ID', 'ROAD_ID'],
    AD_Lane_Point_Rel: ['LAP_ID', 'LANE_ID'],
    AD_Feat_Junc_Rel: ['JUNC_ID', 'FEAT_ID'],
    AD_RS_Barrier_Rel: ['BARR_ID', 'LDIV_ID']
};

export const RELS_ID_MAP_REVERSE = {
    [['FROM_LANE', 'TO_LANE']]: 'AD_Lane_Con',
    [['FROM_ROAD', 'TO_ROAD']]: 'AD_Road_Con',
    [['LANE', 'L_LDIV']]: 'AD_Lane_Divider_Rel',
    [['LANE', 'R_LDIV']]: 'AD_Lane_Divider_Rel',
    [['LANE', 'L_LDIV', 'R_LDIV']]: 'AD_Lane_Divider_Rel',
    [['LANE', 'ROAD']]: 'AD_Lane_Road_Rel',
    [['LANE', 'STOPL']]: 'AD_StopL_Lane_Rel',
    [['LANE', 'PLG']]: 'AD_Plg_Lane_Rel',
    [['LANE', 'SIGN']]: 'AD_Sign_Lane_Rel',
    [['LANE', 'LIGHT']]: 'AD_Light_Lane_Rel',
    [['LANE', 'ARROW']]: 'AD_Lane_Arrow_Rel',
    [['LDIV', 'ROAD']]: 'AD_Road_Boundary_Rel',
    [['F_LDIV_ID', 'S_LDIV_ID']]: 'AD_Boundary_Rel',
    [['LAP', 'ROAD']]: 'AD_Road_Point_Rel',
    [['LANEP', 'ROAD']]: 'AD_Road_Point_Rel',
    [['LAP', 'LANE']]: 'AD_Lane_Point_Rel',
    [['LANEP', 'LANE']]: 'AD_Lane_Point_Rel',
    [['JUNC', 'FEAT']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'PLG']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'POLE']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'OBJ']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'STOPL']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'TEXT']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'ARR']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'ARROW']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'LDIV']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'SIGN']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'LIGHT']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'ROAD']]: 'AD_Feat_Junc_Rel',
    [['JUNC', 'LANE']]: 'AD_Feat_Junc_Rel',
    [['BARR', 'LDIV']]: 'AD_RS_Barrier_Rel'
};

//id与文字标注配置映射
export const REL_FEATURE_COLOR_MAP = {
    L_LDIV_ID: {
        color: 'rgb(0,255,0)',
        text: '左',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    R_LDIV_ID: {
        color: 'rgb(237,125,49)',
        text: '右',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    FROM_LANE: {
        color: 'rgb(0,255,255)',
        text: '进',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    FROM_LANE_ID: {
        color: 'rgb(0,255,255)',
        text: '进',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    TO_LANE: {
        color: 'rgb(255,0,0)',
        text: '出',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    TO_LANE_ID: {
        color: 'rgb(255,0,0)',
        text: '出',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    FROM_ROAD: {
        color: 'rgb(0,255,255)',
        text: '进',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    FROM_ROAD_ID: {
        color: 'rgb(0,255,255)',
        text: '进',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    TO_ROAD: {
        color: 'rgb(255,0,0)',
        text: '出',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    },
    TO_ROAD_ID: {
        color: 'rgb(255,0,0)',
        text: '出',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        style: {
            borderColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,1)',
            textColor: 'rgba(255,255,255,1)'
        }
    }
};
