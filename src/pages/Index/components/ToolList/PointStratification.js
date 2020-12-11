import React from 'react';
import { Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/tool-icon.less';
@inject('PointCloudStore')
@observer
class PointStratification extends React.Component {
    constructor(props) {
        super(props);
        const range = window?.pointCloudLayer?.getElevationRange?.() ?? [0, 0];
        this.state = {
            initRange: range
        };
    }

    onChange = range => {
        this.props.PointCloudStore.setPointCloudRange(range);
        window?.pointCloudLayer?.setDisplayAltitudeMin?.(range[0]);
        window?.pointCloudLayer?.setDisplayAltitudeMax?.(range[1]);
    };

    sliderFormatter = value => {
        return `${value.toFixed(2)}米`;
    };

    render() {
        const { PointCloudRange } = this.props.PointCloudStore;
        const { initRange } = this.state;
        return (
            <div className="ad-slider-box">
                <p>{initRange[1].toFixed(2)}米</p>
                <Slider
                    className="ad-slider-vertical"
                    onChange={this.onChange}
                    min={initRange[0]}
                    max={initRange[1]}
                    tipFormatter={this.sliderFormatter}
                    value={PointCloudRange || initRange}
                    step={0.01}
                    vertical={true}
                    range={true}
                />
                <p>{initRange[0].toFixed(2)}米</p>
            </div>
        );
    }
}

export default PointStratification;
