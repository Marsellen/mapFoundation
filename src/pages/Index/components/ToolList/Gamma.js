import React from 'react';
import { Slider } from 'antd';
import 'less/components/point-cloud.less';

class Gamma extends React.Component {
    state = {
        value: window?.pointCloudLayer?.getIntensityGamma?.() ?? 0
    };

    onChange = value => {
        this.setState({
            value
        });
        window?.pointCloudLayer?.setIntensityGamma?.(value);
    };

    render() {
        const { value } = this.state;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={this.onChange}
                />
                <div className="pointCloud">{value}</div>
            </div>
        );
    }
}

export default Gamma;
