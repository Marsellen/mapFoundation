import React from 'react';
import { Popover, Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';
import 'src/assets/less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('TaskStore')
@observer
class PointStratification extends React.Component {
    state = {
        popoverVisible: false,
        sliderMinValue: 0,
        sliderMaxValue: 100,
        sliderValue: null
    };

    handlePopoverChange = visible => {
        if (visible) {
            const { DataLayerStore } = this.props;
            const { pointCloudLayerHeightRange } = DataLayerStore;
            const [
                pointCloudLayerMinHeight,
                pointCloudLayerMaxHeight
            ] = pointCloudLayerHeightRange;
            let { sliderValue, sliderMinValue } = this.state;
            if (sliderValue || sliderMinValue !== pointCloudLayerMinHeight) {
                sliderValue = pointCloudLayerHeightRange;
            }
            this.setState({
                popoverVisible: true,
                sliderMinValue: pointCloudLayerMinHeight,
                sliderMaxValue: pointCloudLayerMaxHeight,
                sliderValue
            });
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
        const { sliderValue, sliderMinValue, sliderMaxValue } = this.state;
        return (
            <div className="ad-slider-box">
                <p>{sliderMaxValue}米</p>
                <Slider
                    className="ad-slider-vertical"
                    onChange={this.handleSlideChange}
                    min={sliderMinValue}
                    max={sliderMaxValue}
                    value={sliderValue}
                    step={0.01}
                    vertical
                    range
                />
                <p>{sliderMinValue}米</p>
            </div>
        );
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { popoverVisible } = this.state;
        return (
            <Popover
                content={this._renderContent()}
                trigger="click"
                onVisibleChange={this.handlePopoverChange}
                visible={popoverVisible}>
                <IconFont
                    type="icon-dianyunfengaochengxianshi"
                    className={`ad-icon ${!activeTaskId && 'ad-disabled-icon'}`}
                />
            </Popover>
        );
    }
}

export default PointStratification;
