import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class RenderModeStore {
    @observable activeMode = 'common';

    @action initMode = mode => {
        this.activeMode = mode;
        console.log(this.activeMode);
    };
}

export default new RenderModeStore();
