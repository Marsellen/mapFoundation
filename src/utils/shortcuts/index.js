import { shortcutMap } from 'src/utils/shortcuts/shortcutsMap';

export default class Shortcut {
    constructor() {
        this.preventDefault();
    }

    add(event, shortcutMapParams) {
        if (!event || !shortcutMapParams) return false;
        shortcutMapParams.forEach(item => {
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
    }

    preventDefault() {
        document.addEventListener('keydown', event => {
            shortcutMap.forEach(item => {
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

export const shortcut = new Shortcut();
