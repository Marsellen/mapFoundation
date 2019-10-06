import { observable, flow, configure, action } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';
import OperateFactory from 'src/utils/OperateFactory';

configure({ enforceActions: 'always' });
class OperateHistoryStore {
    @observable currentNode = -1;
    @observable savedNode = -1;
    @observable finalNode = -1;
    @observable nodes = [];
    historyStore = new IndexedDB(
        'adEditor',
        'operateHistories',
        (request, event) => {
            let db = request.result;
            if (event.oldVersion < 1) {
                db.createObjectStore('operateHistories', {
                    keyPath: 'id',
                    autoIncrement: true
                });
            }
        }
    );

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
            if (this.currentNode < this.finalNode) {
                this.historyStore.deleteByRange(
                    this.currentNode,
                    this.finalNode
                );
            }
            let result = yield this.historyStore.add(history);
            this.currentNode = result;
            this.finalNode = result;
            console.log('currentNode:', this.currentNode);
            yield this.init();
        } catch (e) {
            console.log(e);
        }
    });

    redo = flow(function*() {
        try {
            let nextNode = yield this.historyStore.getNext(this.currentNode);
            OperateFactory.redo(nextNode);
            this.currentNode = nextNode.id;
            return nextNode;
        } catch (e) {
            console.log(e);
        }
    });

    undo = flow(function*() {
        try {
            let preNode = yield this.historyStore.getPrev(this.currentNode);
            let currentNode = yield this.historyStore.get(this.currentNode);
            OperateFactory.undo(currentNode);
            this.currentNode = preNode ? preNode.id : -1;
            return currentNode;
        } catch (e) {
            console.log(e);
        }
    });

    @action save = () => {
        this.savedNode = this.currentNode;
    };

    destroy = flow(function*() {
        try {
            yield this.historyStore.clear();
            this.nodes = [];
            this.currentNode = -1;
            this.savedNode = -1;
            this.finalNode = -1;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new OperateHistoryStore();
