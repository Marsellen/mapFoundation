import { flow, configure } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';

configure({ enforceActions: 'always' });
class EditLogStore {
    logStore = new IndexedDB('editLogs', 'editLogs', (request, event) => {
        let db = request.result;
        if (event.oldVersion < 2) {
            db.createObjectStore('editLogs', {
                keyPath: 'id',
                autoIncrement: true
            });
        }
    });

    add = flow(function*(log) {
        try {
            yield this.logStore.add(log);
        } catch (e) {
            console.log(e);
        }
    });

    destroy = flow(function*() {
        try {
            yield this.logStore.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new EditLogStore();
