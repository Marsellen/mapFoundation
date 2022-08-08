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
import InformationStore from 'src/store/home/informationStore';
import SettingStore from 'src/store/setting/settingStore';
import BuriedPoint from 'src/util/buriedPoint';
import { getImgPath } from 'src/util/taskUtils';

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
    const { getReport, setActiveKey, openCheckReport, handleQualityGetMisreport } =
        QualityCheckStore;
    const { activeTaskId, isLocalTask, isEditableTask, isMsTask, isFixStatus } = TaskStore;
    if (!isEditableTask) return; //如果是浏览任务，返回
    if (isLocalTask) return; //如果是本地任务，返回
    if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
    // console.log('0获取检查报表开始：', new Date);
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
    // console.log('0获取检查报表结束：', new Date);
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
        activeTask,
        activeTask: { taskId, processName, postProcess } = {}
    } = TaskStore;
    const { getMarkerList, initMarkerList, showList } = QCMarkerStore;
    if (!window.markerLayer) return; //如果没有质检标注图层，返回
    if (!isEditableTask) return; //如果是浏览任务，返回
    if (isLocalTask) return; //如果是本地任务，返回
    if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
    try {
        let params = {
            taskId,
            processName
        };
        //判断是二次质检任务，或者是二次质检任务打回来的返工返修任务  
        if (processName === 'imp_map_second_check' || postProcess === 2) {
            params = { ...params, qcLink: 3 };
        }
        const res = await getMarkerList(params);
        if (!res) return;
        const { data } = res;
        if (!data) return;
        if (data.length === 0) return;
        const features = data.map(item => {
            const qcPath = getImgPath(activeTask, item?.qcPath);
            item.qcPath = qcPath;
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

//获取资料问题
export const getInformationList = async () => {
    const {
        isMsTask,
        isFixStatus,
        isEditableTask,
        isLocalTask,
        activeTask,
        activeTask: { taskId, processName, postProcess } = {}
    } = TaskStore;
    const { getMarkerList, initMarkerList, showList } = InformationStore;
    if (!window.informationLayer) return;
    if (!isEditableTask) return; //如果是浏览任务，返回
    if (isLocalTask) return; //如果是本地任务，返回
    // if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
    try {
        // let params = {
        //     taskId,
        //     processName
        // };
        //判断是二次质检任务，或者是二次质检任务打回来的返工返修任务
        // if (processName === 'imp_map_second_check' || postProcess === 2) {
        //     params = { ...params, qcLink: 3 };
        // }
        // const res = await getMarkerList(params);
        // if (!res) return;
        // const { data } = res;
        // if (!data) return;
        // if (data.length === 0) return;
        // const features = data.map(item => {
        //     const qcPath = getImgPath(activeTask, item?.qcPath);
        //     item.qcPath = qcPath;
        //     return { geometry: JSON.parse(item.geom), properties: item };
        // });
        // initMarkerList(data);
        // QualityCheckStore.setActiveKey('marker');
        // showList();
        // window.informationLayer.layer.addFeatures(features);
    } catch (e) {
        const msg = e.message || e || '';
        message.error('资料问题获取失败');
        console.log('获取资料问题失败：' + msg);
    }
};

// 设置初始化任务范围
export const setTaskLevel = async () => {
    try {
        // 设置中心点
        const { firstPoint } = VectorsStore;
        if (firstPoint) window.map.setCenter(firstPoint);
        // 设置level
        const level = SettingStore.getConfig('OTHER_CONFIG').needSetDefaultLevel || 13;  // 范围：[0,28]
        window.map.setLevel(level);
    } catch (e) {
        const msg = e.message || e || '';
        message.error('初始化任务范围');
        console.log('初始化任务范围：' + msg);
    }
};

