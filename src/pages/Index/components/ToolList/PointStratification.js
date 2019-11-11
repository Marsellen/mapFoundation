import React from 'react';
import { Popover, Slider, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';
import 'src/assets/less/components/tool-icon.less';

@inject('ResourceLayerStore')
@inject('TaskStore')
@inject('PointCloudStore')
@observer
class PointStratification extends React.Component {
    state = {
        visible: false
    };

    sliderFormatter = value => {
        return `${value.toFixed(2)}米`;
    };

    handlePopoverChange = visible => {
        if (this.isDisabled()) return;
        this.setState({
            visible: visible
        });
    };

    handleSlideChange = value => {
        const { PointCloudStore } = this.props;
        PointCloudStore.setViewedHeightRange(value);

        pointCloudLayer.setDisplayAltitudeMin(value[0]);
        pointCloudLayer.setDisplayAltitudeMax(value[1]);
    };

    _renderContent() {
        const { PointCloudStore } = this.props;
        const { maxHeightRange, viewedHeightRange } = PointCloudStore;
        return (
            <div className="ad-slider-box">
                <p>{maxHeightRange[1].toFixed(2)}米</p>
                <Slider
                    className="ad-slider-vertical"
                    onChange={this.handleSlideChange}
                    min={maxHeightRange[0]}
                    max={maxHeightRange[1]}
                    tipFormatter={this.sliderFormatter}
                    value={viewedHeightRange}
                    step={0.01}
                    vertical
                    range
                />
                <p>{maxHeightRange[0].toFixed(2)}米</p>
            </div>
        );
    }

    render() {
        const { visible } = this.state;
        return (
            <Popover
                content={this._renderContent()}
                trigger="click"
                onVisibleChange={this.handlePopoverChange}
                visible={visible}>
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
