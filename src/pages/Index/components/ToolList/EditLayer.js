import React from 'react';
import { Popover, Tooltip, Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import IconFont from 'src/components/IconFont';
import { getEditLayers } from 'src/utils/permissionCtrl';

@inject('TaskStore')
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
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        if (!activeTaskId) return;
        this.setState({
            clicked: visible,
            hovered: false
        });
    };
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
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
@inject('AttributeStore')
@inject('appStore')
@inject('TaskStore')
@observer
class EditLayerPicker extends React.Component {
    render() {
        let { DataLayerStore, appStore, TaskStore } = this.props;
        let userInfo = appStore.loginUser;
        const { activeTask } = TaskStore;
        let layers = getEditLayers(DataLayerStore.layers, userInfo, activeTask);

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
                            <Radio value={item.value} disabled={item.disabled}>
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
        const {
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            appStore
        } = this.props;

        let userInfo = appStore.loginUser;
        let layer = DataLayerStore.activeEditor(e.target.value);
        ToolCtrlStore.updateByEditLayer(layer, userInfo);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };
}

export default EditLayer;
