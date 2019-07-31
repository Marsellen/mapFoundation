class newRelCtrl {
    constructor(callback) {
        this.step = 0;
        this.obj = null;
        this.relObj = null;
        this.ready = false;
        this.callback = callback;
    }

    next = () => {
        this.step++;
        this.ready = false;
    };

    setObj = data => {
        this.obj = data;
        this.ready = true;
    };

    setRelObj = data => {
        this.relObj = data;
        this.ready = true;
    };

    finish = () => {
        this.callback(this.obj, this.relObj);
    };
}

export default newRelCtrl;
