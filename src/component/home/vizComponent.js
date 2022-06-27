import React from 'react';
import { Map, DynamicPCLayer, LayerGroup, TraceListLayer, VectorLayer } from 'addis-viz-sdk';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import AttributesModal from './attributesModal';
import QCMarkerModal from './qualityMarker/qcMarkerModal';
import InformationModal from './informationMark/informationModal';
//import NewFeatureModal from './NewFeatureModal';
import RightMenuModal from 'src/component/home/rightMenuModal';
import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_MULTI_PROJECT,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_CHECK,
    RESOURCE_LAYER_MARKER,
    RESOURCE_LAYER_INFORMATION,
    TASK_EDIT_LAYER_MAP
} from 'src/config/dataLayerConfig';
import MultimediaView from './multimediaView';
import OtherVectorConfig from 'src/config/otherVectorConfig';
import 'less/viz-component.less';
// import { addClass, removeClass } from '../../../util/utils';
import BatchAssignModal from './batchAssignModal';
import { modUpdStatGeometry, checkSdkError, getLayerExByName } from 'src/util/vectorUtils';
import AdLocalStorage from 'src/util/adLocalStorage';
import { installMapListener } from 'src/util/map/event';
import _ from 'lodash';
import editLog from 'src/util/editLog';
import { windowObserver } from 'src/util/taskUtils';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import { initBoundary, getCheckReport, getMarkerList, getInformationList, setTaskLevel } from 'src/util/taskStart';
import axios from 'axios';
import { logDecorator, editOutputLimit } from 'src/util/decorator';
import RenderModeStore from 'src/store/home/renderModeStore';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import DataLayerStore from 'src/store/home/dataLayerStore';
import AttributeStore from 'src/store/home/attributeStore';
import PictureShowStore from 'src/store/home/pictureShowStore';
import RightMenuStore from 'src/store/home/rightMenuStore';
import AttrRightMenuStore from 'src/store/home/attrRightMenuStore';
import NewFeatureStore from 'src/store/home/newFeatureStore';
import OperateHistoryStore from 'src/store/home/operateHistoryStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import BatchAssignStore from 'src/store/home/batchAssignStore';
import PointCloudStore from 'src/store/home/pointCloudStore';
import VectorsStore from 'src/store/home/vectorsStore';
import ToolCtrlStore from 'src/store/home/toolCtrlStore';
import QCMarkerStore from 'src/store/home/qcMarkerStore';
import InformationStore from 'src/store/home/informationStore';
import BufferStore from 'src/store/home/bufferStore';
import QualityCheckStore from 'src/store/home/qualityCheckStore';
import { showPictureShowView, showAttributesModal, showRightMenu } from 'src/util/map/viewCtrl';
import { fetchCallback } from 'src/util/map/utils';
import OcTreeIndex from 'src/util/octreeIndex';
import BatchBuildModal from 'src/component/home/toolList/batchBuild/batchBuildModal';
import BatchBuildStore from 'src/store/home/batchBuildStore';
import DefaultStyleConfig from 'src/config/defaultStyleConfig';
import SettingStore from 'src/store/setting/settingStore';
import UpdStatModeStore from 'src/store/home/updStatModeStore';

@inject('QualityCheckStore')
@inject('QCMarkerStore')
@inject('InformationStore')
@inject('DefineModeStore')
@inject('TextStore')
@inject('RenderModeStore')
@inject('TaskStore')
@inject('appStore')
@inject('mapStore')
@observer
class VizComponent extends React.Component {
    constructor(props) {
        super(props);
        this.createdCallBack = this.createdCallBack.bind(this);
        this.handleCreatedCallBack = this.handleCreatedCallBack.bind(this);
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
         // 替换代码
         const { mapStore } = this.props; 
         mapStore.initMap("viz");
         mapStore.mapViewer.setKeySpeedRange(1, 0.125, 16);
         window.map=mapStore.mapViewer; 
        // const div = document.getElementById('viz');
        // window.map = new Map(div);
        // window.map.setKeySpeedRange(1, 0.125, 16);
        await this.initTask();
        this.renderMode(); //根据渲染模式，初始化注记和符号
    };

