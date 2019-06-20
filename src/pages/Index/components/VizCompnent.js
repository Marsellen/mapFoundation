import React from 'react';
import {
    Map,
    PointCloudLayer,
    LayerGroup,
    TraceLayer,
    DetectorControl
} from 'addis-viz-sdk';
import { inject, observer } from 'mobx-react';
import AttributesModal from './AttributesModal';
import NewFeatureModal from './NewFeatureModal';

@inject('taskStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('AttributeStore')
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

        this.installListener();
    };

    initPointCloud = pointClouds => {
        if (!pointClouds) {
            return;
        }
        const opts = { type: 'pointcloud', layerId: 'pointcloud' };
        window.pointCloudLayer = new PointCloudLayer(pointClouds, opts);
        map.getLayerManager().addLayer('PointCloudLayer', pointCloudLayer);
        return {
            layerName: '点云',
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
                DataLayerStore.init(layers);
            });
        return {
            layerName: '高精地图',
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
            layerName: '轨迹',
            layer: traceLayer
        };
    };

    initResouceLayer = layers => {
        const { ResourceLayerStore } = this.props;
        layers = layers.filter(layer => !!layer);
        ResourceLayerStore.init(layers);
    };

    installListener = () => {
        // attributes 拾取控件

        const controlManager = map.getControlManager();
        const detector = new DetectorControl();
        controlManager.addControl(detector);
        map.container.addEventListener('click', e => {
            const obj = detector.getActiveFeadtures();
            if (obj.length) {
                console.log(obj[0]);
                this.showAttributesModal(obj[0]);
            }
        });
    };

    showAttributesModal = obj => {
        const { AttributeStore } = this.props;
        AttributeStore.setModel(obj);
        this.attributesModal.showModal();
    };

    handleSave = row => {
        const { AttributeStore } = this.props;
        AttributeStore.setAttributes(row);
    };

    render() {
        const { taskStore } = this.props;

        return (
            <div>
                <div
                    id="viz"
                    key={taskStore.activeTaskId}
                    className="viz-box"
                />
                <AttributesModal
                    handleSave={this.handleSave}
                    onRef={ref => (this.attributesModal = ref)}
                />
                <NewFeatureModal />
            </div>
        );
    }
}

export default VizCompnent;
