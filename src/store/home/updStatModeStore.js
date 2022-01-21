import { observable, configure, action, computed } from 'mobx';
import { UPD_STAT_VECTOR_CONFIG } from 'src/config/updStatVectorConfig';
import { UPD_STAT_CHECK_GROUP } from 'src/config/renderModeConfig';
import SettingStore from 'src/store/setting/settingStore';

configure({ enforceActions: 'always' });
class UpdStatModeStore {
    @observable updStatCheckgroup = UPD_STAT_CHECK_GROUP; //专题图下拉框配置
    @observable allLayerUpdConfig = UPD_STAT_VECTOR_CONFIG;
    @computed get allChecked() {
        const checkedArr = this.updStatCheckgroup.filter(item => item.checked);
        return this.updStatCheckgroup.length === checkedArr.length;
    }
    @computed get indeterminate() {
        const checkedArr = this.updStatCheckgroup.filter(item => item.checked);
        return checkedArr.length !== 0 && this.updStatCheckgroup.length !== checkedArr.length;
    }

    @action release = () => {
        this.updStatCheckgroup = UPD_STAT_CHECK_GROUP;
        this.allLayerUpdConfig = UPD_STAT_VECTOR_CONFIG;
    };

    //初始化更新标识模式渲染
    @action initUpdStateMode = () => {
        const updStatAllChecked = SettingStore.getConfig('OTHER_CONFIG').updStatAllChecked;
        this.updStatCheckgroup.forEach(item => {
            item.checked = updStatAllChecked;
        });
        this.renderUpdStat();
    };

    // 切换其他模式清空更新标识渲染
    @action clearUpdStatMode = () => {
        this.release();
        this.updStatCheckgroup.forEach(item => {
            item.checked = false;
        });
        this.renderUpdStat();
    };

    // 更新标识渲染
    @action renderUpdStat = () => {
        Object.values(this.allLayerUpdConfig).map(item => {
            const vectorLayer = this.getVectorLayer(item.key);
            const { iconFields, iconStyle, showStyles } = item;
            iconStyle.UPD_STAT = this.updStatCheckgroup.flatMap(item => {
                const config = {
                    value: item.key,
                    style: {
                        showMode: 'center-point',
                        url: item.icon,
                        size: 30
                    }
                };
                return item.checked ? [config] : [];
            });
            const config = { showStyles, iconFields, iconStyle };
            vectorLayer && vectorLayer.resetConfig(config);
        });
    };

    // 获得layer
    @action getVectorLayer = key => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    };

    //单选
    @action handleChecked = (checked, key) => {
        //改变指定专题图的checked
        this.updStatCheckgroup.find(item => item.key === key).checked = checked;
        //更新标识渲染
        this.renderUpdStat();
    };

    //全选
    @action handleAllChecked = checked => {
        //改变所有专题图的checked
        this.updStatCheckgroup.forEach(item => {
            item.checked = checked;
        });
        //更新标识渲染
        this.renderUpdStat();
    };
}

export default new UpdStatModeStore();
