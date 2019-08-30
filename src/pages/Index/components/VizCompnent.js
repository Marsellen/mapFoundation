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
import UnderView from './ToolList/UnderView';
import {
    RESOURCE_LAYER_POINT_CLOUD,
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_TRACE
} from 'src/config/DataLayerConfig';
import MultimediaView from './MultimediaView';

import 'less/components/viz-compnent.less';
import { addClass, removeClass } from '../../../utils/utils';

@inject('taskStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('PictureShowStore')
@inject('RightMenuStore')
@inject('NewFeatureStore')
@inject('OperateHistoryStore')
@inject('RelStore')
@inject('AttrStore')
@observer
class VizCompnent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { taskStore } = this.props;
        const div = document.getElementById('viz');
        window.map = new Map(div);
        taskStore.getTaskFile().then(this.initTask);
    }

    initTask = async task => {
        if (!task) return;
        const { taskStore } = this.props;
        console.time('taskLoad');
        const hide = message.loading('正在加载任务数据...', 0);
        await Promise.all([
            this.initSdkResource(task),
            this.initExResource(task)
        ])
            .then(() => {
                hide();
                message.success('加载完成', 1);
            })
            .catch(e => {
                hide();
                Modal.error({
                    title: '资料加载失败，请确认输入正确路径。',
                    okText: '确定'
                });
                taskStore.tasksPop();
            });
        console.timeEnd('taskLoad');
    };

    initSdkResource = async task => {
        let [pointClouds, vectors, tracks] = await Promise.all([
            this.initPointCloud(task.point_clouds),
            this.initVectors(task.vectors),
            this.initTracks(task.tracks)
        ]);
        this.initResouceLayer([pointClouds, vectors, tracks]);
        this.installListener();
    };

    initExResource = async task => {
        await Promise.all([
            this.initRegion(task.region),
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
        window.vectorLayerGroup = new LayerGroup(vectors);
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
        const vectorLayer = new VectorLayer(regionUrl);
        await map.getLayerManager().addLayer('VectorLayer', vectorLayer);
    };

    initResouceLayer = layers => {
        const { ResourceLayerStore } = this.props;
        layers = layers.filter(layer => !!layer);
        ResourceLayerStore.init(layers);
    };

    installListener = () => {
        //禁用浏览器默认右键菜单
        document.oncontextmenu = function(e) {
            e.preventDefault();
            // return false;
        };
        //监听浏览器即将离开当前页面事件
        window.onbeforeunload = function(e) {
            var e = window.event || e;
            e.returnValue = '确定离开当前页面吗？';
        };

        let viz = document.querySelector('#viz');
        viz.onmousedown = () => {
            addClass(viz, 'ative-viz');
        };

        viz.onmouseup = () => {
            removeClass(viz, 'ative-viz');
        };

        // attributes 拾取控件
        const { DataLayerStore } = this.props;
        DataLayerStore.initEditor();
        DataLayerStore.initMeasureControl();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);
    };

    selectedCallBack = (result, event) => {
        const { PictureShowStore, AttributeStore, DataLayerStore } = this.props;
        // console.log(result, event);
        if (result && result.length > 0) {
            if (event.button === 0) {
                /**
                 * 判断是轨迹或轨迹点
                 * VectorLayer 轨迹
                 * TraceLayer 轨迹点
                 */
                if (result[0].type === 'VectorLayer') {
                    DataLayerStore.pick();
                    this.showAttributesModal(result[0]);
                } else if (result[0].type === 'TraceLayer') {
                    this.showPictureShowView(result[0]);
                    PictureShowStore.show();
                }
            } else if (event.button === 2) {
                this.showRightMenu(result, event);
            }
        } else {
            DataLayerStore.unPick();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            window.traceLayer.unselect();
        }
    };

    createdCallBack = result => {
        const {
            DataLayerStore,
            NewFeatureStore,
            OperateHistoryStore
        } = this.props;
        //console.log(result);
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            message.warning(desc, 3);
            DataLayerStore.clearChoose();
            return;
        }
        DataLayerStore.updateResult(result)
            .then(result => {
                return NewFeatureStore.init(result);
            })
            .then(result => {
                return DataLayerStore.updateFeature(result);
            })
            .then(result => {
                let layerName = result.layerName;
                let feature = result.data;
                OperateHistoryStore.add({
                    type: 'addFeature',
                    feature: feature,
                    layerName: layerName
                });
                this.showAttributesModal(result);
            })
            .catch(e => {
                console.log(e);
                let layer = DataLayerStore.getEditLayer();
                layer.layer.removeFeatureById(result.uuid);
            });
        DataLayerStore.clearChoose();
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
            DataLayerStore.clearChoose();
            return;
        }
        //console.log(result);
        DataLayerStore.clearChoose();
        let oldFeature = RightMenuStore.getFeatures()[0];
        OperateHistoryStore.add({
            type: 'updateFeature',
            oldFeature,
            feature: result,
            layerName: result.layerName,
            uuid: result.uuid
        });
    };

    showPictureShowView = obj => {
        const { PictureShowStore } = this.props;
        PictureShowStore.setPicData(obj.data);
    };

    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly =
            !editLayer || (editLayer && editLayer.layerName !== obj.layerName);
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
        if (layerName && !hasOtherFeature) {
            AttributeStore.hide();
            RightMenuStore.show(features, {
                x: event.x,
                y: event.y,
                layerName
            });
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
        const { taskStore } = this.props;

        return (
            <React.Fragment>
                <div id="viz" key={taskStore.activeTaskId} className="viz-box">
                    <div className="set-compass">
                        <UnderView key="UNDER_VIEW" />
                    </div>
                </div>
                {taskStore.activeTaskId ? <MultimediaView /> : <span />}
                <AttributesModal />
                <RightMenuModal />
                {/* <NewFeatureModal /> */}
            </React.Fragment>
        );
    }
}

export default VizCompnent;
