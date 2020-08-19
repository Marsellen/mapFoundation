import React from 'react';
import { Slider } from 'antd';
import 'less/components/PointCloud.less';

const marks = {
    0.5: '0.5',
    3: '3',
    10: '10'
};

class AdjustPointSize extends React.Component {
    state = {
        value: window.pointCloudLayer ? pointCloudLayer.material.size : 0,
        activeTaskId: this.props.activeTaskId
    };
    static getDerivedStateFromProps(props, state) {
        if (props.activeTaskId !== state.activeTaskId) {
            return {
                ...state,
                activeTaskId: props.activeTaskId,
                value: window.pointCloudLayer ? pointCloudLayer.material.size : 0
            };
        }
        return null;
    }
    onChange = value => {
        this.setState({
            value
        });
        pointCloudLayer.setPointSize(value);
    };
    render() {
        const { value } = this.state;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    min={0}
                    max={10}
                    step={0.1}
                    marks={marks}
                    onChange={this.onChange}
                />
                <div className="pointCloud">{value}</div>
            </div>
        );
    }
}

export default AdjustPointSize;
