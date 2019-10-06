import { flow, configure } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class AttrStore {
    attrStore = new IndexedDB('attributes', 'attr', (request, event) => {
        let db = request.result;
        if (event.oldVersion < 1) {
            let objectStore = db.createObjectStore('attr', {
                keyPath: 'id',
                autoIncrement: true
            });
            objectStore.createIndex('SPEC_KEY', ['spec', 'key'], {
                unique: false
            });
        }
        if (event.oldVersion < 2) {
            let objectStore = request.transaction.objectStore('attr');
            objectStore.createIndex('SOURCE_ID', ['source', 'sourceId'], {
                unique: true
            });
        }
    });

    init = flow(function*(url) {
        try {
            this.destroy();
            // console.time('getData');
            let response = yield axios.get(url);
            // console.timeLog('getData');
            // console.time('relDataToTable');
            let records = attrFactory.attrDataToTable(response.data);
            // console.timeLog('relDataToTable');
            // console.time('batch add');
            yield this.attrStore.batchAdd(records);
            // console.timeLog('batch add');
        } catch (e) {
            console.log(e);
        }
    });

    export = flow(function*() {
        try {
            let records = yield this.attrStore.getAll();
            let data = attrFactory.attrTableToData(records);
            return data;
        } catch (e) {
            console.log(e);
        }
    });

    destroy = flow(function*() {
        try {
            yield this.attrStore.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttrStore();
