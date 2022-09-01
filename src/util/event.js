const EventEmitter = require('events');

// 扩展预留
class AdEmitter extends EventEmitter {
    constructor(props) {
        super(props);
        // 设置监听器限制，避免内存泄露
        this.setMaxListeners(10);
    }
}

export default new AdEmitter();
