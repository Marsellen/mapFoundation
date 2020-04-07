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
        (option.layerName || features.length > 0) && this.fetchMenus();
    };

    @action hide = () => {
        this.visible = false;
    };

    @action fetchMenus = () => {
        if (this.features.length == 1) {
            this.menus = this.option.layerName
                ? DATA_LAYER_MAP[this.option.layerName].rightTools
                : DATA_LAYER_MAP[this.features[0].layerName].rightTools;
        } else {
            this.menus = DATA_LAYER_MAP[this.option.layerName].groupRightTools;
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
