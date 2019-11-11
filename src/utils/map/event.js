import { addClass, removeClass } from '../utils';
import { message } from 'antd';
import editLog from 'src/models/editLog';

const mapEventManager = () => {
    return window.map.getEventManager();
};

const addEditorListener = (eventType, className) => {
    let viz = document.querySelector('#viz');
    mapEventManager().register(eventType, e => {
        addClass(viz, className);
    });
};

const pointsTooCloseListener = () => {
    mapEventManager().register('editor_event_points_tooclose', e => {
        message.warn('形状点距离过近', 3);
    });
};

const addEditorExitListener = (eventType, className) => {
    let viz = document.querySelector('#viz');
    mapEventManager().register(eventType, e => {
        removeClass(viz, className);
    });
};

const mapErrorListener = () => {
    mapEventManager().register('webglcontextlost', e => {
        let log = {
            action: 'webglcontextlost',
            result: 'fail'
        };
        editLog.store.add(log);
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
    mapErrorListener();
};

export { installMapListener };
