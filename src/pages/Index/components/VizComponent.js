import React from 'react';
import {
    Map,
    DynamicPCLayer,
    LayerGroup,
    TraceListLayer,
    VectorLayer
} from 'addis-viz-sdk';
import { Modal, message } from 'antd';
import { inject, observer } from 'mobx-react';
import AttributesModal from './AttributesModal';
//import NewFeatureModal from './NewFeatureModal';
import RightMenuModal from './RightMenuModal';

import {
    RESOURCE_LAYER_POINT_CLOUD,
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_TRACK,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_MULTI_PROJECT
} from 'src/config/DataLayerConfig';
import MultimediaView from './MultimediaView';
import VectorsConfig from '../../../config/VectorsConfig';
import OutsideVectorsConfig from '../../../config/OutsideVectorsConfig';
import 'less/components/viz-compnent.less';
// import { addClass, removeClass } from '../../../utils/utils';
import BatchAssignModal from './BatchAssignModal';
import {
    isRegionContainsElement,
    modUpdStatGeometry
} from 'src/utils/vectorUtils';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { shortcut } from 'src/utils/shortcuts';
import { installMapListener } from 'src/utils/map/event';
import _ from 'lodash';
import editLog from 'src/models/editLog';
import { isManbuildTask } from 'src/utils/taskUtils';
import { editVisiteHistory } from 'src/utils/visiteHistory';
import AdEmitter from 'src/models/event';
import axios from 'axios';

