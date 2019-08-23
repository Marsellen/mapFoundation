import { observable, configure, action } from 'mobx';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class RightMenuStore {
    features;
    cloneFeatures;
    @observable visible;
    @observable option;
    @observable menus;

    @action show = (features, option) => {
        this.visible = true;
        this.features = features;
        this.cloneFeatures = JSON.parse(JSON.stringify(this.features));
        this.option = option;
        this.fetchMenus();
    };

    @action hide = () => {
        this.visible = false;
    };

    @action fetchMenus = () => {
        if (this.features.length == 1) {
            this.menus = DATA_LAYER_MAP[this.option.layerName].rightTools;
        } else {
            let menus = DATA_LAYER_MAP[this.option.layerName].groupRightTools;
            if (menus) {
                this.menus = menus;
            } else {
                this.visible = false;
            }
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
