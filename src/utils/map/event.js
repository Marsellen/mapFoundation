import { addClass, removeClass } from '../utils';

const addManager = (editor, className) => {
    let viz = document.querySelector('#viz');
    window.map.getEventManager().register(editor, e => {
        addClass(viz, className);
    });
};

const removeManager = (editor, className) => {
    let viz = document.querySelector('#viz');
    window.map.getEventManager().register(editor, e => {
        removeClass(viz, className);
    });
};

const getManager = () => {
    addManager('editor_event_regionselect_start', 'crosshair-viz');
    removeManager('editor_event_regionselect_end', 'crosshair-viz');
    addManager('editor_event_changepoints_start', 'del-viz');
    removeManager('editor_event_changepoints_start', 'del-viz');
    addManager('editor_event_deletepoints_start', 'del-viz');
    removeManager('editor_event_deletepoints_start', 'del-viz');
};

export default {
    addManager,
    removeManager,
    getManager
};
