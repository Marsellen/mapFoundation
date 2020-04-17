import IndexedDB from 'src/utils/IndexedDB';

class editLog {
    constructor() {
        this.store = new IndexedDB('editLogs', 'editLogs', (request, event) => {
            let db = request.result;
            db.createObjectStore('editLogs', {
                keyPath: 'id',
                autoIncrement: true
            });
        });
    }

    add(log) {
        log.time = moment().format('YYYY-MM-DD HH:mm:ss');
        this.store.add(log);
    }
}

export default new editLog();
