import IndexedDB from 'src/utils/IndexedDB';

class editLog {
    constructor() {
        this.store = new IndexedDB(
            'editLogs',
            'editLogs',
            (request, event) => {
                let db = request.result;
                if (event.oldVersion < 1) {
                    db.createObjectStore('editLogs', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }
            },
            1
        );

        this.store.clear();
    }

    add(log) {
        log.time = moment().format('YYYY-MM-DD HH:mm:ss');
        this.store.add(log);
    }
}

export default new editLog();