@inject('RenderModeStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('PictureShowStore')
@inject('RightMenuStore')
@inject('NewFeatureStore')
@inject('OperateHistoryStore')
@inject('RelStore')
@inject('AttrStore')
@inject('BatchAssignStore')
@inject('PointCloudStore')
@inject('VectorsStore')
@inject('ToolCtrlStore')
@observer
class VizComponent extends React.Component {
    constructor(props) {
        super(props);
        //多工程任务资料map，例：{工程名:{track:{},point_clouds:{}}}
        this.multiProjectResource = {};
    }

    componentDidMount = async () => {
        const { TaskStore } = this.props;
        await TaskStore.initTask({ type: 4 });

        //清除多余任务比例记录
        AdLocalStorage.filterTaskInfosStorage(TaskStore.taskIdList);
    };

    componentDidUpdate() {
        this.init();
    }

    init = async () => {
        const { TaskStore } = this.props;
        await TaskStore.getTaskInfo();
        const task = TaskStore.getTaskFile();
        if (!task) return;
        const div = document.getElementById('viz');
        await this.release();
        window.map = new Map(div);
        await this.initTask(task);
    };

    release = async () => {
        const {
            ResourceLayerStore,
            VectorsStore,
            DataLayerStore,
            RelStore,
            AttrStore
        } = this.props;
        await this.clearWorkSpace();

        window.map && window.map.release();
        ResourceLayerStore.release();
        VectorsStore.release();
        DataLayerStore.setRegionGeojson();
        window.boundaryLayerGroup = null;
        window.pointCloudLayer = null;
        window.vectorLayerGroup = null;
        window.trackLayer = null;
        this.multiProjectResource = {};

        await RelStore.destroy();
        await AttrStore.destroy();
    };

    clearWorkSpace = async () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            PictureShowStore
        } = this.props;
        await OperateHistoryStore.destroy();
        await editLog.store.clear();
        window.map && DataLayerStore.activeEditor();
        DataLayerStore.topViewMode(false);
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
    };

    addShortcut = event => {
        const { ResourceLayerStore, VectorsStore } = this.props;
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
                    ResourceLayerStore.toggle(
                        RESOURCE_LAYER_VECTOR,
                        true,
                        true
                    );
                    VectorsStore.toggleAll(true, RESOURCE_LAYER_VECTOR, true);
                },
                describe: '开关轨迹图层 2'
            }
        ];

        shortcut.add(event, callbackShortcutMap);
    };

    handleKeyDown = event => {
        this.addShortcut(event);
    };

    initTask = async task => {
        console.time('taskLoad');
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const hide = message.loading({
            content: '正在加载任务数据...',
            key: 'init_task'
        });
        try {
            await Promise.all([
                this.initEditResource(task),
                this.initExResource(task)
            ]);
            message.success({
                content: '资料加载成功',
                key: 'init_task',
                duration: 1
            });

            const { taskScale } =
                AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
            taskScale ? window.map.setEyeView(taskScale) : map.setView('U');
        } catch (e) {
            console.log(e);
            hide();
            // 任务列表快速切换时旧任务加载过程会报错
            if (activeTaskId === task.taskId) {
                Modal.error({
                    title: '资料加载失败，请确认输入正确路径。',
                    okText: '确定'
                });
            }
            TaskStore.tasksPop();
        }

        console.timeEnd('taskLoad');
    };

    initEditResource = async task => {
        let resources = await Promise.all([
            this.initVectors(task.vectors),
            this.initRegion(task.region),
            this.initBoundary(task.boundary),
            this.initMultiProjectResource(task)
        ]);
        this.initResouceLayer(resources);
        this.installListener();
    };

    initExResource = async task => {
        await Promise.all([
            this.installRel(task.rels),
            this.installAttr(task.attrs)
        ]);
    };

    initMultiProjectResource = async task => {
        const { point_clouds, tracks } = task;
        await Promise.all([
            this.initPointCloud(point_clouds),
            this.initTracks(tracks)
        ]);

        return {
            layerName: RESOURCE_LAYER_MULTI_PROJECT,
            layerMap: this.multiProjectResource
        };
    };

    initPointCloud = async pointCloudObj => {
        if (!pointCloudObj) return;
        const { urlArr, urlMap } = pointCloudObj;
        //实例化点云
        const pointCloudLayer = new DynamicPCLayer(null);
        window.pointCloudLayer = pointCloudLayer;
        //将点云实例加到map
        map.getLayerManager().addLayer('DynamicPCLayer', pointCloudLayer);
        //点云实例调用updatePointClouds方法，传入点云url数组，批量添加点云
        //{点云url:点云图层}
        const pointCloudUrlArr = Object.values(urlArr);
        await pointCloudLayer.updatePointClouds(pointCloudUrlArr).then(() => {
            //所有点云添加成功回调

            //获取点云高度范围
            const { PointCloudStore } = this.props;
            const range = pointCloudLayer.getElevationRange();
            PointCloudStore.initHeightRange(range);

            //存储多工程点云信息
            Object.keys(urlMap).forEach(projectName => {
                const { point_clouds: url } = urlMap[projectName];
                this.multiProjectResource[projectName] =
                    this.multiProjectResource[projectName] || {};
                this.multiProjectResource[projectName].point_clouds = {
                    projectName,
                    layerName: 'point_clouds',
                    layerKey: url,
                    layer: pointCloudLayer,
                    value: RESOURCE_LAYER_POINT_CLOUD,
                    checked: true
                };
            });
        });
    };

    initVectors = async vectors => {
        if (!vectors) {
            return;
        }
        const { VectorsStore } = this.props;
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

    initTracks = async trackObj => {
        if (!trackObj) return;
        const { ResourceLayerStore, TaskStore } = this.props;
        const { projectNameArr } = TaskStore;
        const { urlMap } = trackObj;
        const traceListLayer = new TraceListLayer();
        window.trackLayer = traceListLayer;
        map.getLayerManager().addTraceListLayer(traceListLayer);
        const fetchTrackArr = Object.keys(urlMap).map(projectName => {
            const { track: trackUrl } = urlMap[projectName];
            //获取轨迹
            return axios.get(trackUrl).then(res => {
                const { data } = res;
                const trackMap = {};
                data.forEach(tackPart => {
                    const { name, tracks } = tackPart;
                    traceListLayer.addTrace({
                        taskId: `${projectName}_${name}`,
                        data: tracks
                    });
                    trackMap[`${projectName}_${name}`] = tracks;
                });
                //存储多工程轨迹信息
                this.multiProjectResource[projectName] =
                    this.multiProjectResource[projectName] || {};
                this.multiProjectResource[projectName].track = {
                    projectName,
                    layerName: 'track',
                    layerKey: Object.keys(trackMap),
                    layerMap: trackMap,
                    layer: window.trackLayer,
                    value: RESOURCE_LAYER_TRACK,
                    checked: true
                };
                return data;
            });
        });

        await Promise.all(fetchTrackArr);
        ResourceLayerStore.selectLinkTrack(projectNameArr[0]);
    };

    initRegion = async regionUrl => {
        if (!regionUrl) return;
        try {
            const { DataLayerStore, TaskStore } = this.props;
            window.vectorLayer = new VectorLayer(regionUrl);
            vectorLayer.setDefaultStyle({ color: 'rgb(16,201,133)' });
            await map.getLayerManager().addLayer('VectorLayer', vectorLayer);
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
            console.log(e);
            message.warning('作业范围数据加载失败：' + e.message, 3);
        }
    };

    initBoundary = async boundary => {
        if (!boundary) return;
        try {
            await this.loadBoundaryEx(boundary);
            return await this.loadBoundary(boundary);
        } catch (e) {
            console.log(e);
            message.warning('周边底图数据加载失败', 3);
        }
    };

    loadBoundary = async boundary => {
        window.boundaryLayerGroup = new LayerGroup(boundary.adsAll, {
            styleConifg: OutsideVectorsConfig
        });
        await map.getLayerManager().addLayerGroup(boundaryLayerGroup);

        const { VectorsStore } = this.props;
        VectorsStore.addBoundaryLayer(boundaryLayerGroup);

        return {
            layerName: RESOURCE_LAYER_BOUNDARY,
            layer: boundaryLayerGroup
        };
    };

    loadBoundaryEx = async boundary => {
        const { RelStore, AttrStore } = this.props;
        await RelStore.addRecords(boundary.rels, 'boundary');
        await AttrStore.addRecords(boundary.attrs, 'boundary');
    };

    initResouceLayer = layers => {
        const { ResourceLayerStore } = this.props;
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
            const visiteHistory = editVisiteHistory.getVisitedHistory();
            if (visiteHistory.length < 1) {
                e = window.event || e;
                e.returnValue = `确定离开当前页面吗？`;
            }
        };

        // attributes 拾取控件
        const { DataLayerStore } = this.props;
        let boundaryLayers = window.boundaryLayerGroup
            ? window.boundaryLayerGroup.layers
            : [];

        DataLayerStore.initEditor([
            { layer: pointCloudLayer },
            ...vectorLayerGroup.layers,
            { layer: window.trackLayer },
            ...boundaryLayers
        ]);
        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);

        installMapListener();
    };

    selectedCallBack = (result, event) => {
        const {
            PictureShowStore,
            AttributeStore,
            DataLayerStore,
            BatchAssignStore,
            RenderModeStore
        } = this.props;
        const { activeMode, cancelSelect } = RenderModeStore;
        console.log('选中', result, event);
        if (result && result.length > 0) {
            /**
             * 判断是轨迹或轨迹点
             * VectorLayer 轨迹
             * TraceLayer 轨迹点
             */
            if (result[0].type === 'VectorLayer') {
                result.length === 1
                    ? DataLayerStore.pick()
                    : DataLayerStore.unPick();
                this.showAttributesModal(result[0], event);
                this.showRightMenu(result, event);
            } else if (result[0].type === 'TraceListLayer') {
                this.showPictureShowView(result[0]);
                PictureShowStore.show();
            }
            window.currentSelectFeatures = result;
        } else {
            DataLayerStore.unPick();
            AttributeStore.hide();
            switch (activeMode) {
                case 'common':
                    AttributeStore.hideRelFeatures();
                    break;
                case 'relation':
                    cancelSelect();
                    break;
                default:
                    AttributeStore.hideRelFeatures();
                    break;
            }
            window.trackLayer.unSelect();
        }
        BatchAssignStore.hide();
    };

    createdCallBack = async result => {
        const {
            DataLayerStore,
            NewFeatureStore,
            OperateHistoryStore,
            TaskStore
        } = this.props;
        //console.log(result);

        let data;
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                // 解析sdk抛出异常信息
                let arr = result.desc.split(':');
                let desc = arr[arr.length - 1];
                throw new Error(desc);
            }

            data = await DataLayerStore.updateResult(result);
            this.regionCheck(data);

            // 请求id服务，申请id
            data = await NewFeatureStore.init(
                data,
                isManbuildTask(TaskStore.activeTask)
            );
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = {
                type: 'addFeature',
                feature: data.data,
                layerName: data.layerName
            };
            let log = {
                operateHistory: history,
                action: 'addFeature',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            this.showAttributesModal(data);
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(data.uuid);
            }
            message.warning('新建要素失败：' + e.message, 3);
        }

        DataLayerStore.exitEdit();
    };

    editedCallBack = result => {
        const {
            DataLayerStore,
            OperateHistoryStore,
            RightMenuStore,
            TaskStore
        } = this.props;

        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                // 解析sdk抛出异常信息
                let arr = result.desc.split(':');
                let desc = arr[arr.length - 1];
                throw new Error(desc);
            }

            this.regionCheck(result);
            if (DataLayerStore.editType === 'changePoints') {
                message.success('修改形状点完成，需检查数据的关联关系正确性');
            }

            if (!isManbuildTask(TaskStore.activeTask)) {
                result = modUpdStatGeometry(result);
            }

            let history = {
                type: 'updateFeatureRels',
                data: {
                    features: [[oldFeature], [result]]
                }
            };
            let log = {
                operateHistory: history,
                action: 'updateGeometry',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
            AdEmitter.emit('fetchViewAttributeData');
        } catch (e) {
            //恢复要素
            DataLayerStore.updateFeature(oldFeature);
            message.warning('修改要素失败：' + e.message, 3);
        }

        DataLayerStore.exitEdit();
    };

    regionCheck = data => {
        const { DataLayerStore, TaskStore } = this.props;
        let isLocal = TaskStore.activeTask.isLocal;
        if (isLocal) return;
        //判断要素是否在任务范围内
        const elementGeojson = _.cloneDeep(data.data);
        let isInRegion = isRegionContainsElement(
            elementGeojson,
            DataLayerStore.regionGeojson
        );
        if (!isInRegion) {
            throw new Error('绘制失败，请在任务范围内绘制');
        }
    };

    showPictureShowView = obj => {
        const { PictureShowStore, ResourceLayerStore } = this.props;
        const { data } = obj;
        const { properties: activeTrackPoint } = data;
        window.trackLayer.unSelect();
        PictureShowStore.setPicData(obj.data);
        ResourceLayerStore.getTrackPart(activeTrackPoint);
    };

    showAttributesModal = async (obj, event) => {
        //判断没有按住ctrl左击
        if ((event && event.ctrlKey) || (event && event.button === 2)) return;
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            (editLayer && editLayer.layerId !== obj.layerId) || !editLayer;
        DataLayerStore.clearHighLightFeatures();
        AttributeStore.setModel(obj);
        AttributeStore.show(readonly);
    };

    showRightMenu = (features, event) => {
        const { DataLayerStore, RightMenuStore, AttributeStore } = this.props;
        const editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;

        let hasOtherFeature = features.find(
            feature => feature.layerName != layerName
        );

        const isCurrentLayer = layerName && !hasOtherFeature;

        // 左键，加载“右键菜单”，隐藏起来
        // console.log('features', features);
        if (event.button === 0) {
            RightMenuStore.show(
                features,
                {
                    x: event.x,
                    y: event.y
                },
                -1,
                isCurrentLayer
            );
        }

        //右键，加载“右键菜单”，显示出来
        if (event.button === 2) {
            AttributeStore.hide();
            RightMenuStore.show(
                features,
                {
                    x: event.x,
                    y: event.y
                },
                'auto',
                isCurrentLayer
            );
        }
    };

    installRel = url => {
        const { RelStore } = this.props;
        return RelStore.addRecords(url, 'current');
    };

    installAttr = url => {
        const { AttrStore } = this.props;
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
                    onKeyDown={e => this.handleKeyDown(e)}></div>
                {TaskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
                {/* <NewFeatureModal /> */}
            </React.Fragment>
        );
    }
}

export default VizComponent;
