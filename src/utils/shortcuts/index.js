import { shortcutMap } from 'src/utils/shortcuts/shortcutsMap';

export default class Shortcut {
    constructor() {
        this.preventDefault();
    }

    init() {
        document.addEventListener('keydown', event => {
            //阻止原生事件冒泡
            event.stopPropagation();
            //如果target是react组件，则阻止事件冒泡
            event.nativeEvent && event.nativeEvent.stopImmediatePropagation();
            shortcutMap.forEach(this.getEventCallBack(event));
        });
    }

    add(event, shortcutMapParams) {
        if (!event || !shortcutMapParams) return false;
        shortcutMapParams.forEach(this.getEventCallBack(event));
    }

    getEventCallBack = event => {
        const { altKey: eAltKey, ctrlKey: eCtrlKey, keyCode: eKeyCode } = event;
        return item => {
            const { id, ctrl, alt, keyCode, callback } = item;
            if (alt === eAltKey && ctrl === eCtrlKey && keyCode === eKeyCode) {
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
        };
    };

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
