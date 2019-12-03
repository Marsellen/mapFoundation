import React from 'react';
import {
    Map,
    PointCloudLayer,
    LayerGroup,
    TraceLayer,
    VectorLayer
} from 'addis-viz-sdk';
import { Modal, message } from 'antd';
import { inject, observer } from 'mobx-react';
import AttributesModal from './AttributesModal';
//import NewFeatureModal from './NewFeatureModal';
import RightMenuModal from './RightMenuModal';
import ZoomIn from './ToolList/ZoomIn';
import ZoomOut from './ToolList/ZoomOut';
import UnderView from './ToolList/UnderView';
import TopView from './ToolList/TopView';
import {
    RESOURCE_LAYER_POINT_CLOUD,
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_TRACE,
    RESOURCE_LAYER_TASK_SCOPE,
    RESOURCE_LAYER_BOUNDARY
} from 'src/config/DataLayerConfig';
import MultimediaView from './MultimediaView';
import VectorsConfig from '../../../config/VectorsConfig';
import SDKConfig from '../../../config/SDKConfig';
import 'less/components/viz-compnent.less';
// import { addClass, removeClass } from '../../../utils/utils';
import BatchAssignModal from './BatchAssignModal';
import { isRegionContainsElement } from 'src/utils/vectorUtils';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { shortcut } from 'src/utils/shortcuts';
import { installMapListener } from 'src/utils/map/event';
import _ from 'lodash';
import editLog from 'src/models/editLog';
import SaveTimeView from './SaveTimeView';

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
@inject('appStore')
@inject('BatchAssignStore')
@inject('PointCloudStore')
@observer
class VizCompnent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { TaskStore } = this.props;

        TaskStore.initTask({ type: 4 }).then(() => {
            const { tasks } = TaskStore;

            //清除多余任务比例记录
            const taskIdArr = (tasks || []).map(item => Number(item.taskId));
            AdLocalStorage.filterTaskInfosStorage(taskIdArr);
        });
    }

    componentDidUpdate() {
        const { TaskStore } = this.props;
        let task = TaskStore.getTaskFile();
        if (!task) return;
        const div = document.getElementById('viz');
        window.map = new Map(div);
        this.initTask(task);
    }

    addShortcut = event => {
        const { ResourceLayerStore, DataLayerStore } = this.props;
        const callbackShortcutMap = [
            {
                ctrl: false,
                alt: false,
                shift: false,
                keyCode: 49,
                callback: () => {
                    event.preventDefault();
                    event.stopPropagation();
                    ResourceLayerStore.toggle(
                        RESOURCE_LAYER_POINT_CLOUD,
                        true,
                        true
                    );
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
                    ResourceLayerStore.toggle(RESOURCE_LAYER_VETOR, true, true);
                    DataLayerStore.toggleAll(true);
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
        const hide = message.loading('正在加载任务数据...', 0);
        await Promise.all([
            this.initEditResource(task),
            this.initExResource(task)
        ])
            .then(() => {
                hide();
                message.success('任务加载成功', 1);

                //获取任务比例记录，设置比例
                const { TaskStore, PointCloudStore } = this.props;
                const { activeTaskId } = TaskStore;
                const { taskScale } = AdLocalStorage.getTaskInfosStorage(
                    activeTaskId
                );
                taskScale && map.setEyeView(taskScale);

                //获取点云高度范围
                const range = window.pointCloudLayer
                    ? window.pointCloudLayer.getElevationRange()
                    : [];
                PointCloudStore.initHeightRange(range);
            })
            .catch(e => {
                console.log(e);
                hide();
                Modal.error({
                    title: '资料加载失败，请确认输入正确路径。',
                    okText: '确定'
                });
            });
        console.timeEnd('taskLoad');
    };

    initEditResource = async task => {
        let resources = await Promise.all([
            this.initPointCloud(task.point_clouds),
            this.initVectors(task.vectors),
            this.initTracks(task.tracks),
            this.initRegion(task.region),
            this.initBoundary(task.boundary)
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

    initPointCloud = pointClouds => {
        if (!pointClouds) {
            return;
        }
        return new Promise((resolve, reject) => {
            const opts = { type: 'pointcloud', layerId: 'pointcloud' };
            window.pointCloudLayer = new PointCloudLayer(pointClouds, opts);
            map.getLayerManager().addLayer(
                'PointCloudLayer',
                pointCloudLayer,
                result => {
                    if (!result || result.code === 404) {
                        reject(result);
                    } else {
                        resolve({
                            layerName: RESOURCE_LAYER_POINT_CLOUD,
                            layer: pointCloudLayer
                        });
                    }
                }
            );
        });
    };

    initVectors = async vectors => {
        if (!vectors) {
            return;
        }
        const { DataLayerStore } = this.props;
        window.vectorLayerGroup = new LayerGroup(vectors, {
            styleConifg: VectorsConfig
        });
        await map.getLayerManager().addLayerGroup(vectorLayerGroup);
        let layers = vectorLayerGroup.layers;
        DataLayerStore.init(layers);

        return {
            layerName: RESOURCE_LAYER_VETOR,
            layer: vectorLayerGroup
        };
    };

    initTracks = async tracks => {
        if (!tracks || tracks.length == 0) {
            return;
        }
        window.traceLayer = new TraceLayer(tracks);
        await map.getLayerManager().addLayer('TraceLayer', traceLayer);
        return {
            layerName: RESOURCE_LAYER_TRACE,
            layer: traceLayer
        };
    };

    initRegion = async regionUrl => {
        try {
            const { DataLayerStore } = this.props;
            const vectorLayer = new VectorLayer(regionUrl);
            vectorLayer.setDefaultStyle({ color: '#00FF00' });
            await map.getLayerManager().addLayer('VectorLayer', vectorLayer);
            //保存任务范围geojson
            const getRegionRes = vectorLayer.getVectorData();
            DataLayerStore.setRegionGeojson(getRegionRes.features[0]);

            return {
                layerName: RESOURCE_LAYER_TASK_SCOPE,
                layer: vectorLayer
            };
        } catch (e) {
            console.log(e);
            message.error('作业范围数据加载失败', 3);
        }
    };

    initBoundary = async boundaryUrl => {
        try {
            window.boundaryLayerGroup = new LayerGroup(boundaryUrl, {
                styleConifg: SDKConfig
            });
            await map.getLayerManager().addLayerGroup(boundaryLayerGroup);

            return {
                layerName: RESOURCE_LAYER_BOUNDARY,
                layer: boundaryLayerGroup
            };
        } catch (e) {
            console.log(e);
            message.error('作业边界数据加载失败', 3);
        }
    };

    initResouceLayer = layers => {
        const { ResourceLayerStore } = this.props;
        layers = layers.filter(layer => !!layer);
        ResourceLayerStore.init(layers);
    };

    installListener = () => {
        const { TaskStore } = this.props;

        //禁用浏览器默认右键菜单
        document.oncontextmenu = function(e) {
            e.preventDefault();
            // return false;
        };

        //监听浏览器即将离开当前页面事件
        window.onbeforeunload = function(e) {
            e = window.event || e;
            e.returnValue = `确定离开当前页面吗？`;

            //保存当前任务比例
            const { activeTaskId } = TaskStore;
            const preTaskScale = map.getEyeView();
            AdLocalStorage.setTaskInfosStorage({
                taskId: activeTaskId,
                taskScale: preTaskScale
            });
        };

        // attributes 拾取控件
        const { DataLayerStore } = this.props;
        DataLayerStore.initEditor([
            { layer: pointCloudLayer },
            ...vectorLayerGroup.layers,
            { layer: traceLayer },
            ...boundaryLayerGroup.layers
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
            BatchAssignStore
        } = this.props;
        // console.log(result, event);
        if (result && result.length > 0) {
            /**
             * 判断是轨迹或轨迹点
             * VectorLayer 轨迹
             * TraceLayer 轨迹点
             */
            if (result[0].type === 'VectorLayer') {
                DataLayerStore.pick();
                this.showAttributesModal(result[0], event);
                this.showRightMenu(result, event);
            } else if (result[0].type === 'TraceLayer') {
                this.showPictureShowView(result[0]);
                PictureShowStore.show();
            }
        } else {
            DataLayerStore.unPick();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            window.traceLayer.unselect();
        }
        BatchAssignStore.hide();
    };

    createdCallBack = async result => {
        const {
            DataLayerStore,
            NewFeatureStore,
            OperateHistoryStore
        } = this.props;
        //console.log(result);

        let data;
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                // 解析sdk抛出异常信息
                let arr = result.desc.split(':');
                let desc = arr[arr.length - 1];
                throw desc;
            }

            data = await DataLayerStore.updateResult(result);
            this.regionCheck(data);

            // 请求id服务，申请id
            data = await NewFeatureStore.init(data);
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
            message.warning(e);
        }

        DataLayerStore.exitEdit();
    };

    editedCallBack = result => {
        const {
            DataLayerStore,
            OperateHistoryStore,
            RightMenuStore
        } = this.props;

        const oldFeature = RightMenuStore.getFeatures()[0];
        try {
            //判断是否绘制成功
            if (result.errorCode) {
                // 解析sdk抛出异常信息
                let arr = result.desc.split(':');
                let desc = arr[arr.length - 1];
                throw desc;
            }

            this.regionCheck(result);

            let history = {
                type: 'updateFeature',
                oldFeature,
                feature: result,
                layerName: result.layerName,
                uuid: result.uuid
            };
            let log = {
                operateHistory: history,
                action: 'updateGeometry',
                result: 'success'
            };
            OperateHistoryStore.add(history);
            editLog.store.add(log);
        } catch (e) {
            //恢复要素
            DataLayerStore.updateFeature(oldFeature);
            message.warning(e);
        }

        DataLayerStore.exitEdit();
    };

    regionCheck = data => {
        const { DataLayerStore } = this.props;
        //判断要素是否在任务范围内
        const elementGeojson = _.cloneDeep(data.data);
        let isInRegion = isRegionContainsElement(
            elementGeojson,
            DataLayerStore.regionGeojson
        );
        if (!isInRegion) {
            throw '请在任务范围内绘制要素';
        }
    };

    showPictureShowView = obj => {
        const { PictureShowStore } = this.props;
        window.traceLayer.unselect();
        PictureShowStore.setPicData(obj.data);
    };

    showAttributesModal = async (obj, event) => {
        //判断没有按住ctrl左击
        if ((event && event.ctrlKey) || (event && event.button === 2)) return;
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            (editLayer && editLayer.layerId !== obj.layerId) || !editLayer;

        await AttributeStore.setModel(obj);
        AttributeStore.show(readonly);
    };

    showRightMenu = (features, event) => {
        const {
            DataLayerStore,
            RightMenuStore,
            AttributeStore,
            appStore
        } = this.props;
        const editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let layerId = editLayer && editLayer.layerId;

        let userInfo = appStore.loginUser;
        if (userInfo.roleCode == 'producer' && layerName == 'AD_Map_QC') {
            return;
        }

        let hasOtherFeature = features.find(
            feature => feature.layerId != layerId
        );

        const isCurrentLayer = layerName && !hasOtherFeature;

        // 左键，加载“右键菜单”，隐藏起来
        // console.log('features', features);
        if (event.button === 0) {
            RightMenuStore.show(
                features,
                {
                    x: event.x,
                    y: event.y,
                    layerName
                },
                -1,
                isCurrentLayer
            );
        }

        //右键，加载“右键菜单”，显示出来
        if (event.button === 2) {
            if (isCurrentLayer) {
                AttributeStore.hide();
                RightMenuStore.show(
                    features,
                    {
                        x: event.x,
                        y: event.y,
                        layerName
                    },
                    'auto',
                    isCurrentLayer
                );
            } else {
                message.warning('只能选取当前编辑图层要素！', 3);
            }
        }
    };

    installRel = url => {
        const { RelStore } = this.props;
        return RelStore.init(url);
    };

    installAttr = url => {
        const { AttrStore } = this.props;
        return AttrStore.init(url);
    };

    render() {
        const { TaskStore } = this.props;

        return (
            <React.Fragment>
                <div
                    id="viz"
                    key={TaskStore.activeTaskId}
                    className="viz-box"
                    onKeyDown={e => this.handleKeyDown(e)}>
                    <div className="set-compass">
                        <TopView key="TOP_VIEW" />
                        <ZoomOut key="ZOOM_OUT" />
                        <ZoomIn key="ZOOM_IN" />
                        <UnderView key="UNDER_VIEW" />
                    </div>
                    <SaveTimeView />
                </div>
                {TaskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                <BatchAssignModal />
                {/* <NewFeatureModal /> */}
            </React.Fragment>
        );
    }
}

export default VizCompnent;
