import React from 'react';
import { Popover, Tooltip, Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import IconFont from 'src/components/IconFont';

@inject('taskStore')
@observer
class EditLayer extends React.Component {
    state = {
        clicked: false,
        hovered: false
    };

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false
        });
    };

    handleHoverChange = visible => {
        if (!this.state.clicked) {
            this.setState({
                hovered: visible
            });
        }
    };

    handleClickChange = visible => {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        if (!activeTaskId) return;
        this.setState({
            clicked: visible,
            hovered: false
        });
    };
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return (
            <Popover
                content={this._renderContent()}
                trigger="click"
                visible={this.state.clicked}
                onVisibleChange={this.handleClickChange}>
                <Tooltip
                    placement="bottom"
                    title="设置编辑图层"
                    visible={this.state.hovered}
                    onVisibleChange={this.handleHoverChange}>
                    <IconFont
                        type="icon-shezhi"
                        className={`ad-icon ${!activeTaskId &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    _renderContent() {
        return <EditLayerPicker />;
    }
}

@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class EditLayerPicker extends React.Component {
    render() {
        let { DataLayerStore } = this.props;
        let layers = DataLayerStore.layers
            ? [{ value: false, label: '不启用' }, ...DataLayerStore.layers]
            : [];

        let editLayer = DataLayerStore.getEditLayer();
        return (
            <Radio.Group
                onChange={this.onChange}
                value={editLayer ? editLayer.layerName : false}
                style={{ width: '100%' }}>
                <List
                    key={DataLayerStore.updateKey}
                    dataSource={layers}
                    renderItem={item => (
                        <div>
                            <Radio value={item.value}>
                                {this.getLabel(item)}
                            </Radio>
                        </div>
                    )}
                />
            </Radio.Group>
        );
    }

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
    };

    onChange = e => {
        const { DataLayerStore, ToolCtrlStore } = this.props;
        let layer = DataLayerStore.activeEditor(e.target.value);
        ToolCtrlStore.updateByEditLayer(layer);
    };
}

export default EditLayer;
