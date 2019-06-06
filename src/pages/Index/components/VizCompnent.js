import React from 'react';
import { Map, PointCloudLayer, LayerGroup } from 'addis-viz-sdk';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@observer
class VizCompnent extends React.Component {
    componentDidUpdate() {
        const { taskStore, ResourceLayerStore, DataLayerStore } = this.props;
        taskStore.getTaskFile(task => {
            const div = document.getElementById('viz');
            const map = new Map(div);
            window.map = map;
            const opts = { type: 'pointcloud', layerId: 'test' };
            const pointCloudLayer = new PointCloudLayer(
                task.point_clouds,
                opts
            );
            map.getLayerManager().addLayer('PointCloudLayer', pointCloudLayer);

            //admap
            const layerGroup = new LayerGroup(task.vectors);
            map.getLayerManager()
                .addLayerGroup(layerGroup)
                .then(layers => {
                    DataLayerStore.init(layers);
                });
            ResourceLayerStore.init([
                {
                    layerId: 'pointcloud',
                    layerName: '点云',
                    layer: pointCloudLayer
                },
                {
                    layerId: 'vector',
                    layerName: '高精地图',
                    layer: layerGroup
                }
            ]);
        });
    }

    render() {
        const { taskStore } = this.props;
        return (
            <div id="viz" key={taskStore.activeTaskId} className="viz-box" />
        );
    }
}

export default VizCompnent;
