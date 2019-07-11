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

    @action delete = callback => {
        this.visible = false;
        callback(this.feature);
    };

    @action getFeature = () => {
        return this.cloneFeature;
    };
}

export default new RightMenuStore();
