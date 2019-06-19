import React from 'react';
import { Popover, Tooltip, Icon, Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

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
                    <Icon type="sliders" className="ad-icon" />
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
                                {item.value
                                    ? DATA_LAYER_MAP[item.value].label
                                    : item.label}
                            </Radio>
                        </div>
                    )}
                />
            </Radio.Group>
        );
    }

    onChange = e => {
        const { DataLayerStore, ToolCtrlStore, NewFeatureStore } = this.props;
        this.setState({
            value: e.target.value
        });
        let layer = DataLayerStore.activeEditor(e.target.value, feature => {
            NewFeatureStore.init(feature, e.target.value);
        });
        ToolCtrlStore.updateByEditLayer(layer);
    };
}

export default EditLayer;
