import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class PointCloudStore {
    @observable maxHeightRange = [0, 100];
    @observable viewedHeightRange;

    @action initHeightRange = range => {
        this.viewedHeightRange = this.maxHeightRange = range.map(item =>
            Number(item.toFixed(2))
        );
    };

    @action setViewedHeightRange = range => {
        this.viewedHeightRange = range;
    };
}

export default new PointCloudStore();
