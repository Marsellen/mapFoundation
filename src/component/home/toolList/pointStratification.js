import React from 'react';
import { Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/tool-icon.less';
@inject('PointCloudStore')
@observer
class PointStratification extends React.Component {
    constructor(props) {
        super(props);
        const range = window?.nowPointCloudLayer?.getElevationRange?.() ?? [0, 0];
        this.props.PointCloudStore.setInitRange(range);
    }

    onChange = range => {
        this.props.PointCloudStore.setCurrentRange(range);
        window?.nowPointCloudLayer?.setDisplayAltitudeMin?.(range[0]);
        window?.nowPointCloudLayer?.setDisplayAltitudeMax?.(range[1]);
    };

    sliderFormatter = value => {
        return `${value.toFixed(2)}米`;
    };

    render() {
        const { initRange = [0, 0], currentRange } = this.props.PointCloudStore;
        const range = initRange || [0, 0];
        return (
            <div className="ad-slider-box">
                <span>点云分高程显示</span>
                <p>{range[1].toFixed(2)}米</p>
                <Slider
                    className="ad-slider-vertical"
                    onChange={this.onChange}
                    min={range[0]}
                    max={range[1]}
                    tipFormatter={this.sliderFormatter}
                    value={currentRange || range}
                    step={0.01}
                    vertical={true}
                    range={true}
                />
                <p>{range[0].toFixed(2)}米</p>
            </div>
        );
    }
}

export default PointStratification;
