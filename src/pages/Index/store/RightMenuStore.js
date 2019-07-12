import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class RightMenuStore {
    feature;
    cloneFeature;
    @observable visible;
    @observable option;

    @action show = (feature, option) => {
        this.visible = true;
        this.feature = feature;
        this.cloneFeature = JSON.parse(JSON.stringify(feature));
        this.option = option;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action delete = () => {
        this.visible = false;
        return this.feature
    };

    @action getFeature = () => {
        return this.cloneFeature;
    };
}

export default new RightMenuStore();
