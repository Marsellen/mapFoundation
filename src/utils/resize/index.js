class Resize {
    constructor() {
        this.currentEle;
        this.resizeCallback;
        this.isStartResize = false;
        this.direction = '';
        this.cursorStyle = '';
        this.addX = 0;
        this.addY = 0;
        this.startX = 0;
        this.startY = 0;
        this.currentHeight = 0;
        this.currentWidth = 0;
        this.currentTop = 0;
        this.currentLeft = 0;
        this.dragX = 0;
        this.dragY = 0;
    }

    // 绝对top
    getElementTop = element => {
        if (!element) return;
        var actTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actTop;
    };

    // 绝对left
    getElementLeft = element => {
        if (!element) return;
        var actLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
            actLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actLeft;
    };

    addResizeEvent = className => {
        this.currentEle = document.querySelector(`.${className}`);
        if (!this.currentEle) return;
        this.currentEle.addEventListener('mouseenter', this.handleMouseEnter);
        this.currentEle.addEventListener('mousedown', this.handleMouseDown);
        this.currentEle.addEventListener('mouseleave', this.handleMouseLeave);
        document.addEventListener('mouseup', this.handleMouseUp);
    };

    getStyle = (x, y) => {
        this.dragX = x || this.dragX;
        this.dragY = y || this.dragY;
        this.currentTop = this.getElementTop(this.currentEle) + this.dragY;
        this.currentLeft = this.getElementLeft(this.currentEle) + this.dragX;
        this.currentHeight = this.currentEle.offsetHeight;
        this.currentWidth = this.currentEle.offsetWidth;
    };

    resetStyle = (addX, addY) => {
        switch (this.direction) {
            case 'left':
                this.currentEle.style.left =
                    this.currentLeft + addX - this.dragX + 'px';
                this.currentEle.style.width = this.currentWidth - addX + 'px';
                break;
            case 'right':
                this.currentEle.style.width = this.currentWidth + addX + 'px';
                break;
            case 'top':
                this.currentEle.style.top =
                    this.currentTop + addY - this.dragY + 'px';
                this.currentEle.style.height = this.currentHeight - addY + 'px';
                break;
            case 'bottom':
                this.currentEle.style.top = this.currentTop - this.dragY + 'px';
                this.currentEle.style.height = this.currentHeight + addY + 'px';
                break;
            default:
                break;
        }
    };

    isInsideBorder = (x, y) => {
        const isL = Math.abs(this.currentLeft - x) <= 4;
        const isR = Math.abs(this.currentLeft + this.currentWidth - x) <= 4;
        const isT = Math.abs(this.currentTop - y) <= 4;
        const isB = Math.abs(this.currentTop + this.currentHeight - y) <= 4;

        if (isL) {
            this.direction = 'left';
            this.cursorStyle = 'e-resize';
            return true;
        }
        if (isR) {
            this.direction = 'right';
            this.cursorStyle = 'e-resize';
            return true;
        }
        if (isT) {
            this.direction = 'top';
            this.cursorStyle = 'n-resize';
            return true;
        }
        if (isB) {
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
        this.currentEle.removeEventListener('mousemove', this.addMouseStyle);
        this.isStartResize = true;
        this.startX = clientX;
        this.startY = clientY;
        this.currentEle.style.userSelect = 'none';
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('select', this.preventSelect);
    };

    handleMouseMove = e => {
        const { clientX, clientY } = e;
        const endX = clientX;
        const endY = clientY;
        this.addX = endX - this.startX;
        this.addY = endY - this.startY;
        this.resetStyle(this.addX, this.addY);
    };

    handleMouseUp = e => {
        e.stopPropagation();
        if (!this.isStartResize) return;
        if (!this.isStartResize) return;
        const { clientX, clientY } = e;
        const endX = clientX;
        const endY = clientY;
        this.addX = endX - this.startX;
        this.addY = endY - this.startY;
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.getStyle();
        this.currentEle.style.userSelect = 'unset';
        this.currentEle.style.cursor = 'unset';
        this.isStartResize = false;
        this.currentEle.addEventListener('mousemove', this.addMouseStyle);

        this.resizeCallback &&
            this.resizeCallback({
                height: this.currentHeight
            });
    };

    handleMouseLeave = e => {
        e.stopPropagation();
        if (!this.isStartResize) {
            this.currentEle.removeEventListener(
                'mousemove',
                this.addMouseStyle
            );
        }
    };

    registerCallback = callback => {
        this.resizeCallback = callback;
    };
}

export default Resize;
