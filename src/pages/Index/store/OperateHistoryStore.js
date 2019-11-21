import { observable, flow, configure, action } from 'mobx';
import operateHistory from 'src/models/operateHistory';
import OperateFactory from 'src/utils/OperateFactory';

configure({ enforceActions: 'always' });
class OperateHistoryStore {
    @observable currentNode = -1;
    @observable savedNode = -1;
    @observable finalNode = -1;
    @observable nodes = [];

    init = flow(function*() {
        try {
            const nodes = yield operateHistory.store.getAll();
            // 异步代码块会被自动包装成动作并修改状态
            this.nodes = nodes;
        } catch (e) {
            console.log(e);
        }
    });

    add = flow(function*(history) {
        try {
            if (this.currentNode < this.finalNode) {
                operateHistory.store.deleteByRange(
                    this.currentNode,
                    this.finalNode
                );
            }
            let result = yield operateHistory.store.add(history);
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
            let nextNode = yield operateHistory.store.getNext(this.currentNode);
            yield OperateFactory.redo(nextNode);
            this.currentNode = nextNode.id;
            return nextNode;
        } catch (e) {
            console.log(e);
        }
    });

    undo = flow(function*() {
        try {
            let preNode = yield operateHistory.store.getPrev(this.currentNode);
            let currentNode = yield operateHistory.store.get(this.currentNode);
            yield OperateFactory.undo(currentNode);
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
            yield operateHistory.store.clear();
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
