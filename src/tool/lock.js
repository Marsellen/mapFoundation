class Lock {
    constructor() {
        this.isLock = false;
        this.consumer = null;
    }

    lock(consumer) {
        this.isLock = true;
        this.consumer = consumer;
    }

    unlock() {
        this.isLock = false;
        this.consumer = null;
    }
}

export default Lock;
