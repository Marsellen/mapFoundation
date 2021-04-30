import React from 'react';
import { Slider } from 'antd';
import 'less/point-cloud.less';

class Contrast extends React.Component {
    state = {
        value: window?.pointCloudLayer?.getIntensityContrast?.() ?? 0
    };

    onChange = value => {
        this.setState({
            value
        });
        window?.pointCloudLayer?.setIntensityContrast?.(value);
    };

    render() {
        const { value } = this.state;
        return (
            <div>
                <div className="name-and-value">
                    <span>对比度</span>
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

export default Contrast;
