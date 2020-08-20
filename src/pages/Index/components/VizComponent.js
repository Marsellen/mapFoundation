import React from 'react';
import { Map, DynamicPCLayer, LayerGroup, TraceListLayer, VectorLayer } from 'addis-viz-sdk';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import AttributesModal from './AttributesModal';
import QCMarkerModal from './QualityMarker/QCMarkerModal';
//import NewFeatureModal from './NewFeatureModal';
import RightMenuModal from './RightMenuModal';

import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_MULTI_PROJECT
} from 'src/config/DataLayerConfig';
import MultimediaView from './MultimediaView';
import VectorsConfig from 'src/config/VectorsConfig';
import MarkerVectorsConfig from 'src/config/MarkerVectorsConfig';
import 'less/components/viz-component.less';
// import { addClass, removeClass } from '../../../utils/utils';
import BatchAssignModal from './BatchAssignModal';
import { regionCheck, modUpdStatGeometry, checkSdkError } from 'src/utils/vectorUtils';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { shortcut } from 'src/utils/shortcuts';
import { installMapListener } from 'src/utils/map/event';
import _ from 'lodash';
import editLog from 'src/models/editLog';
import { isManbuildTask, statisticsTime, windowObserver } from 'src/utils/taskUtils';
import { editVisiteHistory } from 'src/utils/visiteHistory';
import axios from 'axios';
import { logDecorator } from 'src/utils/decorator';
import RenderModeStore from 'src/pages/Index/store/RenderModeStore';
import ResourceLayerStore from 'src/pages/Index/store/ResourceLayerStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import PictureShowStore from 'src/pages/Index/store/PictureShowStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import AttrRightMenuStore from 'src/pages/Index/store/AttrRightMenuStore';
import NewFeatureStore from 'src/pages/Index/store/NewFeatureStore';
import OperateHistoryStore from 'src/pages/Index/store/OperateHistoryStore';
import RelStore from 'src/pages/Index/store/RelStore';
import AttrStore from 'src/pages/Index/store/AttrStore';
import BatchAssignStore from 'src/pages/Index/store/BatchAssignStore';
import PointCloudStore from 'src/pages/Index/store/PointCloudStore';
import VectorsStore from 'src/pages/Index/store/VectorsStore';
import ToolCtrlStore from 'src/pages/Index/store/ToolCtrlStore';
import QCMarkerStore from 'src/pages/Index/store/QCMarkerStore';
import QualityCheckStore from 'src/pages/Index/store/QualityCheckStore';
import { showPictureShowView, showAttributesModal, showRightMenu } from 'src/utils/map/viewCtrl';
import { TASK_MODE_MAP } from 'src/config/RenderModeConfig';

