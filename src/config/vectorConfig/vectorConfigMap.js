//符号设置
import { MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/msTaskVectorConfigMap';
import { QC_MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMsTaskVectorConfigMap';
import { MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/mbTaskVectorConfigMap';
import { QC_MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMbTaskVectorConfigMap';
import { SELF_CHECK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/selfCheckVectorConfigMap';
// import { CHECK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/checkVectorConfigMap';
import { RELATION_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/relationVectorConfigMap';
import { DEFINE_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/defineVectorConfigMap';
import dianfuhao from 'src/asset/img/dianfuhao.png';
import dianfuhao1 from 'src/asset/img/dianfuhao1.png';
import dianfuhao2 from 'src/asset/img/dianfuhao2.png';
import dianfuhao3 from 'src/asset/img/dianfuhao3.png';
import dianfuhao4 from 'src/asset/img/dianfuhao4.png';
import dianfuhao5 from 'src/asset/img/dianfuhao5.png';
import dianfuhao6 from 'src/asset/img/dianfuhao6.png';
import dianfuhao7 from 'src/asset/img/dianfuhao7.png';
import dianfuhao8 from 'src/asset/img/dianfuhao8.png';

//当前任务不同渲染模式对应不同配置
export const MODE_VECTOR_CONFIG_MAP = {
    // common: COMMON_VECTOR_CONFIG_MAP,
    selfCheck: SELF_CHECK_VECTOR_CONFIG_MAP,
    // check: CHECK_VECTOR_CONFIG_MAP,
    define: DEFINE_VECTOR_CONFIG_MAP,
    relation: RELATION_VECTOR_CONFIG_MAP
};

// 【通用符号模式】符号样式
export const COMMON_MODE_VECTOR_CONFIG_MAP = {
    imp_recognition: MS_TASK_VECTOR_CONFIG_MAP, //人工识别
    imp_check_after_recognition: QC_MS_TASK_VECTOR_CONFIG_MAP, //人工识别后质检
    imp_manbuild: MB_TASK_VECTOR_CONFIG_MAP, //人工构建
    imp_check_after_manbuild: QC_MB_TASK_VECTOR_CONFIG_MAP //人工构建后质检
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
    'AD_LaneDivider_Plg',
    'AD_StopLocation_Geo',
    'AD_LaneMark_Geo',
    'AD_Pole_Geo'
];
