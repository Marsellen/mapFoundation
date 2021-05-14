import { action, observable, configure, flow } from 'mobx';
import { message } from 'antd';
import appStore from 'src/store/common/appStore';
import EditorService from 'src/service/editorService';
import { ROLE_WHITE_LIST } from 'src/config/settingConfig';
import { MARKER_OPTION_CONFIG } from 'src/config/markerConfig/markerOptionConfig';
import { MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/msTaskVectorConfigMap';
import { QC_MS_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMsTaskVectorConfigMap';
import { MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/mbTaskVectorConfigMap';
import { QC_MB_TASK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/qcMbTaskVectorConfigMap';
import { SELF_CHECK_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/selfCheckVectorConfigMap';
import { RELATION_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/relationVectorConfigMap';
import { DEFINE_VECTOR_CONFIG_MAP } from 'src/config/vectorConfig/defineVectorConfigMap';
import { SELF_CHECK_TEXT_CONFIG_MAP } from 'src/config/textConfig/selfCheckTextConfigMap';
import { DEFINE_TEXT_CONFIG_MAP } from 'src/config/textConfig/defineTextConfigMap';
import { MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/msTaskTextConfigMap';
import { MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/mbTaskTextConfigMap';
import { QC_MS_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMsTaskTextConfigMap';
import { QC_MB_TASK_TEXT_CONFIG_MAP } from 'src/config/textConfig/qcMbTaskTextConfigMap';
import { TABLE_DATA_MAP } from 'src/config/adMapDataConfig';
import { ARROW_TEMPLATE_CONFIG } from 'src/config/arrowTemplateConfig';
import { OTHER_CONFIG } from 'src/config/otherConfig';

configure({ enforceActions: 'always' });
class SettingStore {
    config = {
        MARKER_OPTION_CONFIG,
        MS_TASK_VECTOR_CONFIG_MAP,
        MB_TASK_VECTOR_CONFIG_MAP,
        QC_MS_TASK_VECTOR_CONFIG_MAP,
        QC_MB_TASK_VECTOR_CONFIG_MAP,
        SELF_CHECK_VECTOR_CONFIG_MAP,
        RELATION_VECTOR_CONFIG_MAP,
        DEFINE_VECTOR_CONFIG_MAP,
        MS_TASK_TEXT_CONFIG_MAP,
        MB_TASK_TEXT_CONFIG_MAP,
        QC_MS_TASK_TEXT_CONFIG_MAP,
        QC_MB_TASK_TEXT_CONFIG_MAP,
        SELF_CHECK_TEXT_CONFIG_MAP,
        RELATION_TEXT_CONFIG_MAP: DEFINE_TEXT_CONFIG_MAP,
        DEFINE_TEXT_CONFIG_MAP,
        ARROW_TEMPLATE_CONFIG,
        TABLE_DATA_MAP,
        OTHER_CONFIG
    };
    @observable activeKey = null;
    @observable updateKey;

    @action setActiveKey = key => {
        this.activeKey = key;
    };

    @action queryConfig = flow(function* () {
        try {
            const result = yield EditorService.getQcMarkerConfig();
            this.config = Object.assign(this.config, result?.data ?? {});
        } catch (error) {
            console.log('质检标注配置获取失败' + error?.message);
        } finally {
            this.updateKey = Math.random();
        }
    });

    @action saveConfig = flow(function* (data) {
        try {
            if (!this.activeKey) return;
            if (!ROLE_WHITE_LIST.includes(appStore.roleCode)) {
                throw new Error('超级管理员、生产管理员、质检管理员才能修改配置');
            }
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

    @action getConfig = key => {
        return this.config?.[key];
    };
}

export default new SettingStore();
