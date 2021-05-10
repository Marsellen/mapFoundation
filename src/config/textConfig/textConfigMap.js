import { SELF_CHECK_TEXT_CONFIG_MAP } from 'src/config/textConfig/selfCheckTextConfigMap';
import { DEFINE_TEXT_CONFIG_MAP } from 'src/config/textConfig/defineTextConfigMap';
import { MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/msTaskTextConfigMap';
import { MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/mbTaskTextConfigMap';
import { QC_MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMsTaskTextConfigMap';
import { QC_MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMbTaskTextConfigMap';

//渲染模式文字注记映射
export const TEXT_CONFIG_MAP = {
    // common: COMMON_TEXT_CONFIG_MAP, //通用符号模式
    selfCheck: SELF_CHECK_TEXT_CONFIG_MAP, //自查符号模式
    define: DEFINE_TEXT_CONFIG_MAP, //自定义符号模式
    relation: DEFINE_TEXT_CONFIG_MAP //关联关系模式
};

//特殊渲染模式【通用符号模式】文字注记映射
export const COMMON_MODE_TEXT_CONFIG_MAP = {
    imp_recognition: MS_TASK_TEXT_CONFIG_MAP, //人工识别
    imp_check_after_recognition: QC_MS_TASK_TEXT_CONFIG_MAP, //人工识别后质检
    imp_manbuild: MB_TASK_TEXT_CONFIG_MAP, //人工构建
    imp_check_after_manbuild: QC_MB_TASK_TEXT_CONFIG_MAP //人工构建后质检
};
