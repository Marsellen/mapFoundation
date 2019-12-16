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

const changePointsNode = eventType => {
    mapEventManager().register('editor_event_changepoints_end', e => {
        message.success('修改形状点完成，需检查数据的关联关系正确性', 3);
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
    pointsTooCloseListener();
    changePointsNode();
};

export { installMapListener };
