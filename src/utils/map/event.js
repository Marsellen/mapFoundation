import { addClass, removeClass } from '../utils';

const addManager = (editor, viz, className) => {
    window.map.getEventManager().register(editor, e => {
        addClass(viz, className);
    });
};

const removeManager = (editor, viz, className) => {
    window.map.getEventManager().register(editor, e => {
        removeClass(viz, className);
    });
};

export default {
    addManager,
    removeManager
};
