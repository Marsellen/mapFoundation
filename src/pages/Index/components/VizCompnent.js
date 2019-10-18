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
    RESOURCE_LAYER_TASK_SCOPE
} from 'src/config/DataLayerConfig';
import MultimediaView from './MultimediaView';
import VectorsConfig from '../../../config/VectorsConfig';
import SDKConfig from '../../../config/SDKConfig';
import 'less/components/viz-compnent.less';
import { addClass, removeClass } from '../../../utils/utils';
import BatchAssignModal from './BatchAssignModal';
import { isRegionContainsElement } from 'src/utils/vectorUtils';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { shortcutMap } from 'src/utils/shortcuts/shortcutsMap';
import Shortcut from 'src/utils/shortcuts';
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
@observer
class VizCompnent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { TaskStore, OperateHistoryStore } = this.props;

        TaskStore.initTask({ type: 4 }).then(() => {
            const { tasks } = TaskStore;

            //清除多余任务比例记录
            const taskIdArr = (tasks || []).map(item => Number(item.taskId));
            AdLocalStorage.filterTaskInfosStorage(taskIdArr);

            if (tasks.length == 0) {
                message.warning('暂无任务', 3);
                return;
            }

            //任务加载完成，添加快捷键
            this.addShortcut();

            OperateHistoryStore.destroy();
            editLog.store.clear();
        });
    }

    componentDidUpdate() {
        const { TaskStore } = this.props;
        const div = document.getElementById('viz');
        window.map = new Map(div);
        let task = TaskStore.getTaskFile();
        this.initTask(task);
    }

    addShortcut = () => {
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
                    DataLayerStore.exitEdit();
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
                    DataLayerStore.exitEdit();
                },
                describe: '开关轨迹图层 2'
            }
        ];
        const shortcut = new Shortcut();
        shortcut.add(shortcutMap);
        shortcut.add(callbackShortcutMap);
    };

    initTask = async task => {
        if (!task) return;
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
                const { TaskStore, DataLayerStore } = this.props;
                const { activeTaskId } = TaskStore;
                const { taskScale } = AdLocalStorage.getTaskInfosStorage(
                    activeTaskId
                );
                taskScale && map.setEyeView(taskScale);

                //获取点云高度范围
                const pointCloudLayerHeightRange = window.pointCloudLayer
                    ? window.pointCloudLayer.getElevationRange()
                    : [];
                DataLayerStore.initPointCloudLayerHeightRange(
                    pointCloudLayerHeightRange
                );
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
        let [pointClouds, vectors, tracks, taskScope] = await Promise.all([
            this.initPointCloud(task.point_clouds),
            this.initVectors(task.vectors),
            this.initTracks(task.tracks),
            this.initRegion(task.region),
            this.initBoundary(task.boundary)
        ]);
        this.initResouceLayer([pointClouds, vectors, tracks, taskScope]);
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
            message.error('作业范围数据加载失败', 3);
        }
    };

    initBoundary = async boundaryUrl => {
        try {
            const { DataLayerStore } = this.props;
            const layerGroup = new LayerGroup(boundaryUrl, {
                styleConifg: SDKConfig
            });
            await map.getLayerManager().addLayerGroup(layerGroup);
            let layers = layerGroup.layers;
            DataLayerStore.initDetectorControl(layers);
            DataLayerStore.setBoundarySelectedCallback(
                this.boundarySelectedCallback
            );
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
            var e = window.event || e;
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
            { layer: traceLayer }
        ]);
        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);

        window.map.getEventManager().register('webglcontextlost', e => {
            let log = {
                action: 'webglcontextlost',
                result: 'fail'
            };
            editLog.store.add(log);
        });

        let viz = document.querySelector('#viz');
        window.map
            .getEventManager()
            .register('editor_event_regionselect_start', e => {
                addClass(viz, 'crosshair-viz');
            });

        window.map
            .getEventManager()
            .register('editor_event_regionselect_end', e => {
                removeClass(viz, 'crosshair-viz');
            });
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
                this.modalType = 'vector';
                this.showAttributesModal(result[0], event);
            } else if (result[0].type === 'TraceLayer') {
                this.showPictureShowView(result[0]);
                PictureShowStore.show();
            }

            this.showRightMenu(result, event);
        } else {
            if (this.modalType == 'boundary') return;
            this.modalType = null;
            DataLayerStore.unPick();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            window.traceLayer.unselect();
        }
        BatchAssignStore.hide();
    };

    createdCallBack = result => {
        const {
            DataLayerStore,
            NewFeatureStore,
            OperateHistoryStore
        } = this.props;
        //console.log(result);

        //判断是否绘制成功
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            message.warning(desc, 3);
            DataLayerStore.exitEdit();
            return;
        }

        DataLayerStore.updateResult(result)
            .then(data => {
                //判断要素是否在任务范围内
                const elementGeojson = _.cloneDeep(data.data);
                const isInRegion = isRegionContainsElement(
                    elementGeojson,
                    DataLayerStore.regionGeojson
                );
                if (!isInRegion) {
                    message.warning('请在任务范围内绘制要素');
                    DataLayerStore.exitEdit();
                    let layer = DataLayerStore.getEditLayer();
                    layer.layer.removeFeatureById(data.uuid);
                    return false;
                }
                return NewFeatureStore.init(data);
            })
            .then(data => {
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
            })
            .catch(e => {
                console.log(e);
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(result.uuid);
            });
        DataLayerStore.exitEdit();
    };

    editedCallBack = result => {
        const {
            DataLayerStore,
            OperateHistoryStore,
            RightMenuStore
        } = this.props;

        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            message.warning(desc, 3);
            DataLayerStore.exitEdit();
            return;
        }

        const oldFeature = RightMenuStore.getFeatures()[0];

        //修改形状点时，判断要素不在任务范围内，则撤销本次操作
        if (DataLayerStore.editType === 'changePoints') {
            const elementGeojson = _.cloneDeep(result.data);
            const isInRegion = isRegionContainsElement(
                elementGeojson,
                DataLayerStore.regionGeojson
            );
            if (!isInRegion) {
                message.warning('请在任务范围内绘制要素');
                //恢复要素
                DataLayerStore.updateFeature(oldFeature);
                DataLayerStore.exitEdit();
                return false;
            }
        }

        DataLayerStore.exitEdit();
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
    };

    boundarySelectedCallback = result => {
        const { AttributeStore, DataLayerStore } = this.props;
        if (result && result.length > 0) {
            DataLayerStore.unPick();
            AttributeStore.setModel(result[0]);
            AttributeStore.show(true);
            this.modalType = 'boundary';
        } else {
            // 强行更改执行顺序，使之在任务数据点击事件触发后执行
            setTimeout(() => {
                if (this.modalType == 'boundary') {
                    this.modalType = null;
                    AttributeStore.hide();
                }
            });
        }
    };

    showPictureShowView = obj => {
        const { PictureShowStore } = this.props;
        window.traceLayer.unselect();
        PictureShowStore.setPicData(obj.data);
    };

    showAttributesModal = (obj, event) => {
        //判断没有按住ctrl左击
        if ((event && event.ctrlKey) || (event && event.button === 2)) return;
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            !editLayer || (editLayer && editLayer.layerName !== obj.layerName);
        AttributeStore.show(readonly);
        AttributeStore.setModel(obj);
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

        let userInfo = appStore.loginUser;
        if (userInfo.roleCode == 'producer' && layerName == 'AD_Map_QC') {
            return;
        }

        let hasOtherFeature = features.find(
            feature => feature.layerName != layerName
        );

        const isCurrentLayer = layerName && !hasOtherFeature;

        // 左键，加载“右键菜单”，隐藏起来
        console.log('features', features);
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
                <div id="viz" key={TaskStore.activeTaskId} className="viz-box">
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
