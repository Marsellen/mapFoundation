import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_POINT_CLOUD
} from 'src/config/DataLayerConfig';

@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('VectorsStore')
@observer
class ResourceLayer extends React.Component {
    render() {
        let { ResourceLayerStore } = this.props;

        return (
            <List
                key={ResourceLayerStore.updateKey}
                dataSource={ResourceLayerStore.layers}
                renderItem={item => (
                    <div>
                        <Checkbox
                            value={item.value}
                            checked={item.checked}
                            onChange={this.changeEvent(item)}>
                            {item.value}
                        </Checkbox>
                    </div>
                )}
            />
        );
    }

    changeEvent = item => {
        const { ResourceLayerStore, DataLayerStore, VectorsStore } = this.props;
        const { toggleAll } = VectorsStore;
        const onChange = e => {
            const { checked } = e.target;

            ResourceLayerStore.toggle(item.value, checked);

            switch (item.value) {
                case RESOURCE_LAYER_VECTOR: //高精地图
                    toggleAll(checked, RESOURCE_LAYER_VECTOR);
                    break;
                case RESOURCE_LAYER_BOUNDARY: //周边底图
                    toggleAll(checked, RESOURCE_LAYER_BOUNDARY);
                    DataLayerStore.clearPick();
                    break;
                case RESOURCE_LAYER_POINT_CLOUD: //点云
                    DataLayerStore.exitReadCoordinate();
                    break;
                default:
                    break;
            }
        };
        return onChange;
    };
}

export default ResourceLayer;
