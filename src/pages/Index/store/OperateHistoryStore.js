import { observable, flow, configure } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';

configure({ enforceActions: 'always' });
class OperateHistoryStore {
    @observable currentNode;
    @observable savedNode;
    @observable nodes = [];
    historyStore = new IndexedDB('adEditor', 'operateHistories', db => {
        db.createObjectStore('operateHistories', {
            keyPath: 'id',
            autoIncrement: true
        });
    });

    init = flow(function*() {
        try {
            const nodes = yield this.historyStore.getAll();
            // 异步代码块会被自动包装成动作并修改状态
            this.nodes = nodes;
        } catch (e) {
            console.log(e);
        }
    });

    add = flow(function*(history) {
        try {
            let result = yield this.historyStore.add(history);
            this.currentNode = result;
            console.log('currentNode:', this.currentNode);
            yield this.init();
        } catch (e) {
            console.log(e);
        }
    });

    redo = flow(function*(callback) {
        try {
            let preNode = yield this.historyStore.getPrev(this.currentNode);
            callback(preNode);
            this.currentNode = preNode.id;
        } catch (e) {
            console.log(e);
        }
    });

    undo = flow(function*(callback) {
        try {
            let nextNode = yield this.historyStore.getNext(this.currentNode);
            callback(nextNode);
            this.currentNode = nextNode.id;
        } catch (e) {
            console.log(e);
        }
    });

    save = flow(function*() {
        this.savedNode = this.currentNode;
    });

    destory = flow(function*() {
        try {
            yield this.historyStore.clear();
            this.nodes = [];
        } catch (e) {
            console.log(e);
        }
    });
}

export default new OperateHistoryStore();
