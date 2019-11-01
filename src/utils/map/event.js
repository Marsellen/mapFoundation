import { addClass, removeClass } from '../utils';
import { message } from 'antd';

const addEditorListener = (eventType, className) => {
    let viz = document.querySelector('#viz');
    window.map.getEventManager().register(eventType, e => {
        addClass(viz, className);
    });
};

const pointsTooCloseListener = () => {
    window.map.getEventManager().register('editor_event_points_tooclose', e => {
        message.warn('形状点距离过近', 3);
    });
};

const addEditorExitListener = (eventType, className) => {
    let viz = document.querySelector('#viz');
    window.map.getEventManager().register(eventType, e => {
        removeClass(viz, className);
    });
};

const installMapListener = () => {
    addEditorListener('editor_event_regionselect_start', 'crosshair-viz');
    addEditorExitListener('editor_event_regionselect_end', 'crosshair-viz');
    addEditorListener('editor_event_changepoints_start', 'del-viz');
    addEditorExitListener('editor_event_changepoints_end', 'del-viz');
    addEditorListener('editor_event_deletepoints_start', 'del-viz');
    addEditorExitListener('editor_event_deletepoints_start', 'del-viz');
    pointsTooCloseListener();
};

export default {
    addEditorListener,
    addEditorExitListener,
    installMapListener
};
