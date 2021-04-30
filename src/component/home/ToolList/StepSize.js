import React from 'react';
import { Slider } from 'antd';

const marks = {
    0.125: '0.125',
    0.25: '0.25',
    0.5: '0.5',
    1: '1',
    2: '2',
    4: '4',
    8: '8',
    16: '16'
};

class StepSize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: window.map ? map.getKeySpeed() : 0,
            activeTaskId: props.activeTaskId
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.activeTaskId !== state.activeTaskId) {
            return {
                ...state,
                activeTaskId: props.activeTaskId,
                value: window.map ? map.getKeySpeed() : 0
            };
        }
        return null;
    }

    onChange = value => {
        this.setState({
            value
        });
        map.setKeySpeed(value);
    };
    render() {
        const { value } = this.state;
        return (
            <div className="flex flex-row">
                <Slider
                    className="flex-1"
                    value={value}
                    min={0.125}
                    max={16}
                    step={null}
                    marks={marks}
                    onChange={this.onChange}
                />
                <div className="pointCloud">{value}</div>
            </div>
        );
    }
}

export default StepSize;
