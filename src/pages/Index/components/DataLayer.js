import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

@inject('ResourceLayerStore')
@inject('DataLayerStore')
@observer
class DataLayer extends React.Component {
    render() {
        let { DataLayerStore } = this.props;
        return (
            <List
                key={DataLayerStore.updateKey}
                dataSource={DataLayerStore.layers}
                renderItem={item => (
                    <div>
                        <Checkbox
                            value={item.value}
                            checked={item.checked}
                            onChange={e => {
                                this.changeEvent(item, e.target.checked);
                            }}>
                            {DATA_LAYER_MAP[item.value]
                                ? DATA_LAYER_MAP[item.value].label
                                : item.value}
                        </Checkbox>
                    </div>
                )}
            />
        );
    }

    changeEvent = (item, value) => {
        let { DataLayerStore, ResourceLayerStore } = this.props;
        DataLayerStore.toggle(item.value, value);
        let state = DataLayerStore.hasShow() !== -1;
        ResourceLayerStore.toggleVertor(state);
    };
}

export default DataLayer;
