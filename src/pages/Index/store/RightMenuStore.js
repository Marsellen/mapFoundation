import { observable, configure, action } from 'mobx';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class RightMenuStore {
    features;
    cloneFeatures;
    @observable visible;
    @observable option;
    @observable menus;
    @observable zIndex;
    @observable isCurrentLayer;

    @action show = (features, option, zIndex, isCurrentLayer) => {
        this.zIndex = zIndex || 'auto'; //让右键弹窗隐藏起来
        this.isCurrentLayer = isCurrentLayer; //当前选中要素和当前编辑图层是否一致
        this.visible = true;
        this.features = features;
        this.cloneFeatures = JSON.parse(JSON.stringify(this.features));
        this.option = option;
        features.length > 0 && this.fetchMenus();
    };

    @action hide = () => {
        this.visible = false;
    };

    @action fetchMenus = () => {
        this.menus = [];
        if (this.features.length == 1) this.menus = ['setEditLayer'];
        if (!this.isCurrentLayer && this.zIndex !== -1) {
            return;
        }
        let layerName = this.features[0].layerName;
        let rightTools;
        if (this.features.length == 1) {
            rightTools = DATA_LAYER_MAP[layerName].rightTools;
        } else {
            rightTools = DATA_LAYER_MAP[layerName].groupRightTools;
        }
        if (this.zIndex !== -1) {
            // 右键菜单显示时
            this.menus = rightTools;
        } else {
            // 右键菜单隐藏时
            this.menus = [...this.menus, ...rightTools];
        }
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
