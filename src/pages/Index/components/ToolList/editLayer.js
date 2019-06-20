import React from 'react';
import { Popover, Tooltip, Icon, Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

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
        this.setState({
            hovered: visible,
            clicked: false
        });
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
                    <Icon
                        type="sliders"
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
@inject('OperateHistoryStore')
@inject('NewFeatureStore')
@observer
class EditLayerPicker extends React.Component {
    state = { value: false };

    constructor(props) {
        super(props);
        this.props.OperateHistoryStore.destory(); // TODO 本地例子每次请求的数据不会被更新，清空历史记录
    }

    render() {
        let { DataLayerStore } = this.props;
        let layers = DataLayerStore.layers
            ? [{ value: false, label: '不启用' }, ...DataLayerStore.layers]
            : [];
        return (
            <Radio.Group
                onChange={this.onChange}
                value={this.state.value}
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
        const { DataLayerStore, ToolCtrlStore, NewFeatureStore } = this.props;
        this.setState({
            value: e.target.value
        });
        NewFeatureStore.setLayerName(e.target.value);
        let layer = DataLayerStore.activeEditor(e.target.value, feature => {
            NewFeatureStore.init(feature);
        });
        ToolCtrlStore.updateByEditLayer(layer);
    };
}

export default EditLayer;
