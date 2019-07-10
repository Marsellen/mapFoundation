import React from 'react';
import { Map, PointCloudLayer, LayerGroup, TraceLayer } from 'addis-viz-sdk';
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
@inject('RightMenuStore')
@observer
class VizCompnent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { taskStore } = this.props;
        const div = document.getElementById('viz');
        window.map = new Map(div);
        taskStore.getTaskFile(this.initTask);
    }

    initTask = task => {
        let pointClouds = this.initPointCloud(task.point_clouds);
        let vectors = this.initVectors(task.vectors);
        let tracks = this.initTracks(task.tracks);

        this.initResouceLayer([pointClouds, vectors, tracks]);
    };

    initPointCloud = pointClouds => {
        if (!pointClouds) {
            return;
        }
        const opts = { type: 'pointcloud', layerId: 'pointcloud' };
        window.pointCloudLayer = new PointCloudLayer(pointClouds, opts);
        map.getLayerManager().addLayer('PointCloudLayer', pointCloudLayer);
        return {
            layerName: RESOURCE_LAYER_POINT_CLOUD,
            layer: pointCloudLayer
        };
    };

    initVectors = vectors => {
        if (!vectors) {
            return;
        }
        const { DataLayerStore } = this.props;
        const layerGroup = new LayerGroup(vectors);
        map.getLayerManager()
            .addLayerGroup(layerGroup)
            .then(layers => {
                map.setView('U'); // TODO 默认加载为俯视角 需要sdk提供默认初始化视角接口
                DataLayerStore.init(layers);
                this.installListener();
            });
        return {
            layerName: RESOURCE_LAYER_VETOR,
            layer: layerGroup
        };
    };

    initTracks = tracks => {
        if (!tracks || tracks.length == 0) {
            return;
        }
        let traceLayer = new TraceLayer(tracks);
        map.getLayerManager().addTraceLayer(traceLayer);
        return {
            layerName: RESOURCE_LAYER_TRACE,
            layer: traceLayer
        };
    };

    initResouceLayer = layers => {
        const { ResourceLayerStore } = this.props;
        layers = layers.filter(layer => !!layer);
        ResourceLayerStore.init(layers);
    };

    installListener = () => {
        //禁用浏览器默认右键菜单
        document.oncontextmenu = function(e) {
            return false;
        };

        // attributes 拾取控件
        const {
            DataLayerStore,
            RightMenuStore,
            AttributeStore
        } = this.props;
        DataLayerStore.initEditor((result, event) => {
            //console.log(result, event);
            if (result && result.length > 0) {
                if (event.button === 0) {
                    this.showAttributesModal(result[0]);
                } else if (event.button === 2) {
                    RightMenuStore.show(result[0], {
                        x: event.x,
                        y: event.y
                    });
                }
            } else {
                if (event.button === 0) {
                    AttributeStore.hide();
                }
            }
        });
    };

    showAttributesModal = obj => {
        const { AttributeStore, DataLayerStore } = this.props;
        let editLayer = DataLayerStore.getEditLayer();
        let readonly = !editLayer;
        AttributeStore.setModel(obj);
        AttributeStore.show(readonly);
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
