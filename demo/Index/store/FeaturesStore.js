import { observable, flow, configure } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';

configure({ enforceActions: 'always' });
class FeaturesStore {
    @observable state = 'pending'; // 'pending' / 'done' / 'error'
    @observable features = [];
    featuresStore = new IndexedDB('demo', 'features', db => {
        let objectStore = db.createObjectStore('features', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', { unique: false });
    });

    init = flow(function*() {
        this.state = 'pending';
        try {
            const features = yield this.featuresStore.getAll();
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.features = features;
        } catch (e) {
            console.log(e);
            this.state = 'error';
        }
    });

    add = flow(function*(value) {
        this.state = 'pending';
        try {
            yield this.featuresStore.add(value);
            const features = yield this.featuresStore.getAll();
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.features = features;
        } catch (e) {
            console.log(e);
            this.state = 'error';
        }
    });
}

export default new FeaturesStore();
