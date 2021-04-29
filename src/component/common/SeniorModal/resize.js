const DEFAULT_OPTIONS = {
    minHeight: 220,
    minWidth: 500,
    HResizeable: true,
    VResizeable: true
};

class Resize {
    constructor(options = {}) {
        this.currentEle;
        this.isStartResize = false;
        this.direction = '';
        this.cursorStyle = '';
        this.resizeCallBack;
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    }

    addResizeEvent = className => {
        this.currentEle = document.getElementsByClassName(className)[0];
        if (!this.currentEle) return;
        this.currentEle.addEventListener('mouseenter', this.handleMouseEnter);
        this.currentEle.addEventListener('mousedown', this.handleMouseDown);
        this.currentEle.addEventListener('mouseleave', this.handleMouseLeave);
        document.addEventListener('mouseup', this.handleMouseUp);
    };

    resetStyle = (addX, addY) => {
        let style = window.getComputedStyle(this.currentEle);
        let { width, height, top, left } = style;
        width = parseInt(width);
        height = parseInt(height);
        top = parseInt(top);
        left = parseInt(left);
        let { minWidth, minHeight } = this.options;
        switch (this.direction) {
            case 'left':
                width = width - addX;
                if (width > minWidth) {
                    this.currentEle.style.left = left + addX + 'px';
                    this.currentEle.style.width = width + 'px';
                    this.currentEle.style.height = height + 'px';
                }
                break;
            case 'right':
                width = width + addX;
                if (width > minWidth) {
                    this.currentEle.style.width = width + 'px';
                    this.currentEle.style.height = height + 'px';
                }
                break;
            case 'top':
                height = height - addY;
                if (height > minHeight) {
                    this.currentEle.style.top = top + addY + 'px';
                    this.currentEle.style.height = height + 'px';
                }
                break;
            case 'bottom':
                height = height + addY;
                if (height > minHeight) {
                    this.currentEle.style.top = top + 'px';
                    this.currentEle.style.height = height + 'px';
                }
                break;
            default:
                break;
        }
        typeof this.resizeCallBack == 'function' &&
            this.resizeCallBack({ width, height, top, left });
    };

    isInsideBorder = (x, y) => {
        let style = window.getComputedStyle(this.currentEle);
        let { width, height, top, left } = style;
        let { HResizeable, VResizeable } = this.options;
        const isL = Math.abs(parseInt(left) - x) <= 2;
        const isR = Math.abs(parseInt(left) + parseInt(width) - x) <= 2;
        const isT = Math.abs(parseInt(top) - y) <= 2;
        const isB = Math.abs(parseInt(top) + parseInt(height) - y) <= 2;

        if (isL && HResizeable) {
            this.direction = 'left';
            this.cursorStyle = 'e-resize';
            return true;
        }
        if (isR && HResizeable) {
            this.direction = 'right';
            this.cursorStyle = 'e-resize';
            return true;
        }
        if (isT && VResizeable) {
            this.direction = 'top';
            this.cursorStyle = 'n-resize';
            return true;
        }
        if (isB && VResizeable) {
            this.direction = 'bottom';
            this.cursorStyle = 'n-resize';
            return true;
        }

        return false;
    };

    addMouseStyle = e => {
        const { clientX, clientY } = e;
        const isInsideBorder = this.isInsideBorder(clientX, clientY);
        if (isInsideBorder) {
            this.currentEle.style.cursor = this.cursorStyle;
        } else {
            this.currentEle.style.cursor = 'unset';
        }
    };

    handleMouseEnter = e => {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isStartResize) {
            this.currentEle.addEventListener('mousemove', this.addMouseStyle);
        }
    };

    handleMouseDown = e => {
        const { clientX, clientY } = e;
        const isInsideBorder = this.isInsideBorder(clientX, clientY);
        if (!isInsideBorder) return;
        this.getPosition(e);
        this.currentEle.removeEventListener('mousemove', this.addMouseStyle);
        this.isStartResize = true;
        this.currentEle.style.userSelect = 'none';
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('select', this.preventSelect);
    };

    handleMouseMove = e => {
        if (this.isEventPositionOuter(e)) {
            this.handleMouseUp(e);
            return;
        }
        this.getPosition(e);
        this.resetStyle(this.diffX, this.diffY);
    };

    handleMouseUp = e => {
        //e.stopPropagation();
        if (!this.isStartResize) return;
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.currentEle.style.userSelect = 'unset';
        this.currentEle.style.cursor = 'unset';
        this.isStartResize = false;
        this.currentEle.addEventListener('mousemove', this.addMouseStyle);
    };

    handleMouseLeave = e => {
        e.stopPropagation();
        if (!this.isStartResize) {
            this.currentEle.removeEventListener('mousemove', this.addMouseStyle);
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

    isEventPositionOuter(e) {
        const { clientY } = e;
        if (clientY < 0) {
            return true;
        }
    }

    registerCallback(resizeCallBack) {
        this.resizeCallBack = resizeCallBack;
    }
}

export default Resize;
