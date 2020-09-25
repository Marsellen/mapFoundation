import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class LoadingStore {
    @observable globalLoading = false;

    @action setGlobalLoading = status => {
        this.globalLoading = status;
    };
}

export default new LoadingStore();
