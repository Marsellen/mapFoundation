import React from 'react';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';
import { VectorLayer } from 'addis-viz-sdk';

@inject('TaskStore')
@observer
class ViewNeighbor extends React.Component {
    regions = [];
    state = { active: false };

    render() {
        const { TaskStore } = this.props;
        const { active } = this.state;
        const { activeTaskId } = TaskStore;
        return (
            <ToolIcon
                id="neighbor"
                icon="block"
                title="获取周边任务信息"
                action={this.action}
                visible={active}
                disabled={!activeTaskId}
            />
        );
    }

    action = async () => {
        const { active } = this.state;
        if (active) {
            for (let layer of this.regions) {
                layer.offsetMap(window.map);
                let layers = window.map.getLayerManager().vectorLayers;
                layers = layers.filter(l => l.layerId !== layer.uuid);
            }
            this.regions = [];
            this.setState({ active: false });
        } else {
            const { TaskStore } = this.props;
            const { activeTask } = TaskStore;
            const { Input_imp_data_path, taskId } = activeTask;
            let { data, message: errMessage } = await TaskStore.getNeighbor();
            if (!data || !data.taskList) {
                message.error(errMessage);
                return;
            }
            for (let regionItem of data.taskList) {
                const { region, ...info } = regionItem;
                const regionUrl = Input_imp_data_path.replace(taskId, region);
                console.log(regionUrl);
                let vectorLayer = new VectorLayer(regionUrl, {
                    layerConfig: {
                        textStyle: {
                            showMode: 'polygon-center',
                            defaultStyle: {
                                textFields: ['taskId', 'status', 'user'],
                                interval: 10,
                                showMode: 'polygon-center',
                                fontSize: 40,
                                strokeColor: 'rgba(0,0,0,1)',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                textColor: 'rgba(255,255,255,1)'
                            },
                            taskId: [],
                            status: [],
                            user: []
                        },
                        textFields: ['taskId', 'status', 'user'],
                        showStyles: ['vectorStyle', 'textStyle']
                    }
                });
                vectorLayer.setDefaultStyle({ color: 'rgb(16,201,133)', opacity: 0.5 });
                this.regions.push(vectorLayer);
                await window.map.getLayerManager().addLayer('VectorLayer', vectorLayer);
                for (let feature of vectorLayer.shapeNode.children) {
                    feature.properties.data.properties = info;
                }
                vectorLayer.updateFeatures(vectorLayer.shapeNode.children.map(i => i.properties));
            }
            this.setState({ active: true });
        }
    };
}

export default ViewNeighbor;
