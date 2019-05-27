import React from 'react';
import { MeasuringTool } from 'addis-viz-sdk';
import { Tooltip, Icon } from 'antd';

class Tool extends React.Component {
    componentDidMount() {
        this.viewer = adVIS.viewer;
        this.measuringTool = new MeasuringTool(this.viewer);
    }

    render() {
        return (
            <div>
                <Tooltip placement="right" title="新建线">
                    <Icon
                        type="line"
                        style={Styles.lineIcon}
                        onClick={this.distanceAction}
                    />
                </Tooltip>
            </div>
        );
    }

    distanceAction = () => {

    };
}

const Styles = {
    lineIcon: {
        fontSize: 18,
        margin: 10
    }
};

export default Tool;
