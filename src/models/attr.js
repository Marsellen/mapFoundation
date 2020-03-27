import IndexedDB from 'src/utils/IndexedDB';

class Attr {
    constructor() {
        this.store = new IndexedDB(
            'attributes',
            'attr',
            (request, event) => {
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
                    objectStore.createIndex(
                        'SOURCE_ID',
                        ['source', 'sourceId'],
                        {
                            unique: true
                        }
                    );
                }
            },
            2
        );

        this.store.clear();
    }
}

export default new Attr();
