import React from 'react';
import { Popover, Slider, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';
import 'src/assets/less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('ResourceLayerStore')
@inject('TaskStore')
@observer
class PointStratification extends React.Component {
    state = {
        currentTaskId: 0,
        popoverVisible: false,
        sliderValue: []
    };

    sliderFormatter = value => {
        return `${value.toFixed(2)}米`;
    };

    handlePopoverChange = visible => {
        if (this.isDisabled()) return;
        if (visible) {
            const { DataLayerStore, TaskStore } = this.props;
            const { pointCloudLayerHeightRange } = DataLayerStore;
            const { activeTaskId } = TaskStore;
            const { currentTaskId } = this.state;
            if (activeTaskId !== currentTaskId) {
                this.setState({
                    popoverVisible: true,
                    currentTaskId: activeTaskId,
                    sliderValue: pointCloudLayerHeightRange
                });
            } else {
                this.setState({
                    popoverVisible: true
                });
            }
        } else {
            this.setState({
                popoverVisible: false
            });
        }
    };

    handleSlideChange = sliderValue => {
        this.setState(
            {
                sliderValue
            },
            () => {
                pointCloudLayer.setDisplayAltitudeMin(sliderValue[0]);
                pointCloudLayer.setDisplayAltitudeMax(sliderValue[1]);
            }
        );
    };

    _renderContent() {
        const { DataLayerStore } = this.props;
        const { pointCloudLayerHeightRange } = DataLayerStore;
        const { sliderValue } = this.state;
        return (
            <div className="ad-slider-box">
                <p>{pointCloudLayerHeightRange[1]}米</p>
                <Slider
                    className="ad-slider-vertical"
                    onChange={this.handleSlideChange}
                    min={pointCloudLayerHeightRange[0]}
                    max={pointCloudLayerHeightRange[1]}
                    tipFormatter={this.sliderFormatter}
                    value={sliderValue}
                    step={0.01}
                    vertical
                    range
                />
                <p>{pointCloudLayerHeightRange[0]}米</p>
            </div>
        );
    }

    render() {
        const { popoverVisible } = this.state;
        return (
            <Popover
                content={this._renderContent()}
                trigger="click"
                onVisibleChange={this.handlePopoverChange}
                visible={popoverVisible}>
                <Tooltip placement="bottom" title="设置点云分高程展示">
                    <IconFont
                        type="icon-dianyunfengaochengxianshi"
                        className={`ad-icon ${this.isDisabled() &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    isDisabled = () => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;

        return !activeTaskId || !pointCloudChecked;
    };
}

export default PointStratification;
