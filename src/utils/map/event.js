import { addClass, removeClass } from '../utils';
import { message } from 'antd';
import RenderModeStore from 'src/pages/Index/store/RenderModeStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
//监听右击事件，当关联关系模式时，右击更新要素样式
const clickright = () => {
    mapEventManager().register('clickright', e => {
        if (!map) return;
        if (!window.currentSelectFeatures) return;
        if (window.currentSelectFeatures.length === 0) return;
        const { activeMode, updateCurrentFeature } = RenderModeStore;
        if (activeMode !== 'relation') return;
        updateCurrentFeature(window.currentSelectFeatures);
    });
};

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


const copyLineListener = () => {
    const { exitEdit } = DataLayerStore
    mapEventManager().register('editor_event_dragcopyedFeature_error', e => {
        exitEdit();
        message.warn('框选时，不能复制线要素', 3);

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

const pointsOutBoundaryListener = () => {
    mapEventManager().register('editor_event_points_out_boundary', e => {
        message.warn('请在任务范围内绘制要素', 3);
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
    addEditorListener('editor_event_movefeature_start', 'edit-viz');
    addEditorExitListener('editor_event_movefeature_end', 'edit-viz');
    addEditorListener('editor_event_selectpointfrompc_end', 'crosshair-viz');
    addEditorExitListener(
        'editor_event_selectpointfrompc_end',
        'crosshair-viz'
    );
    addEditorListener('editor_event_lqdtzx_start', 'move-point-viz');
    addEditorExitListener('editor_event_lqdtzx_end', 'move-point-viz'); //线要素对齐到停止线
    addEditorListener('editor_event_plfcdfzbh_start', 'edit-viz');
    addEditorExitListener('editor_event_plfcdfzbh_end', 'edit-viz'); //批量赋车道分组编号
    pointsTooCloseListener();
    movePointTooCloseListener();
    movePointTooFarListener();
    pointsOutBoundaryListener();
    copyLineListener();
    clickright();
};

export { installMapListener };