    release = async () => {
        await this.cancelRequest();
        await this.clearWorkSpace();

        BatchBuildStore.release();
        QCMarkerStore.release();
        InformationStore.release();
        ResourceLayerStore.release();
        VectorsStore.release();
        PointCloudStore.release();
        DataLayerStore.release();
        DataLayerStore.setRegionGeojson();
        QualityCheckStore.closeCheckReport();
        QualityCheckStore.clearCheckReport();
        BufferStore.release();
        UpdStatModeStore.release();
        window.boundaryLayerGroup = null;
        window.pointCloudLayer = null;
        window.vectorLayerGroup = null;
        window.trackLayer = null;

        await RelStore.destroy();
        await AttrStore.destroy();

        window.map && window.map.release();
        window.map = null;
        window.markerLayer = null;
        window.informationLayer = null;
        window.horizontal = null;
        window.bufferLayer = null;
    };

    clearWorkSpace = async () => {
        const { TextStore } = this.props;
        await OperateHistoryStore.destroy();
        await editLog.store.clear();
        if (window.map) {
            DataLayerStore.exitEdit();
            DataLayerStore.activeEditor({ toolChannel: 'toggle' });
            DataLayerStore.topViewMode(false);
        }
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide('other_close');
        PictureShowStore.hide();
        PictureShowStore.destory();
        TextStore.hide();
    };

    //取消请求
    cancelRequest = async () => {
        await window.__cancelRequestArr.map(item => {
            return item.cancel();
        });
        window.__cancelRequestArr = [];
    };

    //不同任务类型采用不同渲染模式
    renderMode = () => {
        const {
            TaskStore: { taskProcessName },
            TextStore: { initTextConfig },
            RenderModeStore: { setMode },
            DefineModeStore: { initVectorConfig }
        } = this.props;
        //获取渲染模式
        const mode = 'common';
        //设置渲染模式
        setMode(mode);
        //初始化文字注记配置
        initTextConfig(mode, taskProcessName);
        //初始化符号配置
        initVectorConfig(mode, taskProcessName);
    };

