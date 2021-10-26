import { SHORTCUT_KEYS } from 'src/config/shortcutKeyConfig';
import { bufferLink } from 'src/tool/utils';

const invalidElements = ['INPUT', 'TEXTAREA'];

class ShortcutKey {
    constructor() {
        this.keyCode = null;
        this.preventDefault();
    }

    init() {
        document.addEventListener('keydown', event => {
            const { nodeName } = event.target;
            const targetIsInput = invalidElements.includes(nodeName);
            if (targetIsInput) return;
            SHORTCUT_KEYS.forEach(this.getEventCallBack(event));
        });
    }

    add(event, shortcutKeys) {
        if (!event || !shortcutKeys) return false;
        shortcutKeys.forEach(this.getEventCallBack(event));
    }

    getEventCallBack = event => {
        const { altKey: eAltKey, ctrlKey: eCtrlKey, keyCode: eKeyCode } = event;
        return item => {
            const { id, ctrl, alt, keyCode, callback, isBufferLink } = item;
            if (alt === eAltKey && ctrl === eCtrlKey && keyCode === eKeyCode) {
                event.preventDefault();
                event.stopPropagation();

                if (id) {
                    const btn = document.getElementById(id);
                    const btnClassName = btn && btn.className;
                    const isDisabled = btnClassName ? btnClassName.includes('disabled') : false;
                    if (btn && !isDisabled) {
                        this.keyCode = keyCode;
                        btn.click();
                        this.keyCode = null;
                    }
                }
                callback && callback();
                isBufferLink && bufferLink();
                return false;
            }
        };
    };

    preventDefault() {
        document.addEventListener('keydown', event => {
            SHORTCUT_KEYS.forEach(item => {
                const { ctrl, alt, shift, keyCode, preventDefault } = item;
                const {
                    altKey: eAltKey,
                    ctrlKey: eCtrlKey,
                    shiftKey: eShiftKey,
                    keyCode: eKeyCode
                } = event;
                if (
                    preventDefault &&
                    alt === eAltKey &&
                    ctrl === eCtrlKey &&
                    shift === eShiftKey &&
                    keyCode === eKeyCode
                ) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            });
        });
    }
}

export default new ShortcutKey();
