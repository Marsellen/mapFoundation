import React from 'react';
import { Popover, Tooltip, Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@observer
class PointStratification extends React.Component {
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
                    title="设置点云分高层"
                    visible={this.state.hovered}
                    onVisibleChange={this.handleHoverChange}>
                    <IconFont
                        type="icon-dianyunfengaochengxianshi"
                        className={`ad-icon ${!activeTaskId &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    _renderContent() {
        let value = window.pointCloudLayer
            ? pointCloudLayer.getElevationRange()
            : 0;

        return (
            <div>
                <div
                    style={{
                        color: '#9e9e9e',
                        textAlign: 'center'
                    }}>
                    {this.formatter(value[1])}
                </div>
                <Slider
                    className="flex-1"
                    range
                    onChange={this.onChange}
                    step={0.01}
                    max={value[1]}
                    min={value[0]}
                    tipFormatter={this.formatter}
                    style={{ height: 100 }}
                    vertical
                    defaultValue={value}
                />
                <div
                    style={{
                        color: '#9e9e9e',
                        textAlign: 'center'
                    }}>
                    {this.formatter(value[0])}
                </div>
            </div>
        );
    }

    formatter = value => {
        return `${parseFloat((value * 1000) / 1000)}米`;
    };

    onChange = value => {
        this.setState({
            updateKey: Math.random()
        });
        pointCloudLayer.setDisplayAltitudeMin(value[0]);
        pointCloudLayer.setDisplayAltitudeMax(value[1]);
    };
}

export default PointStratification;