    initTask = async () => {
        // console.time('taskLoad');
        const { TaskStore } = this.props;
        const {
            getTaskInfo,
            getTaskFile,
            getTaskFileList,
            activeTask,
            activeTaskId,
            tasksPop,
            isEditableTask
        } = TaskStore;
        if (!activeTaskId) return;
        const key = Math.random();
        message.loading({
            content: '正在加载任务数据...',
            key,
            duration: 95
        });
        try {
            //初化化检查结果配置，不同任务采用不同配置
            QualityCheckStore.initReportConfig();
            //获取任务信息 taskinfos.json
            // console.log('1获取任务开始：', new Date);
            await Promise.all([
                getTaskFileList(),
                getTaskInfo(),
                OcTreeIndex.getOctreeMap(activeTask)
            ]);
            // console.log('1获取任务结束：', new Date);
            //获取任务资料文件路径
            const task = getTaskFile();

            // console.log('2加载数据&渲染数据开始：', new Date);
            //加载当前任务资料
            await Promise.all([this.initEditResource(task), this.initExResource(task)]);
            // console.log('2加载数据&渲染数据结束：', new Date);
            //“开始任务”时，加载周边底图
            if (isEditableTask) initBoundary();
            // 设置初始化的任务范围
            const needSetLevel =
                SettingStore.getConfig('OTHER_CONFIG').needSetLevelLists.find(i => i == activeTask.processName);
            if (needSetLevel) setTaskLevel();
            //获取检查报表
            getCheckReport();
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
        // console.timeEnd('taskLoad');
    };

    initEditResource = async task => {
        const { TaskStore } = this.props;
        const { activeTaskId, isMrTask } = TaskStore;
        try {
            //先加载任务范围，以任务范围为标准做居中定位
            // console.log('3渲染任务范围&质检标注图层&点云&轨迹开始：', new Date);
            const region = await this.initRegion(task.region);
            //再加载其它资料
            const resources = await Promise.all([
                this.initVectors(),
                this.initCheckLayer(),
                this.initMarkerLayer(task),
                this.initInformationLayer(task),
                this.initMultiProjectResource(task)
            ]);
            // 加载矢量图层
            await this.installVector(task.vectors);

            this.initResouceLayer([...resources, region]);
            this.installListener();
            //设置画面缩放比例
            this.setMapScale();
            //初始化显隐点云和轨迹，只显示默认点云
            if (!isMrTask) {
                ResourceLayerStore.initMultiProjectLayer();
            }
            // console.log('3渲染任务范围&质检标注图层&点云&轨迹结束：', new Date);
        } catch (e) {
            console.log('任务资料加载异常' + e.message || e || '');
            throw new Error(activeTaskId);
        }
    };

    initExResource = async task => {
        const { TaskStore } = this.props;
        const { activeTaskId, activeTask } = TaskStore;
        try {
            const needSetLevel =
                SettingStore.getConfig('OTHER_CONFIG').needSetLevelLists.find(i => i == activeTask.processName);
            if (needSetLevel) {
                this.installRel(task.rels);
                this.installAttr(task.attrs);
            } else {
                await Promise.all([this.installRel(task.rels), this.installAttr(task.attrs)]);
            }
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
        try {
            //实例化点云
            const pointCloudLayer = new DynamicPCLayer(null, {
                pointBudget: SettingStore.getConfig('OTHER_CONFIG').pointLimit, // 点云点数量
                minLevel: SettingStore.getConfig('OTHER_CONFIG').scaleSize, // 开始更新点云八叉树最小比例尺级别
                intensityGamma: 0.5,
                intensityContrast: 0.4,
                intensityBrightness: 0.3,
                size: 1.2
            });
            window.pointCloudLayer = pointCloudLayer;
            //将点云实例加到map
            map.getLayerManager().addLayer('DynamicPCLayer', pointCloudLayer);
            if (!urlArr) return;
            //根据点云索引，动态加载点云
            OcTreeIndex.updateOctree();
        } catch (e) {
            message.warning('没有点云数据');
            console.log(`点云加载异常：${e.message || e}`);
        }
    };

    setMapScale = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { taskScale } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        taskScale && window.map.setEyeView(taskScale);
    };

    initVectors = async () => {
        window.vectorLayerGroup = new LayerGroup([], {
            styleConifg: DefaultStyleConfig
        });
        await map.getLayerManager().addLayerGroup(vectorLayerGroup, fetchCallback);
        VectorsStore.addLayer(vectorLayerGroup);

        return {
            layerName: RESOURCE_LAYER_VECTOR,
            layer: vectorLayerGroup
        };
    };

    initTracks = async urlMap => {
        try {
            const { TaskStore, appStore } = this.props;
            const { projectNameArr, updateMultiProjectMap, activeTask } = TaskStore;
            const { loginUser } = appStore;
            const traceOpts = { style: { arrow_color: '#FFFFFF', arrow_size: 2 } };
            const traceListLayer = new TraceListLayer(traceOpts);
            window.trackLayer = traceListLayer;
            map.getLayerManager().addTraceListLayer(traceListLayer);
            if (!urlMap) return;
            const fetchTrackArr = Object.keys(urlMap).map(projectName => {
                const trackUrl = urlMap[projectName];
                //获取轨迹
                return axios.get(trackUrl).then(res => {
                    const { data } = res;
                    const trackPartMap = {};
                    let timeList = [];
                    data.forEach(tackPart => {
                        const { name, tracks, startTime, endTime } = tackPart;
                        const trackName = `${projectName}_${name}`;
                        traceListLayer.addTrace({
                            taskId: trackName,
                            data: tracks
                        });
                        trackPartMap[trackName] = tracks;
                        timeList.push({ startTime, endTime });
                    });
                    //更新
                    updateMultiProjectMap(`${projectName}|track`, {
                        layerKey: Object.keys(trackPartMap),
                        layerMap: trackPartMap,
                        taskId: activeTask.taskId,
                        userName: loginUser.username,
                        projectId: projectName.split('_')[0],
                        projectName: projectName,
                        timeList
                    });
                    return data;
                });
            });
            await Promise.all(fetchTrackArr);
            ResourceLayerStore.selectLinkTrack(projectNameArr[0]);
        } catch (e) {
            message.warning('没有轨迹数据');
            console.error(`轨迹加载异常：${e.message || e}`);
        }
    };

    setBaseElevationByRegion = regionLayerFeatures => {
        //获取任务范围所有点
        const regionPoints = regionLayerFeatures[0]?.data?.geometry?.coordinates?.[0];
        //找到最低点
        let min;
        regionPoints.forEach(point => {
            const z = point[2];
            min = min || z;
            min = min > z ? z : min;
        });
        //以最低点进行路面设置
        const dropVal = SettingStore.getConfig('OTHER_CONFIG').startZ;
        if (min) window.map?.setBaseElevation?.(min - dropVal);
    };

    initRegion = async regionUrl => {
        try {
            if (!regionUrl) return;
            const { TaskStore } = this.props;
            //初始化任务范围时，传入参数isExtend:true，表示以任务范围定位
            window.vectorLayer = new VectorLayer(regionUrl, { isExtent: true });
            vectorLayer.setDefaultStyle({ color: 'rgb(16,201,133)' });
            await map.getLayerManager().addLayer('VectorLayer', vectorLayer);
            //判断任务范围是否成功加载
            const regionLayerFeatures = window.vectorLayer.getAllFeatures();
            if (regionLayerFeatures.length === 0) throw new Error('没有任务范围框');
            //根据任务范围框最低点做路面设置
            this.setBaseElevationByRegion(regionLayerFeatures);
            //不同任务类型，不同落点限制
            TaskStore.activeTask.processLimit();

            return {
                layerName: RESOURCE_LAYER_TASK_SCOPE,
                layer: vectorLayer
            };
        } catch (e) {
            message.warning('没有任务范围框');
            console.error(`任务范围异常：${e.message || e}`);
        }
    };

    initCheckLayer = async () => {
        const { AD_Check } = OtherVectorConfig;
        const checkLayer = new VectorLayer(null, { layerConfig: AD_Check });
        checkLayer.layerName = 'AD_Check';
        await map.getLayerManager().addLayer('VectorLayer', checkLayer);
        window.checkLayer = {
            layerName: checkLayer.layerName,
            layerId: checkLayer.layerId,
            layer: checkLayer
        };
        ResourceLayerStore.updateLayerByName(RESOURCE_LAYER_CHECK, window.checkLayer.layer);
    };

    //初始化质检标注图层
    initMarkerLayer = async () => {
        const { isMsTask, isFixStatus, activeTask: { isLocal } = {} } = this.props.TaskStore;
        const {
            loginUser: { roleCode }
        } = this.props.appStore;
        if (isLocal) return; //如果是本地任务，返回
        if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
        const { AD_Marker_QC, AD_Marker } = OtherVectorConfig;
        const markerConfig = roleCode === 'producer' ? AD_Marker : AD_Marker_QC;
        const markerLayer = new VectorLayer(null, { layerConfig: markerConfig });
        markerLayer.layerName = 'AD_Marker';
        await map.getLayerManager().addLayer('VectorLayer', markerLayer);
        window.markerLayer = {
            layerName: markerLayer.layerName,
            layerId: markerLayer.layerId,
            layer: markerLayer
        };
        ResourceLayerStore.updateLayerByName(RESOURCE_LAYER_MARKER, window.markerLayer.layer);
        getMarkerList();
    };

    //初始化资料问题图层
    initInformationLayer = async () => {
        const { isMsTask, isFixStatus, activeTask: { isLocal } = {} } = this.props.TaskStore;
        const {
            loginUser: { roleCode }
        } = this.props.appStore;
        if (isLocal) return; //如果是本地任务，返回
        // if (isMsTask && isFixStatus) return; //如果是人工识别【已领取或进行中】，返回
        const { AD_Information } = OtherVectorConfig;
        const informationLayer = new VectorLayer(null, { layerConfig: AD_Information });
        informationLayer.layerName = 'AD_Information';
        await map.getLayerManager().addLayer('VectorLayer', informationLayer);
        window.informationLayer = {
            layerName: informationLayer.layerName,
            layerId: informationLayer.layerId,
            layer: informationLayer
        };
        ResourceLayerStore.updateLayerByName(RESOURCE_LAYER_INFORMATION, window.informationLayer.layer);
        getInformationList();
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
            if (window.map) {
                const { activeTaskId } = TaskStore;
                const preTaskScale = window.map.getEyeView();
                const { position } = preTaskScale;
                const { x, y, z } = position;
                if (!(x === 0 && y === 0 && z === 0)) {
                    AdLocalStorage.setTaskInfosStorage({
                        taskId: activeTaskId,
                        taskScale: preTaskScale
                    });
                }
            }
            //离开页面时减少访问次数
            HomeVisiteHistory.removeVisitedHistory();
            const visiteHistory = HomeVisiteHistory.getVisitedHistory();
            const isDevelopment = process.env.NODE_ENV === 'development';
            if (visiteHistory.length < 1 && !isDevelopment) {
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
            window.markerLayer,
            window.informationLayer
        ]);
        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);

