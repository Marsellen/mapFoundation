import { observable, configure, action, computed } from 'mobx';

configure({ enforceActions: 'always' });
class DefineModeStore {
    @observable visible = false;

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };
}

export default new DefineModeStore();
