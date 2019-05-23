class IndexedDB {
    constructor(dbName, tableName, onupgradeneeded) {
        this.dbName = dbName;
        this.tableName = tableName;
        this.onupgradeneeded = onupgradeneeded;
    }

    open = () => {
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open(this.dbName);
            request.onupgradeneeded = event => {
                var db = request.result;
                this.onupgradeneeded(db);
            };
            request.onsuccess = event => {
                let db = request.result;

                let transaction = db.transaction([this.tableName], 'readwrite');

                let objectStore = transaction.objectStore(this.tableName);

                resolve(objectStore, event);
            };

            request.onerror = reject;
        });
    };

    get = (condition, indexName) => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                if (indexName) objectStore = objectStore.index(indexName);
                let request = objectStore.get(condition);

                request.onsuccess = event => {
                    resolve(request.result, event);
                };

                request.onerror = reject;
            }, reject);
        });
    };

    getAll = (condition, indexName) => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                if (indexName) objectStore = objectStore.index(indexName);
                let request = objectStore.getAll(condition);

                request.onsuccess = event => {
                    resolve(request.result);
                };

                request.onerror = reject;
            }, reject);
        });
    };

    add = record => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let request = objectStore.add(record);

                request.onsuccess = event => {
                    resolve(request.result, event);
                };

                request.onerror = reject;
            }, reject);
        });
    };

    edit = record => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let requestUpdate = objectStore.put(record);
                requestUpdate.onsuccess = resolve;
                requestUpdate.onerror = reject;
            }, reject);
        });
    };
}

export default IndexedDB;
