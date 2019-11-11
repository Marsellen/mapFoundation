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
        if (this.disEditable()) return;
        this.setState({
            clicked: visible,
            hovered: false
        });
    };

    render() {
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
                        className={`ad-icon ${this.disEditable() &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    _renderContent() {
        return <EditLayerPicker />;
    }

    disEditable = () => {
        const { TaskStore } = this.props;
        const { activeTaskId, isValidTask, isEditableTask } = TaskStore;
        return !activeTaskId || !isValidTask || !isEditableTask;
    };
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
                    dataSource={this.topViewLayerDisabled()}
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

    topViewLayerDisabled = () => {
        let { DataLayerStore, appStore, TaskStore } = this.props;
        let userInfo = appStore.loginUser;
        const { activeTask } = TaskStore;
        let layers = getEditLayers(DataLayerStore.layers, userInfo, activeTask);
        const { isTopView } = DataLayerStore;

        if (isTopView) {
            layers
                .filter(item => {
                    return (
                        item.value == 'AD_TrafficLight' ||
                        item.value == 'AD_TrafficSign' ||
                        item.value == 'AD_Pole' ||
                        item.value == 'AD_RS_Barrier'
                    );
                })
                .forEach(item => {
                    item.disabled = true;
                });
        }
        return layers;
    };

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
