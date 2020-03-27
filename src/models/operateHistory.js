import IndexedDB from 'src/utils/IndexedDB';

class operateHistory {
    constructor() {
        this.store = new IndexedDB(
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
            },
            2
        );

        this.store.clear();
    }
}

export default new operateHistory();
