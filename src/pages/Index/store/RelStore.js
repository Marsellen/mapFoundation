import { flow, configure } from 'mobx';
import IndexedDB from 'src/utils/IndexedDB';
import relFactory from 'src/utils/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    relStore = new IndexedDB('relationships', 'rels', (request, event) => {
        let db = request.result;
        if (event.oldVersion < 1) {
            let objectStore = db.createObjectStore('rels', {
                keyPath: 'id',
                autoIncrement: true
            });
            objectStore.createIndex('OBJ_TYPE_KEYS', ['objType', 'objId'], {
                unique: false
            });
            objectStore.createIndex(
                'REL_OBJ_TYPE_KEYS',
                ['relObjType', 'relObjId'],
                {
                    unique: false
                }
            );
            objectStore.createIndex(
                'REL_KEYS',
                ['objType', 'objId', 'relObjType', 'relObjId'],
                {
                    unique: true
                }
            );
        }
    });

    init = flow(function*(url) {
        try {
            this.destroy();
            // console.time('getData');
            let response = yield axios.get(url);
            // console.timeLog('getData');
            // console.time('relDataToTable');
            let records = relFactory.relDataToTable(response.data);
            // console.timeLog('relDataToTable');
            // console.time('batch add');
            yield this.relStore.batchAdd(records);
            // console.timeLog('batch add');
        } catch (e) {
            console.log(e);
        }
    });

    exportRel = flow(function*() {
        try {
            let records = yield this.relStore.getAll();
            let data = relFactory.relTableToData(records);
            return data;
        } catch (e) {
            console.log(e);
        }
    });

    destroy = flow(function*() {
        try {
            yield this.relStore.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new RelStore();
