import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class RightMenuStore {
    @observable visible;
    @observable option;

    @action show = option => {
        this.visible = true;
        this.option = option;
    };

    @action hide = () => {
        this.visible = false;
    };
}

export default new RightMenuStore();
