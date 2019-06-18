import React from 'react';
import { Popover, Tooltip, Icon, Radio, List } from 'antd';
import { inject, observer } from 'mobx-react';

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
@observer
class EditLayerPicker extends React.Component {
    state = { value: 1 };
    render() {
        let { DataLayerStore } = this.props;
        return (
            <Radio.Group
                onChange={this.onChange}
                value={this.state.value}
                style={{ width: '100%' }}>
                <List
                    key={DataLayerStore.updateKey}
                    dataSource={DataLayerStore.layers}
                    renderItem={item => (
                        <div>
                            <Radio value={item.value}>{item.label}</Radio>
                        </div>
                    )}
                />
            </Radio.Group>
        );
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value
        });
    };
}

export default EditLayer;
