import IndexedDB from 'src/utils/IndexedDB';

class Relevance {
    constructor() {
        this.store = new IndexedDB(
            'relationships',
            'rels',
            (request, event) => {
                let db = request.result;
                if (event.oldVersion < 1) {
                    let objectStore = db.createObjectStore('rels', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    objectStore.createIndex(
                        'OBJ_TYPE_KEYS',
                        ['objType', 'objId'],
                        {
                            unique: false
                        }
                    );
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
            },
            2
        );
    }
}

export default new Relevance();
