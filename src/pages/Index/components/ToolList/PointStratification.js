import React from 'react';
import { Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/tool-icon.less';

@inject('PointCloudStore')
@observer
class PointStratification extends React.Component {
    sliderFormatter = value => {
        return `${value.toFixed(2)}米`;
    };

    handleSlideChange = value => {
        const { PointCloudStore } = this.props;
        PointCloudStore.setViewedHeightRange(value);

        pointCloudLayer.setDisplayAltitudeMin(value[0]);
        pointCloudLayer.setDisplayAltitudeMax(value[1]);
    };

    render() {
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
}

export default PointStratification;
