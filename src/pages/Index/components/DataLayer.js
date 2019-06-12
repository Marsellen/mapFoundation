import React from 'react';
import { Checkbox, List } from 'antd';
import { inject, observer } from 'mobx-react';

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
                            onChange={this.changeEvent(item)}>
                            {item.label}
                        </Checkbox>
                    </div>
                )}
            />
        );
    }

    changeEvent = item => {
        let { DataLayerStore, ResourceLayerStore } = this.props;
        let onChange = e => {
            DataLayerStore.toggle(item.value, e.target.checked);
            if (e.target.checked) {
                ResourceLayerStore.showVertor();
            }
        };
        return onChange;
    };
}

export default DataLayer;