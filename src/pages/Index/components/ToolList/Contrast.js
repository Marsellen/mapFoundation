import React from 'react';
import { Slider } from 'antd';
import 'less/components/PointCloud.less';

class Contrast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: window.pointCloudLayer ? pointCloudLayer.getIntensityContrast() : 0,
            activeTaskId: props.activeTaskId
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeTaskId !== state.activeTaskId) {
            return {
                ...state,
                activeTaskId: props.activeTaskId,
                value: window.pointCloudLayer ? pointCloudLayer.getIntensityContrast() : 0
            };
        }
        return null;
    }

    onChange = value => {
        this.setState({
            value
        });
        pointCloudLayer.setIntensityContrast(value);
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

export default Contrast;
