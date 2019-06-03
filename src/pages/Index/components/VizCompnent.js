import React from 'react';
import { Map, PointCloudLayer, LayerGroup } from 'addis-viz-sdk';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class VizCompnent extends React.Component {
    componentDidMount() {
        const { taskStore } = this.props;
        taskStore.init(task => {
            const div = document.getElementById("viz");
            const map = new Map(div);
            window.map = map;
            const opts = { type: 'pointcloud', layerId: 'test' }
            const pointCloudLayer = new PointCloudLayer(task.point_clouds, opts);
            map.getLayerManager().addLayer('PointCloudLayer', pointCloudLayer);

            //admap
            const layerGroup = new LayerGroup(task.vectors);
            window.layerGroup = layerGroup;
            map.getLayerManager().addLayerGroup(layerGroup).then((layers) => {
                console.log(layers)
            });
        })
        
    }

    render() {
        return <div id="viz" style={Styles.viz} />;
    }
}

const Styles = {
    viz: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
};

export default VizCompnent;
