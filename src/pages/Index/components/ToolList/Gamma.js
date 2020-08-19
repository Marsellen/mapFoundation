import React from 'react';
import { Slider } from 'antd';
import 'less/components/PointCloud.less';

class Gamma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: window.pointCloudLayer ? pointCloudLayer.getIntensityGamma() : 0,
            activeTaskId: props.activeTaskId
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeTaskId !== state.activeTaskId) {
            return {
                ...state,
                value: window.pointCloudLayer ? pointCloudLayer.getIntensityGamma() : 0,
                activeTaskId: props.activeTaskId
            };
        }
        return null;
    }

    onChange = value => {
        this.setState({
            value
        });
        pointCloudLayer.setIntensityGamma(value);
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
                    style={{ width: 100 }}
                />
                <div className="pointCloud">{value}</div>
            </div>
        );
    }
}

export default Gamma;
