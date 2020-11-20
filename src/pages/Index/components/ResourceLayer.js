import React from 'react';
import { Checkbox, List, Switch } from 'antd';
import { inject, observer } from 'mobx-react';
import {
    RESOURCE_LAYER_VECTOR,
    RESOURCE_LAYER_BOUNDARY,
    CONFIDENCE_LAYER
} from 'src/config/DataLayerConfig';
import 'src/assets/less/components/resource-layer.less';
import AdTree from 'src/components/AdTree';

@inject('AttributeStore')
@inject('ResourceLayerStore')
@inject('DataLayerStore')
@inject('VectorsStore')
@observer
class ResourceLayer extends React.Component {
    render() {
        const { ResourceLayerStore } = this.props;
        const { updateKey, layers } = ResourceLayerStore;

        return (
            <div>
                <List key={updateKey} dataSource={layers} renderItem={this.renderItem} />
            </div>
        );
    }

    renderItem = (item, index) => {
        const { ResourceLayerStore } = this.props;
        const { multiProjectMap, toggleProjectsStretch } = ResourceLayerStore;

        switch (item.value) {
            case '多工程':
                return (
                    <AdTree
                        handleStretch={toggleProjectsStretch}
                        dataSource={multiProjectMap}
                        onChange={this.handleProjectsChange}
                    />
                );
            case RESOURCE_LAYER_VECTOR:
            case RESOURCE_LAYER_BOUNDARY:
                return this.renderCheckSwitch(item, index);
            case CONFIDENCE_LAYER:
                return this.renderConfidence(item);
            default:
                return this.renderCheck(item, index);
        }
    };

    renderCheck = (item, index) => {
        const { value, checked } = item;
        return (
            <div key={`resource_${index}`}>
                <Checkbox
                    value={value}
                    checked={checked}
                    onChange={e => this.handleChange(e, item)}
                >
                    {value}
                </Checkbox>
            </div>
        );
    };

    renderCheckSwitch = (item, index) => {
        const { value, checked, disabled } = item;
        return (
            <div key={`resource_${index}`} className="flex flex-row flex-start-center">
                <Checkbox
                    className="flex flex-1"
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={e => this.handleChange(e, item)}
                >
                    {value}
                </Checkbox>
                <Switch
                    size="small"
                    checked={!disabled}
                    onChange={this.handleSwitchChange.bind(this, item)}
                />
            </div>
        );
    };

    renderConfidence = item => {
        const { value, checked, children } = item;
        return (
            <React.Fragment>
                <Checkbox
                    value={value}
                    checked={checked}
                    onChange={e => this.handleConfidenceChange(e, value)}
                >
                    {value}
                </Checkbox>
                <div className="multi-project-item">
                    {children.map(({ value, checked, disabled }) => (
                        <div key={value}>
                            <Checkbox
                                value={value}
                                checked={checked}
                                disabled={disabled}
                                onChange={e => this.handleConfidenceChange(e, value)}
                            >
                                {value}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    };

    handleProjectsChange = (e, key) => {
        const { ResourceLayerStore, DataLayerStore } = this.props;
        const { checked } = e.target;
        DataLayerStore.exitReadCoordinate();
        ResourceLayerStore.toggleProjectsChecked(key, checked);
    };

    handleChange = (e, layerItem) => {
        const { ResourceLayerStore, VectorsStore } = this.props;
        const { toggle } = ResourceLayerStore;
        const { toggleAll } = VectorsStore;
        const { checked } = e.target;
        const { value } = layerItem;

        switch (value) {
            case RESOURCE_LAYER_VECTOR: //高精地图
                toggleAll(checked, 'vector');
                toggle(value, checked);
                break;
            case RESOURCE_LAYER_BOUNDARY: //周边底图
                toggleAll(checked, 'boundary');
                toggle(value, checked);
                break;
            default:
                toggle(value, checked);
                break;
        }
    };

    handleSwitchChange = (item, checked) => {
        const { ResourceLayerStore, VectorsStore } = this.props;
        ResourceLayerStore.switchToggle(item.value, !checked);
        if (item.value === RESOURCE_LAYER_VECTOR) {
            VectorsStore.switchToggle(!checked, 'vector');
        } else if (item.value === RESOURCE_LAYER_BOUNDARY) {
            VectorsStore.switchToggle(!checked, 'boundary');
        }
    };

    handleConfidenceChange = (e, value) => {
        const { ResourceLayerStore } = this.props;
        const { checked } = e.target;
        ResourceLayerStore.toggleConfidenceLayer(checked, value);
    };
}

export default ResourceLayer;
