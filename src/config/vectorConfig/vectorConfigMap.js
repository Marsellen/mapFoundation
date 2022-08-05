import dianfuhao from 'src/asset/img/dianfuhao.png';
import dianfuhao1 from 'src/asset/img/dianfuhao1.png';
import dianfuhao2 from 'src/asset/img/dianfuhao2.png';
import dianfuhao3 from 'src/asset/img/dianfuhao3.png';
import dianfuhao4 from 'src/asset/img/dianfuhao4.png';
import dianfuhao5 from 'src/asset/img/dianfuhao5.png';
import dianfuhao6 from 'src/asset/img/dianfuhao6.png';
import dianfuhao7 from 'src/asset/img/dianfuhao7.png';
import dianfuhao8 from 'src/asset/img/dianfuhao8.png';

import {CONFIGURABLE_LAYER} from 'src/config/adMapLayerConfig';

export const VECTOR_CONFIG_MAP = {
    //渲染模式与符号配置映射
    selfCheck: 'SELF_CHECK_VECTOR_CONFIG_MAP',
    define: 'DEFINE_VECTOR_CONFIG_MAP',
    relation: 'RELATION_VECTOR_CONFIG_MAP',
    update: 'UPDATE_VECTOR_CONFIG_MAP',
    check: 'CHECK_VECTOR_CONFIG_MAP',
    //任务类型与符号配置映射
    imp_recognition: 'MS_TASK_VECTOR_CONFIG_MAP',
    imp_check_after_recognition: 'QC_MS_TASK_VECTOR_CONFIG_MAP',
    imp_manbuild: 'MB_TASK_VECTOR_CONFIG_MAP',
    imp_check_after_manbuild: 'QC_MB_TASK_VECTOR_CONFIG_MAP',
    imp_map_second_check: 'QC_MB_TASK_VECTOR_CONFIG_MAP',
    imp_std_precompile_man_repair: 'MB_TASK_VECTOR_CONFIG_MAP',
    // 定点检修
    imp_designated_repair:'QC_MB_TASK_VECTOR_CONFIG_MAP'
};

//点符号图标名与base64映射
export const POINT_ICON_MAP = {
    dianfuhao: dianfuhao,
    dianfuhao1: dianfuhao1,
    dianfuhao2: dianfuhao2,
    dianfuhao3: dianfuhao3,
    dianfuhao4: dianfuhao4,
    dianfuhao5: dianfuhao5,
    dianfuhao6: dianfuhao6,
    dianfuhao7: dianfuhao7,
    dianfuhao8: dianfuhao8
};

// 关联渲染  会做检查
export const CONFIGURABLE_LAYERS = [
    'AD_Road',
    'AD_LaneDivider',
    'AD_Lane',
    'AD_LaneAttrPoint',
    'AD_Arrow',
    'AD_StopLocation',
    'AD_Text',
    'AD_TrafficSign',
    'AD_TrafficLight',
    'AD_RS_Barrier',
    'AD_Junction',
    'AD_LaneDivider_Plg',
    'AD_StopLocation_Geo',
    'AD_LaneMark_Geo',
    'AD_Pole_Geo'
].concat(CONFIGURABLE_LAYER);
