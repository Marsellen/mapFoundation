import { observable, configure, action } from 'mobx';
import { DATA_LAYER_MAP, TOP_VIEW_DISABLED_LAYERS } from 'src/config/DataLayerConfig';
import DataLayerStore from './DataLayerStore';
import { getEditLayerDisabled, getLayerEditAble } from 'src/utils/permissionCtrl';

configure({ enforceActions: 'always' });
class RightMenuStore {
    features;
    cloneFeatures;
    @observable visible;
    @observable option;
    @observable menus;
    @observable zIndex;
    @observable isCurrentLayer;

    //清除上一次选中要素
    @action clearFeatures = () => {
        this.features = null;
    };

    @action show = (features, option, zIndex, isCurrentLayer, event) => {
        this.zIndex = zIndex || 'auto'; //让右键弹窗隐藏起来
        this.isCurrentLayer = isCurrentLayer; //当前选中要素和当前编辑图层是否一致
        this.features = features;
        this.cloneFeatures = JSON.parse(JSON.stringify(this.features));
        this.option = option;
        features.length > 0 && this.fetchMenus(event);
        if (this.menus.length !== 0) {
            // 菜单栏无内容时不显示
            this.visible = true;
        }
    };

    @action hide = () => {
        this.visible = false;
    };

    @action fetchMenus = event => {
        this.menus = [];
        let layerName = this.features[0].layerName;
        // 判断图层是否可用设置为编辑图层
        if (getEditLayerDisabled(layerName)) return;

        const featuresL = this.features.length;
        if (featuresL == 1) {
            // 俯视图模式禁用立面图层 ‘设置为可编辑图层’ 按钮
            if (!DataLayerStore.isTopView || !TOP_VIEW_DISABLED_LAYERS.includes(layerName)) {
                this.menus = ['setEditLayer'];
            }
        }
        // 非当前编辑图层要素不显示操作列表
        if (!this.isCurrentLayer && this.zIndex !== -1) {
            return;
        }
        // 为当前编辑图层要素时：
        // 判断图层右键菜单是否可用
        if (!getLayerEditAble(layerName)) {
            this.menus = [];
            return;
        }

        let rightTools = this.getRightTools(layerName, featuresL, event);

        if (this.zIndex !== -1) {
            // 右键菜单显示时
            this.menus = rightTools;
        } else {
            // 右键菜单隐藏时
            this.menus = [...this.menus, ...rightTools];
        }
    };

    //根据选择要素的数量获取右键菜单
    getRightTools = (layerName, featuresL, event) => {
        let rightTools = [];
        switch (featuresL) {
            case 0:
                break;
            case 1:
                rightTools = DATA_LAYER_MAP[layerName].rightTools;
                if (!event) {
                    rightTools = rightTools.flatMap(item => (item === 'forceDelete' ? [] : [item]));
                }
                break;
            case 2:
                //所选要素数量等于2时，隐藏批量线合并
                rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
                rightTools = rightTools.flatMap(item => (item === 'batchMerge' ? [] : [item]));
                break;
            default:
                //所选要素数量大于2时，隐藏合并
                rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
                rightTools = rightTools.flatMap(item => (item === 'merge' ? [] : [item]));
                break;
        }
        return rightTools;
    };

    @action delete = () => {
        this.visible = false;
        return this.features;
    };

    @action getFeatures = () => {
        return this.cloneFeatures;
    };
}

export default new RightMenuStore();
