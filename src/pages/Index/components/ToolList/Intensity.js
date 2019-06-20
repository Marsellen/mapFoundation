import React from 'react';
import { Popover, Tooltip, Icon, Slider } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class Intensity extends React.Component {
    state = {
        clicked: false,
        hovered: false,
        updateKey: 0
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
                    title="设置点云反射率"
                    visible={this.state.hovered}
                    onVisibleChange={this.handleHoverChange}>
                    <Icon
                        type="bulb"
                        className={`ad-icon ${!activeTaskId &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    _renderContent() {
        let value = window.pointCloudLayer ? pointCloudLayer.getIntensity() : 0;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    defaultValue={value}
                    onChange={this.onChange}
                    tipFormatter={this.formatter}
                    style={{ width: 100 }}
                />
                <div
                    style={{
                        lineHeight: '38px',
                        color: '#9e9e9e',
                        width: 24,
                        textAlign: 'center'
                    }}>
                    {this.formatter(value)}
                </div>
            </div>
        );
    }

    formatter = value => {
        return `${parseInt(value)}%`;
    };

    onChange = value => {
        this.setState({
            updateKey: Math.random()
        });
        pointCloudLayer.setIntensity(value);
        console.log(value);
    };
}

export default Intensity;
