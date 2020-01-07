import { addClass, removeClass } from '../utils';
import { message } from 'antd';

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

const movePointTooCloseListener = () => {
    mapEventManager().register('editor_event_movepoint_tooclose', e => {
        message.warning('与原始点位距离过近，请重新选点', 3);
    });
};

const movePointTooFarListener = () => {
    mapEventManager().register('editor_event_movepoint_toofar', e => {
        message.warning('与原始点位距离过远，请重新选点', 3);
    });
};

const addEditorExitListener = (eventType, className) => {
    let viz = document.querySelector('#viz');
    mapEventManager().register(eventType, e => {
        removeClass(viz, className);
    });
};

const installMapListener = () => {
    addEditorListener('editor_event_regionselect_start', 'crosshair-viz');
    addEditorExitListener('editor_event_regionselect_end', 'crosshair-viz');
    addEditorListener(
        'editor_event_changepoints_node_picked',
        'move-point-viz'
    );
    addEditorExitListener(
        'editor_event_changepoints_node_release',
        'move-point-viz'
    );
    addEditorListener('editor_event_deletepoints_start', 'move-point-viz');
    addEditorExitListener('editor_event_deletepoints_start', 'move-point-viz');
    addEditorListener('editor_event_movefeature_start', 'crosshair-viz');
    addEditorExitListener('editor_event_movefeature_end', 'crosshair-viz');
    addEditorListener('editor_event_selectpointfrompc_end', 'crosshair-viz');
    addEditorExitListener(
        'editor_event_selectpointfrompc_end',
        'crosshair-viz'
    );
    pointsTooCloseListener();
    movePointTooCloseListener();
    movePointTooFarListener();
};

export { installMapListener };
