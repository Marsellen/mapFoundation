import IndexedDB from 'src/util/indexedDB';

class operateHistory {
    constructor() {
        this.store = new IndexedDB('adEditor', 'operateHistories', (request, event) => {
            let db = request.result;
            db.createObjectStore('operateHistories', {
                keyPath: 'id',
                autoIncrement: true
            });
        });
    }
}

export default new operateHistory();
