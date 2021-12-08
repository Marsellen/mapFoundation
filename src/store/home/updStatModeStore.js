import { observable, configure, action } from 'mobx';
import { UPD_STAT_VECTOR_CONFIG } from 'src/config/updStatVectorConfig';
import { UPD_STAT_CHECK_GROUP } from 'src/config/renderModeConfig';
import SettingStore from 'src/store/setting/settingStore';

const updStatAllChecked = SettingStore.getConfig('OTHER_CONFIG').updStatAllChecked;

configure({ enforceActions: 'always' });
class UpdStatModeStore {
    checkedList = []; //当前已选专题图
    updStatCheckgroupL = UPD_STAT_CHECK_GROUP.length; //获取专题图数量
    @observable updStatCheckgroup = UPD_STAT_CHECK_GROUP; //专题图下拉框配置
    @observable indeterminate = false; //checkbox是否indeterminate
    @observable allChecked = updStatAllChecked; //checkbox是否全选
    @observable allLayerUpdConfig = UPD_STAT_VECTOR_CONFIG;

    @action release = () => {
        this.checkedList = [];
        this.updStatCheckgroupL = UPD_STAT_CHECK_GROUP.length;
        this.updStatCheckgroup = UPD_STAT_CHECK_GROUP;
        this.indeterminate = false;
        this.allChecked = updStatAllChecked;
        this.allLayerUpdConfig = UPD_STAT_VECTOR_CONFIG;
    };

    // 切换其他模式清空更新标识渲染
    @action clearUpdStatMode = () => {
        this.release();
        this.toggleAllUpdStatRender(false);
    };

    // 初始化更新标识样式
    initUpdStatConfig = () => {
        Object.values(this.allLayerUpdConfig).map(item => {
            const vectorLayer = this.getVectorLayer(item.key);
            const { iconFields, iconStyle, showStyles } = item;
            const config = {
                showStyles,
                iconFields,
                iconStyle
            };
            vectorLayer && vectorLayer.resetConfig(config);
        });
        this.toggleAllUpdStatRender(updStatAllChecked);
    };

    // 获得layer
    @action getVectorLayer = key => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        const { layer } = layers.find(item => item.layerName === key) || {};
        return layer;
    };

    // 更新标识显隐
    toggleLayersUpdStat = (option, checked) => {
        if (!window.vectorLayerGroup) return;
        const { layers } = window.vectorLayerGroup;
        layers.forEach(item => {
            const { layer } = item;
            layer.showOrHideIconByOption(option, checked);
        });
    };

    toggleUpdStatRender = (type, checked) => {
        const option = { Key: 'UPD_STAT', value: type };
        this.toggleLayersUpdStat(option, checked);
    };

    toggleAllUpdStatRender = checked => {
        this.updStatCheckgroup.forEach(item => {
            const { key } = item;
            const option = { Key: 'UPD_STAT', value: key };
            this.toggleLayersUpdStat(option, checked);
        });
    };

    //单选：获取专题图已选图层，判断是否全选
    @action handleChecked = (checked, key) => {
        //改变指定专题图的checked
        this.updStatCheckgroup.find(item => item.key === key).checked = checked;
        //改变checkbox组相关状态
        this.checkedList = this.updStatCheckgroup.filter(item => item.checked);
        const checkedListL = this.checkedList.length;
        this.indeterminate = checkedListL && checkedListL < this.updStatCheckgroupL;
        this.allChecked = checkedListL === this.updStatCheckgroupL;
        //更新标识渲染
        this.toggleUpdStatRender(key, checked);
    };

    //全选：获取专题图已选图层，判断是否全选
    @action handleAllChecked = checked => {
        //改变所有专题图的checked
        this.updStatCheckgroup.forEach(item => {
            item.checked = checked;
        });
        //改变checkbox组相关状态
        this.indeterminate = false;
        this.allChecked = checked;
        this.checkedList = checked ? this.updStatCheckgroup : [];
        //更新标识渲染
        this.toggleAllUpdStatRender(checked);
    };
}

export default new UpdStatModeStore();
