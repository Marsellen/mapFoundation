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
import 'less/components/viz-compnent.less';
// import { addClass, removeClass } from '../../../utils/utils';
import BatchAssignModal from './BatchAssignModal';
import {
    regionCheck,
    modUpdStatGeometry,
    checkSdkError
} from 'src/utils/vectorUtils';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { shortcut } from 'src/utils/shortcuts';
import { installMapListener } from 'src/utils/map/event';
import _ from 'lodash';
import editLog from 'src/models/editLog';
import { isManbuildTask } from 'src/utils/taskUtils';
import { editVisiteHistory } from 'src/utils/visiteHistory';
import axios from 'axios';
import { logDecorator } from 'src/utils/decorator';
import RenderModeStore from 'src/pages/Index/store/RenderModeStore';
import ResourceLayerStore from 'src/pages/Index/store/ResourceLayerStore';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';
import PictureShowStore from 'src/pages/Index/store/PictureShowStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';
import NewFeatureStore from 'src/pages/Index/store/NewFeatureStore';
import OperateHistoryStore from 'src/pages/Index/store/OperateHistoryStore';
import RelStore from 'src/pages/Index/store/RelStore';
import AttrStore from 'src/pages/Index/store/AttrStore';
import BatchAssignStore from 'src/pages/Index/store/BatchAssignStore';
import PointCloudStore from 'src/pages/Index/store/PointCloudStore';
import VectorsStore from 'src/pages/Index/store/VectorsStore';
import ToolCtrlStore from 'src/pages/Index/store/ToolCtrlStore';
import {
    showPictureShowView,
    showAttributesModal,
    showRightMenu
} from 'src/utils/map/viewCtrl';

@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('TaskStore')
@observer
class VizComponent extends React.Component {
    constructor(props) {
        super(props);
        //多工程任务资料map，例：{工程名:{track:{},point_clouds:{}}}
        this.multiProjectResource = {};
        //取消请求
        window.controller = new AbortController();
        window.signal = controller.signal;
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
        await this.release();
        const div = document.getElementById('viz');
        window.map = new Map(div);
        const { TaskStore } = this.props;
        await TaskStore.getTaskInfo();
        const task = TaskStore.getTaskFile();
        if (!task) return;
        await this.initTask(task);
    };

    release = async () => {
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

        window.map = null;
    };

    clearWorkSpace = async () => {
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

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
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
        } catch (e) {
            console.log(e);
            hide();
            // 任务列表快速切换时旧任务加载过程会报错
            const { TaskStore } = this.props;
            const { activeTaskId, tasksPop } = TaskStore;
            if (activeTaskId === task.taskId) {
                Modal.error({
                    title: '资料加载失败，请确认输入正确路径。',
                    okText: '确定'
                });
            }
            tasksPop();
        }

        console.timeEnd('taskLoad');
    };

    initEditResource = async task => {
        const { TaskStore } = this.props;
        TaskStore.isEditableTask && this.initBoundary();
        const resources = await Promise.all([
            this.initVectors(task.vectors),
            this.initRegion(task.region),
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

        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { taskScale } =
            AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        taskScale ? window.map.setEyeView(taskScale) : map.setView('U');
    };

    initVectors = async vectors => {
        if (!vectors) {
            return;
        }
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
        const { TaskStore } = this.props;
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
            const { TaskStore } = this.props;
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
            message.warning('周边底图数据加载失败', 3);
        }
    };

    //关联关系模式下，处理底图数据
    handleBoundaryfeature = () => {
        const { RenderModeStore, DefineModeStore } = this.props;
        const {
            whiteRenderMode,
            resetSelectOption,
            setRels,
            activeMode
        } = RenderModeStore;
        const { resetBoundaryStyle } = DefineModeStore;

        switch (activeMode) {
            case 'relation':
                //将重置专题图
                resetSelectOption();
                //周边底图要素，采用配置：HalfWhiteVectorsConfig，半透明白
                whiteRenderMode();
                //将有关联关系的要素，按专题图进行分组
                setRels();
                break;
            case 'define':
                //重置周边底图高精数据图层样式
                resetBoundaryStyle();
                break;
            default:
                break;
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
            const visiteHistory = editVisiteHistory.getVisitedHistory();
            if (visiteHistory.length < 1) {
                e = window.event || e;
                e.returnValue = `确定离开当前页面吗？`;
            }
        };

        // attributes 拾取控件
        let boundaryLayers = window.boundaryLayerGroup
            ? window.boundaryLayerGroup.layers
            : [];
        const vectorLayers = window.vectorLayerGroup
            ? window.vectorLayerGroup.layers
            : [];

        DataLayerStore.initEditor([
            { layer: pointCloudLayer },
            ...vectorLayers,
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
                showAttributesModal(result[0], event);
                showRightMenu(result, event);
            } else if (result[0].type === 'TraceListLayer') {
                showPictureShowView(result[0]);
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

    @logDecorator({ operate: '新建要素' })
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
            // 更新id到sdk
            DataLayerStore.updateFeature(data);
            let history = { features: [[], [data]] };
            showAttributesModal(data);
            return history;
        } catch (e) {
            if (data) {
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(data.uuid);
            }
            message.warning('新建要素失败：' + e.message, 3);
            throw e;
        }
    }

    @logDecorator({ operate: '修改要素几何' })
    editedCallBack(result) {
        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            checkSdkError(result);

            regionCheck(result);
            if (DataLayerStore.editType === 'changePoints') {
                message.success('修改形状点完成，需检查数据的关联关系正确性');
            }

            if (!isManbuildTask()) {
                result = modUpdStatGeometry(result);
            }

            let history = { features: [[oldFeature], [result]] };
            return history;
        } catch (e) {
            //恢复要素
            DataLayerStore.updateFeature(oldFeature);
            message.warning('修改要素失败：' + e.message, 3);
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
                    onKeyDown={e => this.handleKeyDown(e)}></div>
                {TaskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
            </React.Fragment>
        );
    }
}

export default VizComponent;
