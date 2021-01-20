import React from 'react';
import { Slider } from 'antd';
import 'less/components/point-cloud.less';

const marks = {
    0: '0',
    1: '1',
    255: '255'
};

class ReflexRange extends React.Component {
    render() {
        return (
            <div>
                <div className="name-and-value">
                    <span>反射率区间</span>
                    <span>{`${0}~${255}`}</span>
                </div>
                <div className="flex flex-row">
                    <Slider
                        className="flex-1"
                        range
                        step={1}
                        defaultValue={[0, 255]}
                        marks={marks}
                        // onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default ReflexRange;
