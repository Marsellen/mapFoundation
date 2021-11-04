import { observable, flow, configure, action } from 'mobx';
import operateHistory from 'src/util/operateHistory';
import OperateFactory from 'src/util/operateFactory';

configure({ enforceActions: 'always' });
class OperateHistoryStore {
    @observable currentNode = -1;
    @observable savedNode = -1;
    @observable finalNode = -1;
    @observable couldSave = false;
    @observable autoSavedNode = -1;
    @observable pendding = false;

    init = flow(function* () {
        try {
            yield operateHistory.store.getAll();
        } catch (e) {
            console.log(e);
        }
    });

    add = flow(function* (history) {
        try {
            if (this.currentNode < this.finalNode) {
                operateHistory.store.deleteByRange(this.currentNode, this.finalNode);
            }
            let result = yield operateHistory.store.add(history);
            this.currentNode = result;
            this.finalNode = result;
            this.couldSave = true;
            console.log('currentNode:', this.currentNode);
            yield this.init();
        } catch (e) {
            console.log(e);
        }
    });

    redo = flow(function* () {
        try {
            let nextNode = yield operateHistory.store.getNext(this.currentNode);
            yield OperateFactory.redo(nextNode);
            this.currentNode = nextNode.id;
            this.couldSave = true;
            return nextNode;
        } catch (e) {
            console.log(e);
        }
    });

    undo = flow(function* () {
        try {
            let preNode = yield operateHistory.store.getPrev(this.currentNode);
            let currentNode = yield operateHistory.store.get(this.currentNode);
            yield OperateFactory.undo(currentNode);
            this.currentNode = preNode ? preNode.id : -1;
            this.couldSave = true;
            return currentNode;
        } catch (e) {
            console.log(e);
        }
    });

    @action doning = () => {
        this.pendding = true;
    };

    @action done = () => {
        this.pendding = false;
    };

    @action save = () => {
        this.savedNode = this.currentNode;
        this.couldSave = false;
    };

    @action autoSave = () => {
        this.autoSavedNode = this.currentNode;
        this.couldSave = false;
    };

    destroy = flow(function* () {
        try {
            yield operateHistory.store.clear();
            this.currentNode = -1;
            this.savedNode = -1;
            this.finalNode = -1;
            this.couldSave = false;
            this.autoSavedNode = -1;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new OperateHistoryStore();