        installMapListener();
    };

    selectedCallBack = (result, event) => {
        if (result && result.length > 0) {
            const firstFeature = result[0];
            const { type: featureType, layerName: featureLayerName } = firstFeature;
            const { TaskStore } = this.props;
            const editLayers = TASK_EDIT_LAYER_MAP?.[TaskStore.taskProcessName] ?? [];
            const isEditableLayer = editLayers.includes(featureLayerName);
            switch (featureType) {
                case 'VectorLayer': //矢量要素
                    if (isEditableLayer && result.length === 1) {
                        const { appStore } = this.props;
                        const editStatus = DataLayerStore.editStatus;
                        const layerName = DataLayerStore.getAdEditLayerName();
                        if (
                            appStore.isProducer &&
                            editStatus === 'normal' && //当前是普通模式，不是联合打断模式
                            layerName !== featureLayerName //选中要素所属图层不是当前编辑图层
                        ) {
                            //设置选中要素所属图层为编辑图层，并重置顶部工具栏
                            const layer = getLayerExByName(featureLayerName);
                            DataLayerStore.activeEditor({
                                layer,
                                channel: 'select_data',
                                toolChannel: 'toggle',
                                noClear: true
                            });
                            ToolCtrlStore.updateByEditLayer(layer);
                        }
                        DataLayerStore.pick();
                    } else {
                        DataLayerStore.unPick();
                    }
                    this.showAttributesModal(result, event);
                    showRightMenu(result, event);
                    break;
                case 'TraceListLayer': //轨迹点
                    showPictureShowView(firstFeature);
                    PictureShowStore.show('TraceListLayer');
                    break;
                default:
                    break;
            }
            window.currentSelectFeatures = result;
        } else {
            DataLayerStore.unPick();
            AttributeStore.hide('other_close');
            RightMenuStore.hide();
            AttrRightMenuStore.hide();
            window?.trackLayer?.unSelect?.();
            this.handleCancelSelect();
        }
        BatchAssignStore.hide('other_close');
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
        const isInformationLayer = result[0].layerName === 'AD_Information';
        if (isMarkerLayer) {
            if (QCMarkerStore.isCreateMarker()) return;
            QCMarkerStore.show();
            QCMarkerStore.setEditStatus('visite', 'toggle_select');
            QCMarkerStore.initCurrentMarker(result[0]);
        } else if (isInformationLayer) {
            if (InformationStore.isCreateMarker()) return;
            InformationStore.show();
            InformationStore.setEditStatus('visite', 'toggle_select');
            InformationStore.initCurrentMarker(result[0]);
        } else {
            showAttributesModal(result[0], event);
        }
    };

    @logDecorator({ operate: '新建要素', skipRenderMode: true })
    async createdCallBack(result) {
        //console.log(result);
        let data;
        DataLayerStore.hideMessage();
        try {
            //判断是否绘制成功
            checkSdkError(result);
            //更新要素
            data = result;
            data = await DataLayerStore.updateResult(result);
            await this.handleCreatedCallBack(data);
            let history = { features: [[], [data]] };
            return history;
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getAdEditLayer();
                layer && layer.layer.removeFeatureById(data.uuid);
            }
            throw e;
        }
    }

    @editOutputLimit()
    async handleCreatedCallBack(data) {
        // 请求id服务，申请id
        data = await NewFeatureStore.init(data);
        // 更新id到sdk
        DataLayerStore.updateFeature(data);
        //显示要素属性窗口
        showAttributesModal(data);
    }

    @logDecorator({ operate: '修改要素几何', skipRenderMode: true })
    editedCallBack(result) {
        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            checkSdkError(result);

            if (DataLayerStore.editType === 'change_points') {
                message.success('修改形状点完成，需检查数据的关联关系正确性');
            }
            if (DataLayerStore.editType === 'trim') {
                message.info({
                    key: 'trim',
                    duration: 3,
                    content: '线要素修整成功'
                });
            }

            result = modUpdStatGeometry(result);

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

    installRel = urls => {
        return RelStore.addRecords(urls, 'current');
    };

    installAttr = urls => {
        return AttrStore.addRecords(urls, 'current');
    };

    installVector = urls => {
        return VectorsStore.addRecords(urls, 'current');
    };

    render() {
        const { TaskStore } = this.props;
        return (
            <React.Fragment>
                {TaskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
                <QCMarkerModal />
                <InformationModal />
                <BatchBuildModal />
            </React.Fragment>
        );
    }
}

export default VizComponent;
