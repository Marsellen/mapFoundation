import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    RESOURCE_LAYER_VETOR,
    RESOURCE_LAYER_BOUNDARY,
    RESOURCE_LAYER_POINT_CLOUD
} from 'src/config/DataLayerConfig';

@inject('ResourceLayerStore')
@inject('DataLayerStore')
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
        let { ResourceLayerStore, DataLayerStore } = this.props;
        let onChange = e => {
            ResourceLayerStore.toggle(item.value, e.target.checked);

            if (item.value == RESOURCE_LAYER_VETOR) {
                DataLayerStore.toggleAll(e.target.checked);
            }

            if (item.value == RESOURCE_LAYER_BOUNDARY) {
                DataLayerStore.clearChoose();
            }

            if (item.value == RESOURCE_LAYER_POINT_CLOUD) {
                DataLayerStore.exitReadCoordinate();
            }
        };
        return onChange;
    };
}

export default ResourceLayer;
