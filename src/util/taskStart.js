import { message } from 'antd';
import { RESOURCE_LAYER_BOUNDARY } from 'src/config/dataLayerConfig';
import appStore from 'src/store/common/appStore';
import QualityCheckStore from 'src/store/home/qualityCheckStore';
import RenderModeStore from 'src/store/home/renderModeStore';
import TextStore from 'src/store/home/textStore';
import DefineModeStore from 'src/store/home/defineModeStore';
import DataLayerStore from 'src/store/home/dataLayerStore';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import VectorsStore from 'src/store/home/vectorsStore';
import TaskStore from 'src/store/home/taskStore';
import QCMarkerStore from 'src/store/home/qcMarkerStore';
import BuriedPoint from 'src/util/buriedPoint';

//不同模式下，处理底图数据
const handleBoundaryfeature = () => {
    switch (RenderModeStore.activeMode) {
        case 'common':
        case 'check':
        case 'define':
        case 'selfCheck':
            //按符号设置，更新后加载的周边底图
            DefineModeStore.updateBoundaryVectorStyle();
            break;
        case 'relation':
            //将重置专题图
            RenderModeStore.resetSelectOption();
            //白色渲染模式/要素都是白色
            DefineModeStore.updateBoundaryVectorStyle();
            //将有关联关系的要素，按专题图进行分组
            RenderModeStore.setRels();
            break;
        default:
            break;
    }
    //将后加载的周边底图按当前注记配置渲染
    TextStore.resetBoundaryTextStyle();
};

export const initBoundary = async () => {
    try {
        BuriedPoint.dataLoadBuriedPointStart('boundary_load', 'task_start');
        window.boundaryLayerGroup = await TaskStore.getBoundaryLayer();
        if (!window.boundaryLayerGroup) return;
        DataLayerStore.addTargetLayers(window.boundaryLayerGroup.layers);
        ResourceLayerStore.updateLayerByName(RESOURCE_LAYER_BOUNDARY, window.boundaryLayerGroup);
        VectorsStore.addBoundaryLayer(window.boundaryLayerGroup);
        handleBoundaryfeature();
        BuriedPoint.dataLoadBuriedPointEnd('boundary_load', 'success');
    } catch (e) {
        message.warning('当前任务没有周边底图数据');
        console.error(`周边底图数据加载失败: ${e.message || e}`);
        BuriedPoint.dataLoadBuriedPointEnd('boundary_load', 'error');
    }
};

export const getCheckReport = async () => {
    const {
        getReport,
        setActiveKey,
        openCheckReport,
        handleQualityGetMisreport
    } = QualityCheckStore;
    const { activeTaskId, isLocalTask, isEditableTask, isMsTask, isFixStatus } = TaskStore;
    if (!isEditableTask) return; //如果是浏览任务，返回
    if (isLocalTask) return; //如果是本地任务，返回
    if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
    switch (appStore?.loginUser?.roleCode) {
        case 'producer':
            await getReport({
                task_id: activeTaskId,
                isEdit: 1
            });
            break;
        case 'quality':
            await handleQualityGetMisreport({
                taskId: activeTaskId,
                status: '1,2,4'
            });
            break;
        default:
            break;
    }
    if (QualityCheckStore.reportListL === 0) return;
    setActiveKey('check');
    openCheckReport();
};

//获取质检标注
export const getMarkerList = async () => {
    const {
        isMsTask,
        isFixStatus,
        isEditableTask,
        isLocalTask,
        activeTask: { taskId, processName } = {}
    } = TaskStore;
    const { getMarkerList, initMarkerList, showList } = QCMarkerStore;
    if (!window.markerLayer) return; //如果没有质检标注图层，返回
    if (!isEditableTask) return; //如果是浏览任务，返回
    if (isLocalTask) return; //如果是本地任务，返回
    if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
    try {
        const res = await getMarkerList({ taskId, processName });
        if (!res) return;
        const { data } = res;
        if (!data) return;
        if (data.length === 0) return;
        const features = data.map(item => {
            return { geometry: JSON.parse(item.geom), properties: item };
        });
        initMarkerList(data);
        QualityCheckStore.setActiveKey('marker');
        showList();
        window.markerLayer.layer.addFeatures(features);
    } catch (e) {
        const msg = e.message || e || '';
        message.error('质检标注获取失败');
        console.log('获取质检列表失败：' + msg);
    }
};
