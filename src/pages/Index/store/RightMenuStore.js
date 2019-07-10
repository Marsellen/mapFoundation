import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class RightMenuStore {
    feature;
    @observable visible;
    @observable option;

    @action show = (feature, option) => {
        this.visible = true;
        this.feature = feature;
        this.option = option;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action delete = callback => {
        this.visible = false;
        callback(this.feature);
    };
}

export default new RightMenuStore();
