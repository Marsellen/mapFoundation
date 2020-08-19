import React from 'react';
import { Slider } from 'antd';
import { inject, observer } from 'mobx-react';
import 'less/components/PointCloud.less';

const marks = {
    5: '0.5',
    30: '3',
    100: '10'
};

@inject('TaskStore')
@inject('ResourceLayerStore')
@observer
class AdjustPointSize extends React.Component {
    state = {
        value: window.pointCloudLayer ? pointCloudLayer.material.size * 10 : 0
    };

    onChange = value => {
        this.setState({
            value
        });
        pointCloudLayer.setPointSize(value / 10);
    };
    formatter = value => {
        return value / 10;
    };
    render() {
        const { value } = this.state;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    min={5}
                    step={5}
                    marks={marks}
                    onChange={this.onChange}
                    style={{ width: 100 }}
                    tipFormatter={this.formatter}
                />
                <div className="pointCloud">{value / 10}</div>
            </div>
        );
    }
}

export default AdjustPointSize;
