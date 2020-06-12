import React from 'react';
import { Slider } from 'antd';

class PointBright extends React.Component {
    state = {
        updateKey: 0
    };

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false
        });
    };
    render() {
        let value = window.pointCloudLayer
            ? pointCloudLayer.getIntensityBrightness()
            : 0;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    onChange={this.onChange}
                    tipFormatter={this.formatter}
                    style={{ width: 100 }}
                />
                <div
                    style={{
                        lineHeight: '38px',
                        color: '#9e9e9e',
                        width: 24,
                        textAlign: 'center'
                    }}>
                    {this.formatter(value)}
                </div>
            </div>
        );
    }
    formatter = value => {
        return `${parseInt(value)}`;
    };

    onChange = value => {
        this.setState({
            updateKey: Math.random()
        });
        pointCloudLayer.setIntensityBrightness(value);
    };
}

export default PointBright;
