import React from 'react';
import { Popover, Tooltip, Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

const marks = {
    5: '0.5',
    30: '3'
};

@inject('TaskStore')
@observer
class AdjustPointSize extends React.Component {
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
                    title="设置点云大小"
                    visible={this.state.hovered}
                    onVisibleChange={this.handleHoverChange}>
                    <IconFont
                        type="icon-shezhidianyundaxiao"
                        className={`ad-icon ${!activeTaskId &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    _renderContent() {
        let value = window.pointCloudLayer
            ? pointCloudLayer.material.size * 10
            : 5;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    step={5}
                    marks={marks}
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
        return value / 10;
    };

    onChange = value => {
        this.setState({
            updateKey: Math.random()
        });
        pointCloudLayer.setPointSize(value / 10);
    };
}

export default AdjustPointSize;
