class IndexedDB {
    constructor(dbName, tableName, onupgradeneeded, version) {
        this.dbName = dbName;
        this.tableName = tableName;
        this.onupgradeneeded = onupgradeneeded;
        this.version = version || 1;
    }

    _openIndexedDB = dbName => {
        return window.indexedDB.open(dbName, this.version); // 版本号统一管理
    };

    open = () => {
        return new Promise((resolve, reject) => {
            let request = this._openIndexedDB(this.dbName);
            request.onupgradeneeded = event => {
                this.onupgradeneeded(request, event);
            };
            request.onsuccess = event => {
                let db = request.result;

                let transaction = db.transaction([this.tableName], 'readwrite');

                transaction.onabort = error => {
                    console.log(transaction.error.message);
                    reject(transaction.error);
                };

                let objectStore = transaction.objectStore(this.tableName);

                resolve(objectStore, event);
            };

            request.onerror = reject;
        });
    };

    openTransaction = () => {
        return new Promise((resolve, reject) => {
            let request = this._openIndexedDB(this.dbName);
            request.onsuccess = event => {
                let db = request.result;

                let transaction = db.transaction([this.tableName], 'readwrite');

                resolve(transaction, event);
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

    batchAdd = records => {
        return new Promise((resolve, reject) => {
            this.openTransaction().then(transaction => {
                let objectStore = transaction.objectStore(this.tableName);
                let index = 0;
                records.map(record => {
                    objectStore.add(record);
                    index++;
                });

                transaction.onabort = error => {
                    console.warn(transaction.error.message);
                    reject({ message: '创建失败：数据重复' }, index);
                };

                transaction.oncomplete = result => {
                    resolve(result);
                };
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

    getPrev = id => {
        //只适用keyPath为id且id自增长的数据结构
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let keyRange = IDBKeyRange.upperBound(id, true);
                let request = objectStore.openCursor(keyRange, 'prev');
                request.onsuccess = event => {
                    let prev = request.result && request.result.value;
                    resolve(prev, event);
                };
                request.onerror = reject;
            }, reject);
        });
    };

    getNext = id => {
        //只适用keyPath为id且id自增长的数据结构
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let keyRange = IDBKeyRange.lowerBound(id, true);
                let request = objectStore.openCursor(keyRange, 'next');
                request.onsuccess = event => {
                    let next = request.result && request.result.value;
                    resolve(next, event);
                };
                request.onerror = reject;
            }, reject);
        });
    };

    deleteByRange = (start, end) => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let keyRange = IDBKeyRange.bound(start, end, true, false);
                let request = objectStore.delete(keyRange);
                request.onsuccess = event => {
                    resolve(request.result, event);
                };
                request.onerror = reject;
            }, reject);
        });
    };

    deleteById = id => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let request = objectStore.delete(id);
                request.onsuccess = event => {
                    resolve(request.result, event);
                };
                request.onerror = reject;
            }, reject);
        });
    };

    queryByIndex = (store, index, value) => {
        return new Promise((resolve, reject) => {
            let request = store.index(index).getAll(value);
            request.onsuccess = event => {
                resolve(request.result, event);
            };
            request.onerror = reject;
        });
    };

    clear = () => {
        return new Promise((resolve, reject) => {
            this.open().then(objectStore => {
                let request = objectStore.clear();
                request.onsuccess = event => {
                    resolve(request.result, event);
                };
                request.onerror = reject;
            }, reject);
        });
    };
}

export default IndexedDB;

export const deleteDatabase = dbName => {
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
        console.log(`删除失败: ${dbName}不存在`);
    };
    deleteRequest.onsuccess = function (event) {
        console.log(`${dbName}删除成功`);
    };
};
