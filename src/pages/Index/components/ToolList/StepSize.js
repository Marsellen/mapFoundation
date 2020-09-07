import React from 'react';
import { Slider } from 'antd';

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
                    min={0}
                    max={100}
                    step={1}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default StepSize;
