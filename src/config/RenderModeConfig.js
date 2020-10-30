import common from 'src/assets/img/common.png';
import check from 'src/assets/img/check.png';
import relation from 'src/assets/img/relation.png';
// import update from 'src/assets/img/update.png';
import define from 'src/assets/img/define.png';

//渲染模式配置
export const RENDER_MODE_MAP = [
    {
        mode: 'common',
        title: '通用符号模式',
        desc: '用于基础的生产作业',
        icon: common
    },
    {
        mode: 'check',
        title: '质检符号模式',
        desc: '用于作业自检和快速质检',
        icon: check
    },
    {
        mode: 'relation',
        title: '关联关系查看模式',
        desc: '提供系统的关联关系符号策略\n及关联关系查看工具',
        icon: relation
    },
    // {
    //     mode: 'update',
    //     title: '更新查看模式',
    //     desc: '提供系统的更新状态符号策略\n及更新数据查看工具',
    //     icon: update
    // }
    {
        mode: 'define',
        title: '自定义符号模式',
        desc: '想看啥，自己选',
        icon: define
    }
];

//不同任务类型采用不同渲染模式
export const TASK_MODE_MAP = {
    imp_recognition: 'common', //人工识别
    imp_check_after_recognition: 'check', //人工识别后质检
    imp_manbuild: 'check', //人工构建
    imp_check_after_manbuild: 'check' //人工构建后质检
};

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
        title: '道路参考线 & 车道属性交化点',
        key: 'AD_Road_Point_Rel',
        checked: false
    }
];

//id与图层名、key值映射
export const LAYER_NAME_MAP = {
    LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    L_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
    R_LDIV_ID: { layerName: 'AD_LaneDivider', key: 'LDIV_ID' },
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
    PLG_ID: { layerName: 'AD_LaneMark_Plg', key: 'PLG_ID' },
    ARR_ID: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    ARROW_ID: { layerName: 'AD_Arrow', key: 'ARR_ID' },
    TEXT_ID: { layerName: 'AD_Text', key: 'TEXT_ID' },
    SIGN_ID: { layerName: 'AD_TrafficSign', key: 'SIGN_ID' },
    LIGHT_ID: { layerName: 'AD_TrafficLight', key: 'LIGHT_ID' },
    LAP_ID: { layerName: 'AD_LaneAttrPoint', key: 'LAP_ID' },
    LANEP_ID: { layerName: 'AD_LaneAttrPoint', key: 'LAP_ID' },
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
    AD_Road_Point_Rel: ['LAP_ID', 'ROAD_ID']
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
    [['LAP', 'ROAD']]: 'AD_Road_Point_Rel',
    [['LANEP', 'ROAD']]: 'AD_Road_Point_Rel'
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
