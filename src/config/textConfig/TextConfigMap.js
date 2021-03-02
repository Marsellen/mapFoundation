import { COMMON_TEXT_CONFIG_MAP } from 'src/config/textConfig/CommonTextConfigMap';
import { SELF_CHECK_TEXT_CONFIG_MAP } from 'src/config/textConfig/SelfCheckTextConfigMap';
import { DEFINE_TEXT_CONFIG_MAP } from 'src/config/textConfig/DefineTextConfigMap';
import { MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/MsTaskTextConfigMap';
import { MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/MbTaskTextConfigMap';
import { QC_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/QcTaskTextConfigMap';

//渲染模式文字注记映射
export const TEXT_CONFIG_MAP = {
    common: COMMON_TEXT_CONFIG_MAP, //通用符号模式
    selfCheck: SELF_CHECK_TEXT_CONFIG_MAP, //自查符号模式
    define: DEFINE_TEXT_CONFIG_MAP, //自定义符号模式
    relation: DEFINE_TEXT_CONFIG_MAP //关联关系模式
};

//特殊渲染模式【质检符号模式】文字注记映射
export const CHECK_MODE_TEXT_CONFIG_MAP = {
    imp_recognition: MS_TASK_TEXT_CONFIG_MAP, //人工识别
    imp_check_after_recognition: QC_TASK_TEXT_CONFIG_MAP, //人工识别后质检
    imp_manbuild: MB_TASK_TEXT_CONFIG_MAP, //人工构建
    imp_check_after_manbuild: QC_TASK_TEXT_CONFIG_MAP //人工构建后质检
};
