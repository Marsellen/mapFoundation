import React from 'react';
import { Map, PointCloudLayer, LayerGroup, TraceLayer } from 'addis-viz-sdk';
import { Modal } from 'antd';
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

@inject('taskStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('PictureShowStore')
@inject('RightMenuStore')
@inject('NewFeatureStore')
@inject('OperateHistoryStore')
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

    initTask = task => {
        const { taskStore } = this.props;
        Promise.all([
            this.initPointCloud(task.point_clouds),
            this.initVectors(task.vectors),
            this.initTracks(task.tracks)
        ])
            .then(results => {
                let [pointClouds, vectors, tracks] = results;
                this.initResouceLayer([pointClouds, vectors, tracks]);
            })
            .catch(e => {
                Modal.error({
                    title: '资料加载失败，请确认输入正确路径。',
                    okText: '确定'
                });
                taskStore.tasksPop();
            });
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

    initVectors = vectors => {
        if (!vectors) {
            return;
        }
        const { DataLayerStore } = this.props;
        return new Promise((resolve, reject) => {
            const layerGroup = new LayerGroup(vectors);
            map.getLayerManager()
                .addLayerGroup(layerGroup)
                .then(layers => {
                    map.setView('U'); // TODO 默认加载为俯视角 需要sdk提供默认初始化视角接口
                    DataLayerStore.init(layers);
                    this.installListener();
                });
            resolve({
                layerName: RESOURCE_LAYER_VETOR,
                layer: layerGroup
            });
        });
    };

    initTracks = tracks => {
        if (!tracks || tracks.length == 0) {
            return;
        }
        return new Promise((resolve, reject) => {
            window.traceLayer = new TraceLayer(tracks);
            map.getLayerManager().addLayer('TraceLayer', traceLayer);
            resolve({
                layerName: RESOURCE_LAYER_TRACE,
                layer: traceLayer
            });
        });
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
      
        // attributes 拾取控件
        const { DataLayerStore } = this.props;
        DataLayerStore.initEditor();
        DataLayerStore.setSelectedCallBack(this.selectedCallBack);
        DataLayerStore.setCreatedCallBack(this.createdCallBack);
        DataLayerStore.setEditedCallBack(this.editedCallBack);
    };

    selectedCallBack = (result, event) => {
        const { PictureShowStore, AttributeStore } = this.props;
        // console.log(result, event);
        if (result && result.length > 0) {
            if (event.button === 0) {
                /**
                 * 判断是轨迹或轨迹点
                 * VectorLayer 轨迹
                 * TraceLayer 轨迹点
                 */
                if (result[0].type === 'VectorLayer') {
                    this.showAttributesModal(result[0]);
                } else if (result[0].type === 'TraceLayer') {
                    this.showPictureShowView(result[0]);
                    PictureShowStore.show();
                }
            } else if (event.button === 2) {
                this.showRightMenu(result[0], event);
            }
        } else {
            if (event.button === 0) {
                AttributeStore.hide();
                window.traceLayer.unselect();
            }
        }
    };

    createdCallBack = result => {
        const {
            DataLayerStore,
            NewFeatureStore,
            OperateHistoryStore
        } = this.props;
        DataLayerStore.setPointSize(0.5);
        //console.log(result);
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            Modal.error({
                title: desc,
                okText: '确定'
            });
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
    };

    editedCallBack = result => {
        if (result.errorCode) {
            let arr = result.desc.split(':');
            let desc = arr[arr.length - 1];
            Modal.error({
                title: desc,
                okText: '确定'
            });
            return;
        }
        const {
            DataLayerStore,
            OperateHistoryStore,
            RightMenuStore
        } = this.props;
        //console.log(result);
        DataLayerStore.setPointSize(0.5);
        let oldFeature = RightMenuStore.getFeature();
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

    showRightMenu = (obj, event) => {
        const { DataLayerStore, RightMenuStore, AttributeStore } = this.props;
        const editLayer = DataLayerStore.getEditLayer();
        if (editLayer && editLayer.layerName == obj.layerName) {
            AttributeStore.hide();
            RightMenuStore.show(obj, {
                x: event.x,
                y: event.y,
                layerName: obj.layerName
            });
        }
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
