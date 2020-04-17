import IndexedDB from 'src/utils/IndexedDB';

class Attr {
    constructor() {
        this.store = new IndexedDB('attributes', 'attr', (request, event) => {
            let db = request.result;
            let objectStore = db.createObjectStore('attr', {
                keyPath: 'id',
                autoIncrement: true
            });
            objectStore.createIndex('SPEC_KEY', ['spec', 'key'], {
                unique: false
            });
            objectStore.createIndex('SOURCE_ID', ['source', 'sourceId'], {
                unique: false
            });
        });
    }
}

export default new Attr();
