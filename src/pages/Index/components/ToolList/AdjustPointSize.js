import React from 'react';
import { Slider } from 'antd';
import { inject, observer } from 'mobx-react';

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
        updateKey: 0
    };

    render() {
        let value = window.pointCloudLayer
            ? pointCloudLayer.material.size * 10
            : 5;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    min={5}
                    step={5}
                    marks={marks}
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
        return value / 10;
    };

    onChange = value => {
        this.setState({
            updateKey: Math.random()
        });
        pointCloudLayer.setPointSize(value / 10);
    };
}

export default AdjustPointSize;
