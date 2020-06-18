import React from 'react';
import { Slider } from 'antd';

class Contrast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateKey: 0,
            value: window.pointCloudLayer
                ? pointCloudLayer.setIntensityContrast(35)
                : 0,
            activeTaskId: props.activeTaskId
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeTaskId !== state.activeTaskId) {
            return {
                ...state,
                activeTaskId: props.activeTaskId,
                value: window.pointCloudLayer
                    ? pointCloudLayer.setIntensityContrast(35)
                    : 0
            };
        }
        return null;
    }

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false
        });
    };
    render() {
        let value = window.pointCloudLayer
            ? pointCloudLayer.getIntensityContrast()
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
        pointCloudLayer.setIntensityContrast(value);
    };
}

export default Contrast;
