import React from 'react';
import { Slider } from 'antd';
import 'less/point-cloud.less';

class PointBright extends React.Component {
    state = {
        value: window?.nowPointCloudLayer?.getIntensityBrightness?.() ?? 0
    };

    onChange = value => {
        this.setState({
            value
        });
        window?.nowPointCloudLayer?.setIntensityBrightness?.(value);
    };

    render() {
        const { value } = this.state;
        return (
            <div>
                <div className="name-and-value">
                    <span>亮度</span>
                    <span>{value}</span>
                </div>
                <div className="flex flex-row">
                    <Slider
                        className="flex-1"
                        value={value}
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default PointBright;
