import { action, observable, configure, flow } from 'mobx';
import { message } from 'antd';
import EditorService from 'src/service/editorService';
import { MARKER_OPTION_CONFIG } from 'src/config/markerConfig/markerOptionConfig';
import { MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/msTaskVectorConfigMap';
import { QC_MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMsTaskVectorConfigMap';
import { MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/mbTaskVectorConfigMap';
import { QC_MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMbTaskVectorConfigMap';
import { SELF_CHECK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/selfCheckVectorConfigMap';
import { RELATION_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/relationVectorConfigMap';
import { UPDATE_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/updateVectorConfigMap';
import { DEFINE_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/defineVectorConfigMap';
import { SELF_CHECK_TEXT_CONFIG_MAP } from 'src/config/textConfig/selfCheckTextConfigMap';
import { RELATION_TEXT_CONFIG_MAP } from 'src/config/textConfig/relationTextConfigMap';
import { DEFINE_TEXT_CONFIG_MAP } from 'src/config/textConfig/defineTextConfigMap';
import { UPDATE_TEXT_CONFIG_MAP } from 'src/config/textConfig/updateTextConfigMap';
import { MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/msTaskTextConfigMap';
import { MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/mbTaskTextConfigMap';
import { QC_MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMsTaskTextConfigMap';
import { QC_MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMbTaskTextConfigMap';
import { QR_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qrTaskTextConfigMap';
import { TABLE_DATA_MAP } from 'src/config/adMapDataConfig';
import { ARROW_TEMPLATE_CONFIG } from 'src/config/arrowTemplateConfig';
import { OTHER_CONFIG } from 'src/config/otherConfig';
import { SAVE_MENUS } from 'src/config/settingConfig';

configure({ enforceActions: 'always' });
class SettingStore {
    config = {
        MARKER_OPTION_CONFIG, //质检标注配置
        MS_TASK_VECTOR_CONFIG_MAP, //符号配置-通用符号模式-人工识别任务样式
        MB_TASK_VECTOR_CONFIG_MAP, //符号配置-通用符号模式-人工构建任务样式
        QC_MS_TASK_VECTOR_CONFIG_MAP, //符号配置-通用符号模式-人工识别质检任务样式
        QC_MB_TASK_VECTOR_CONFIG_MAP, //符号配置-通用符号模式-人工构建质检任务样式
        SELF_CHECK_VECTOR_CONFIG_MAP, //符号配置-自查符号模式
        RELATION_VECTOR_CONFIG_MAP, //符号配置-关联关系查看模式
        UPDATE_VECTOR_CONFIG_MAP, //符号配置-更新标识查看模式
        DEFINE_VECTOR_CONFIG_MAP, //符号配置-自定义符号模式
        MS_TASK_TEXT_CONFIG_MAP, //注记配置-通用符号模式-人工识别任务样式
        MB_TASK_TEXT_CONFIG_MAP, //注记配置-通用符号模式-人工构建任务样式
        QC_MS_TASK_TEXT_CONFIG_MAP, //注记配置-通用符号模式-人工识别质检任务样式
        QC_MB_TASK_TEXT_CONFIG_MAP, //注记配置-通用符号模式-人工构建质检任务样式
        QR_TASK_TEXT_CONFIG_MAP, //注记配置-通用符号模式-人工检修任务样式
        SELF_CHECK_TEXT_CONFIG_MAP, //注记配置-自查符号模式
        RELATION_TEXT_CONFIG_MAP, //注记配置-关联关系查看模式
        DEFINE_TEXT_CONFIG_MAP, //注记配置-自定义符号模式
        UPDATE_TEXT_CONFIG_MAP, //注记配置-更新标识查看模式
        ARROW_TEMPLATE_CONFIG, //箭头模板配置
        TABLE_DATA_MAP, //属性自维护配置
        OTHER_CONFIG //其它配置
    };
    @observable localConfig = {};
    @observable activeKey = null;
    @observable updateKey;

    @action setActiveKey = key => {
        this.activeKey = key;
    };

    @action queryConfig = flow(function* () {
        try {
            const result = yield EditorService.getQcMarkerConfig();
            const data = result?.data ?? {};
            const config = {};
            SAVE_MENUS.forEach(key => {
                config[key] = data[key];
            });
            this.localConfig = this.config;
            // this.config = Object.assign(this.config, config);
        } catch (error) {
            console.log('质检标注配置获取失败' + error?.message);
        } finally {
            this.updateKey = Math.random();
        }
    });

    @action saveConfig = flow(function* (data) {
        try {
            if (!this.activeKey) return;
            //检查数据能不能成功转化成json对象
            const res = JSON.parse(JSON.parse(JSON.stringify(data)));
            if (typeof res !== 'object') throw new Error('格式不正确');
            //保存质检标注配置
            this.config[this.activeKey] = res;
            yield EditorService.setQcMarkerConfig(this.config);
            message.success('更新成功');
        } catch (error) {
            console.log('质检标注配置保存失败' + error?.message);
            message.error('保存失败 ' + error?.message);
        } finally {
            this.updateKey = Math.random();
        }
    });

    @action saveLocalConfig = flow(function* () {
        try {
            //检查数据能不能成功转化成json对象
            const localConfig = Object.assign(this.localConfig);
            //保存质检标注配置
            yield EditorService.setQcMarkerConfig(localConfig);
            message.success('更新成功');
        } catch (error) {
            message.error('保存失败 ' + error?.message);
        }
    });

    @action getConfig = key => {
        return this.config?.[key];
    };
}

export default new SettingStore();
