class Drag {
    constructor() {
        this.titleDom;
        this.containerDom;
        this.moving = false;
        this.diffX = 0;
        this.diffY = 0;
        this.mouseX;
        this.mouseY;
    }

    installListener(title, container) {
        this.titleDom = document.getElementsByClassName(title)[0];
        this.containerDom = document.getElementsByClassName(container)[0];
        if (!this.titleDom) return;
        this.titleDom.addEventListener('mousedown', this.handleMouseDown);
    }

    handleMouseDown = e => {
        this.getPosition(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        this.moving = true;
        this.titleDom.style.cursor = 'move';
    };

    onMouseUp = e => {
        this.moving = false;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.titleDom.style.cursor = 'unset';
    };

    // 鼠标移动重新设置modal的位置
    onMouseMove = e => {
        if (this.moving) {
            // 获取鼠标位置数据
            this.getPosition(e);
            // 计算modal应该随鼠标移动到的坐标
            let style = window.getComputedStyle(this.containerDom);
            let { width, height, top, left } = style;
            const { innerWidth, innerHeight } = window;
            width = parseInt(width);
            height = parseInt(height);
            top = Math.min(Math.max(0, parseInt(top) + this.diffY), innerHeight - height / 2);
            left = Math.min(
                Math.max(parseInt(left) + this.diffX, 0 - width / 2),
                innerWidth - width / 2
            );
            this.containerDom.style.top = `${top}px`;
            this.containerDom.style.left = `${left}px`;
            this.containerDom.style.width = `${width}px`;
            this.containerDom.style.height = `${height}px`;

            typeof this.resizeCallBack == 'function' &&
                this.resizeCallBack({ width, height, top, left });
        }
    };

    getPosition(e) {
        // 鼠标点击的坐标(页面)
        let mouseX = e.screenX;
        let mouseY = e.screenY;
        if (this.mouseX) {
            this.diffX = mouseX - this.mouseX;
        }
        if (this.mouseY) {
            this.diffY = mouseY - this.mouseY;
        }
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    registerCallback(resizeCallBack) {
        this.resizeCallBack = resizeCallBack;
    }
}

export default Drag;
