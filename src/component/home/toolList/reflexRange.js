import React from 'react';
import { Slider } from 'antd';
import 'less/point-cloud.less';

const marks = {
    0: '0',
    1: '1',
    255: '255'
};

class ReflexRange extends React.Component {
    state = {
        value: window?.pointCloudLayer?.getIntensityRange?.() ?? [0, 255]
    };

    onChange = value => {
        this.setState({ value });
        window?.pointCloudLayer?.setIntensityRange?.(value);
    };

    render() {
        const { value } = this.state;
        return (
            <div>
                <div className="name-and-value">
                    <span>反射率区间</span>
                    <span>{`${value[0]}~${value[1]}`}</span>
                </div>
                <div className="flex flex-row">
                    <Slider
                        className="flex-1"
                        range
                        step={1}
                        min={0}
                        max={255}
                        value={value}
                        marks={marks}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default ReflexRange;