@inject('QCMarkerStore')
@inject('DefineModeStore')
@inject('TextStore')
@inject('RenderModeStore')
@inject('TaskStore')
@observer
class VizComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { TaskStore } = this.props;
        await TaskStore.initTask({ type: 4 });
        //清除多余任务比例记录
        AdLocalStorage.filterTaskInfosStorage(TaskStore.taskIdList);
        windowObserver();
    };

    componentDidUpdate() {
        this.init();
    }

    init = async () => {
        await this.release();
        const { TaskStore: { activeTaskId } = {} } = this.props;
        if (!activeTaskId) return;
        this.setMode(); //设置渲染模式
        const div = document.getElementById('viz');
        window.map = new Map(div);
        await this.initTask();
        this.renderMode(); //根据渲染模式，初始化注记和符号
    };

    release = async () => {
        await this.cancelRequest();
        await this.clearWorkSpace();

        QCMarkerStore.release();
        ResourceLayerStore.release();
        VectorsStore.release();
        DataLayerStore.setRegionGeojson();
        window.boundaryLayerGroup = null;
        window.pointCloudLayer = null;
        window.vectorLayerGroup = null;
        window.trackLayer = null;

        await RelStore.destroy();
        await AttrStore.destroy();

        window.map && window.map.release();
        window.map = null;
    };

    clearWorkSpace = async () => {
        const { TextStore } = this.props;
        await OperateHistoryStore.destroy();
        await editLog.store.clear();
        if (window.map) {
            DataLayerStore.exitEdit();
            DataLayerStore.activeEditor();
            DataLayerStore.topViewMode(false);
        }
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();
        TextStore.hide();

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
    };

    //取消请求
    cancelRequest = async () => {
        await window.__cancelRequestArr.map(item => {
            return item.cancel();
        });
        window.__cancelRequestArr = [];
    };

    setMode = () => {
        const {
            TaskStore: { taskProcessName },
            RenderModeStore: { setMode }
        } = this.props;
        const mode = TASK_MODE_MAP[taskProcessName] || 'common';
        setMode(mode);
    };

    //不同任务类型采用不同渲染模式
    renderMode = () => {
        const {
            TaskStore: { taskProcessName },
            TextStore: { initTextConfig },
            DefineModeStore: { initVectorConfig }
        } = this.props;
        //获取渲染模式
        const mode = TASK_MODE_MAP[taskProcessName] || 'common';
        //初始化文字注记配置
        initTextConfig(mode, taskProcessName);
        //初始化符号配置
        initVectorConfig(mode);
    };

    addShortcut = event => {
        const callbackShortcutMap = [
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 49,
                callback: () => {
                    event.preventDefault();
                    event.stopPropagation();
                    ResourceLayerStore.pointCloudToggle();
                },
                describe: '开关点云图层 1'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 50,
                callback: () => {
                    event.preventDefault();
                    event.stopPropagation();
                    ResourceLayerStore.switchToggle(RESOURCE_LAYER_VECTOR, true, true);
                    VectorsStore.switchToggle(true, 'vector', true);
                },
                describe: '开关高精地图图层 2'
            },
            {
                ctrl: true,
                alt: false,
                shift: false,
                keyCode: 50,
                callback: () => {
                    event.preventDefault();
                    event.stopPropagation();
                    ResourceLayerStore.switchToggle(RESOURCE_LAYER_BOUNDARY, true, true);
                    VectorsStore.switchToggle(true, 'boundary', true);
                },
                describe: '开关周边底图图层 Ctrl+2'
            },
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 51,
                callback: () => {
                    event.preventDefault();
                    event.stopPropagation();
                    ResourceLayerStore.trackToggle();
                },
                describe: '开关轨迹图层 3'
            }
        ];

        shortcut.add(event, callbackShortcutMap);
    };

    handleKeyDown = event => {
        this.addShortcut(event);
    };

    initTask = async () => {
        console.time('taskLoad');
        const { TaskStore } = this.props;
        const { getTaskInfo, getTaskFile, activeTaskId, tasksPop } = TaskStore;
        if (!activeTaskId) return;
        const key = Math.random();
        message.loading({
            content: '正在加载任务数据...',
            key
        });
        try {
            //获取任务信息 taskinfos.json
            await getTaskInfo();
            //获取任务资料文件路径
            const task = getTaskFile();
            //加载资料
            await Promise.all([this.initEditResource(task), this.initExResource(task)]);
            message.success({
                content: '资料加载完毕',
                duration: 1,
                key
            });
        } catch (e) {
            const currentTaskId = e.message;
            setTimeout(() => {
                message.error({
                    content: currentTaskId + '任务内数据加载失败，请重新开始任务',
                    key
                });
            });

            // 删除本地导入加载失败的任务
            tasksPop(currentTaskId);
            console.log('任务数据加载失败' + currentTaskId || e || '');
            window.map = null;
        }
        console.timeEnd('taskLoad');
    };

    initEditResource = async task => {
        const { TaskStore } = this.props;
        const { isEditableTask, activeTaskId } = TaskStore;
        try {
            const resources = await Promise.all([
                this.initVectors(task.vectors),
                this.initRegion(task.region),
                this.initMarkerLayer(task),
                this.initMultiProjectResource(task)
            ]);
            isEditableTask && this.initBoundary();
            this.initResouceLayer(resources);
            this.installListener();
            //设置画面缩放比例
            this.setMapScale();
        } catch (e) {
            console.log('任务资料加载异常' + e.message || e || '');
            throw new Error(activeTaskId);
        }
    };

    initExResource = async task => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        try {
            await Promise.all([this.installRel(task.rels), this.installAttr(task.attrs)]);
        } catch (e) {
            console.log('rels.geojson或attrs.geojson加载异常' + e.message || e || '');
            throw new Error(activeTaskId);
        }
    };

    initMultiProjectResource = async task => {
        const { point_clouds, tracks } = task;
        await Promise.all([this.initPointCloud(point_clouds), this.initTracks(tracks)]);

        return {
            layerName: RESOURCE_LAYER_MULTI_PROJECT,
            layerMap: this.props.TaskStore.multiProjectMap
        };
    };

    initPointCloud = async urlArr => {
        if (!urlArr) return;
        //实例化点云
        const pointCloudLayer = new DynamicPCLayer(null, {
            intensityGamma: 0.5,
            intensityContrast: 0.4,
            intensityBrightness: 0.3,
            size: 1.2
        });
        window.pointCloudLayer = pointCloudLayer;
        //将点云实例加到map
        map.getLayerManager().addLayer('DynamicPCLayer', pointCloudLayer);
        //点云实例调用updatePointClouds方法，传入点云url数组，批量添加点云
        //{点云url:点云图层}
        await pointCloudLayer.updatePointClouds(urlArr);
        //获取点云高度范围
        const range = pointCloudLayer.getElevationRange();
        PointCloudStore.initHeightRange(range);
    };

    setMapScale = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { taskScale } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        taskScale ? window.map.setEyeView(taskScale) : map.setView('U');
    };

    initVectors = async vectors => {
        if (!vectors) return;
        window.vectorLayerGroup = new LayerGroup(vectors, {
            styleConifg: VectorsConfig
        });
        await map.getLayerManager().addLayerGroup(vectorLayerGroup);
        VectorsStore.addLayer(vectorLayerGroup);

        return {
            layerName: RESOURCE_LAYER_VECTOR,
            layer: vectorLayerGroup
        };
    };

    initTracks = async urlMap => {
        try {
            if (!urlMap) return;
            const { TaskStore } = this.props;
            const { projectNameArr, updateMultiProjectMap } = TaskStore;
            const traceListLayer = new TraceListLayer();
            window.trackLayer = traceListLayer;
            map.getLayerManager().addTraceListLayer(traceListLayer);
            const fetchTrackArr = Object.keys(urlMap).map(projectName => {
                const trackUrl = urlMap[projectName];
                //获取轨迹
                return axios.get(trackUrl).then(res => {
                    const { data } = res;
                    const trackPartMap = {};
                    data.forEach(tackPart => {
                        const { name, tracks } = tackPart;
                        const trackName = `${projectName}_${name}`;
                        traceListLayer.addTrace({
                            taskId: trackName,
                            data: tracks
                        });
                        trackPartMap[trackName] = tracks;
                    });
                    //更新
                    updateMultiProjectMap(`${projectName}|track`, {
                        layerKey: Object.keys(trackPartMap),
                        layerMap: trackPartMap
                    });
                    return data;
                });
            });

            await Promise.all(fetchTrackArr);
            ResourceLayerStore.selectLinkTrack(projectNameArr[0]);
        } catch (e) {
            message.warning('没有轨迹数据');
            console.error('轨迹异常' + e.message || e || '');
        }
    };

    initRegion = async regionUrl => {
        try {
            if (!regionUrl) return;
            const { TaskStore } = this.props;
            window.vectorLayer = new VectorLayer(regionUrl);
            vectorLayer.setDefaultStyle({ color: 'rgb(16,201,133)' });
            await map.getLayerManager().addLayer('VectorLayer', vectorLayer);
            //判断任务范围是否成功加载
            const regionLayerFeatures = window.vectorLayer.getAllFeatures();
            if (regionLayerFeatures.length === 0) message.warning('没有任务范围框');
            //保存任务范围geojson
            let { activeTask } = TaskStore;
            if (!activeTask.isLocal) {
                const getRegionRes = vectorLayer.getVectorData();
                DataLayerStore.setRegionGeojson(getRegionRes.features[0]);
            }

            return {
                layerName: RESOURCE_LAYER_TASK_SCOPE,
                layer: vectorLayer
            };
        } catch (e) {
            message.warning('没有任务范围框');
            console.error('任务范围异常：' + e.message || e || '');
        }
    };

    initBoundary = async () => {
        try {
            const { TaskStore } = this.props;
            window.boundaryLayerGroup = await TaskStore.getBoundaryLayer();
            if (!window.boundaryLayerGroup) return;
            DataLayerStore.addTargetLayers(window.boundaryLayerGroup.layers);
            ResourceLayerStore.updateLayerByName(
                RESOURCE_LAYER_BOUNDARY,
                window.boundaryLayerGroup
            );
            VectorsStore.addBoundaryLayer(window.boundaryLayerGroup);
            this.handleBoundaryfeature();
        } catch (e) {
            console.error('周边底图异常：' + e.message || e || '');
        }
    };

    //不同模式下，处理底图数据
    handleBoundaryfeature = () => {
        const { RenderModeStore, TextStore, DefineModeStore } = this.props;
        const { whiteRenderMode, resetSelectOption, setRels, activeMode } = RenderModeStore;
        const { resetBoundaryTextStyle } = TextStore;
        const { updateBoundaryVectorStyle } = DefineModeStore;

        switch (activeMode) {
            case 'common':
            case 'check':
            case 'define':
                //按符号设置，更新后加载的周边底图
                updateBoundaryVectorStyle();
                break;
            case 'relation':
                //将重置专题图
                resetSelectOption();
                //白色渲染模式/要素都是白色
                whiteRenderMode();
                //将有关联关系的要素，按专题图进行分组
                setRels();
                break;
            default:
                break;
        }

        //将后加载的周边底图按当前注记配置渲染
        resetBoundaryTextStyle();
    };

    initMarkerLayer = async () => {
        const {
            QCMarkerStore: { getMarkerList, initMarkerList, showList },
            TaskStore: {
                isFixTask,
                isFixStatus,
                activeTask: { taskId, processName, isLocal }
            }
        } = this.props;
        if (isLocal) return; //如果是本地任务，返回，不加载质检标注
        if (isFixTask && isFixStatus) return; //如果是人工识别或人工构建任务，且状态是已领取或进行中，返回，不加载质检标注
        try {
            const { AD_Marker } = MarkerVectorsConfig;
            const markerLayer = new VectorLayer();
            markerLayer.layerName = 'AD_Marker';
            markerLayer.resetConfig(AD_Marker);
            await map.getLayerManager().addLayer('VectorLayer', markerLayer);
            //赋值给全局对象
            window.markerLayer = {
                layerName: markerLayer.layerName,
                layerId: markerLayer.layerId,
                layer: markerLayer
            };
            //获取质检标列表，获取筛选条件
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

    initResouceLayer = layers => {
        layers = layers.filter(layer => !!layer);
        ResourceLayerStore.addLayers(layers);
    };

    installListener = () => {
        const { TaskStore } = this.props;

        //禁用浏览器默认右键菜单
        document.oncontextmenu = function (e) {
            e.preventDefault();
            // return false;
        };

        //监听浏览器即将离开当前页面事件
        window.onbeforeunload = function (e) {
            //保存当前任务比例
            const { activeTaskId } = TaskStore;
            const preTaskScale = map.getEyeView();
            const { position } = preTaskScale;
            const { x, y, z } = position;
            if (!(x === 0 && y === 0 && z === 0)) {
                AdLocalStorage.setTaskInfosStorage({
                    taskId: activeTaskId,
                    taskScale: preTaskScale
                });
            }
            //离开页面时减少访问次数
            editVisiteHistory.removeVisitedHistory();
            statisticsTime(1);
            statisticsTime(3);
            setTimeout(function () {
                setTimeout(statisticsTime.bind(null, 2), 1000);
            }, 50);
            const visiteHistory = editVisiteHistory.getVisitedHistory();
            if (visiteHistory.length < 1) {
                e = window.event || e;
                e.returnValue = `确定离开当前页面吗？`;
                return e.returnValue;
            }
        };

        // attributes 拾取控件
        let boundaryLayers = window.boundaryLayerGroup ? window.boundaryLayerGroup.layers : [];
        const vectorLayers = window.vectorLayerGroup ? window.vectorLayerGroup.layers : [];

        DataLayerStore.initEditor([
            { layer: pointCloudLayer },
            ...vectorLayers,
            { layer: window.trackLayer },
            ...boundaryLayers,
            window.markerLayer
        ]);
        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);

        installMapListener();
    };

    selectedCallBack = (result, event) => {
        let editLayer = DataLayerStore.getEditLayer();
        // console.log(result, event);
        if (result && result.length > 0) {
            /**
             * 判断是轨迹或轨迹点
             * VectorLayer 轨迹
             * TraceLayer 轨迹点
             */
            if (result[0].type === 'VectorLayer') {
                result.length === 1 ? DataLayerStore.pick() : DataLayerStore.unPick();
                this.showAttributesModal(result, event);
                showRightMenu(result, event);
            } else if (result[0].type === 'TraceListLayer') {
                showPictureShowView(result[0]);
                PictureShowStore.show('TraceListLayer');
            }
            // 属性刷置灰
            if (
                result.length === 1 &&
                editLayer &&
                editLayer.layerName === result[0].layerName &&
                editLayer.layerId === result[0].layerId
            ) {
                DataLayerStore.unAttributeBrushPick();
            } else {
                DataLayerStore.attributeBrushPick();
            }
            window.currentSelectFeatures = result;
        } else {
            DataLayerStore.unPick();
            DataLayerStore.attributeBrushPick();
            AttributeStore.hide();
            RightMenuStore.hide();
            AttrRightMenuStore.hide();
            window.trackLayer.unSelect();
            this.handleCancelSelect();
        }
        BatchAssignStore.hide();
    };

    //不同模式下取消关联要素高亮
    handleCancelSelect = () => {
        const { activeMode, cancelSelect } = RenderModeStore;
        if (activeMode === 'relation') {
            cancelSelect();
        } else {
            AttributeStore.hideRelFeatures();
        }
    };

    //显示属性窗口
    showAttributesModal = (result, event) => {
        const isMarkerLayer = result[0].layerName === 'AD_Marker';
        if (isMarkerLayer) {
            QCMarkerStore.show();
            QCMarkerStore.setEditStatus('visite');
            QCMarkerStore.initCurrentMarker(result[0]);
        } else {
            showAttributesModal(result[0], event);
        }
    };

    @logDecorator({ operate: '新建要素', skipRenderMode: true })
    async createdCallBack(result) {
        //console.log(result);
        let data;
        try {
            //判断是否绘制成功
            checkSdkError(result);

            data = await DataLayerStore.updateResult(result);
            regionCheck(data);

            // 请求id服务，申请id
            data = await NewFeatureStore.init(data, isManbuildTask());
            //新建标记点时默认给质检人员属性值
            data = DataLayerStore.updateQCPerson(data);
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = { features: [[], [data]] };
            showAttributesModal(data);
            return history;
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getEditLayer();
                layer && layer.layer.removeFeatureById(data.uuid);
            }

            //如果是标注图层，报错应退出图层
            const editLayerName = DataLayerStore.getEditLayerName();
            const isMarkerLayer = editLayerName === 'AD_Marker';
            isMarkerLayer && DataLayerStore.exitMarker();

            message.error(e.message, 3);
            throw e;
        }
    }

    @logDecorator({ operate: '修改要素几何', skipRenderMode: true })
    editedCallBack(result) {
        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            checkSdkError(result);

            regionCheck(result);
            if (DataLayerStore.editType === 'changePoints') {
                message.success('修改形状点完成，需检查数据的关联关系正确性');
            }
            if (DataLayerStore.editType === 'trim') {
                message.info({
                    key: 'trim',
                    duration: 3,
                    content: '线要素修整成功'
                });
            }

            if (!isManbuildTask()) {
                result = modUpdStatGeometry(result);
            }

            let history = { features: [[oldFeature], [result]] };
            return history;
        } catch (e) {
            //恢复要素
            DataLayerStore.updateFeature(oldFeature);
            message.error({
                key: DataLayerStore.editType,
                duration: 3,
                content: e.message
            });
            throw e;
        }
    }

    installRel = url => {
        return RelStore.addRecords(url, 'current');
    };

    installAttr = url => {
        return AttrStore.addRecords(url, 'current');
    };

    render() {
        const { TaskStore } = this.props;

        return (
            <React.Fragment>
                <div
                    id="viz"
                    key={TaskStore.activeTaskId}
                    className="viz-box"
                    onKeyDown={e => this.handleKeyDown(e)}
                ></div>
                {TaskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
                <QCMarkerModal />
            </React.Fragment>
        );
    }
}

export default VizComponent;
