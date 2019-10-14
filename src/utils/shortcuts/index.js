export default class Shortcut {
    constructor(shortcutMap) {
        this.shortcutMap = shortcutMap;
        this.add();
    }
    add() {
        document.addEventListener('keydown', event => {
            this.shortcutMap.forEach(item => {
                const { id, ctrl, alt, shift, keyCode, callback } = item;
                const {
                    altKey: eAltKey,
                    ctrlKey: eCtrlKey,
                    shiftKey: eShiftKey,
                    keyCode: eKeyCode
                } = event;
                if (
                    alt === eAltKey &&
                    ctrl === eCtrlKey &&
                    shift === eShiftKey &&
                    keyCode === eKeyCode
                ) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (id) {
                        const btn = document.getElementById(id);
                        const btnClassName = btn && btn.className;
                        const isDisabled = btnClassName
                            ? btnClassName.includes('disabled')
                            : false;
                        if (btn && !isDisabled) {
                            btn.click();
                        }
                    }
                    callback && callback();
                    return false;
                }
            });
        });
    }
}
