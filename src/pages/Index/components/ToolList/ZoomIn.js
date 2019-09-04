import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class ZoomIn extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return activeTaskId ? (
            <div placement="bottom" title="缩小比例尺" className="zoom-scale">
                <IconFont
                    type="icon-suoxiao"
                    className="ad-icon"
                    onClick={this.action}
                />
            </div>
        ) : (
            <span />
        );
    }

    action = () => {
        console.log('缩小比例尺');
    };
}

export default ZoomIn;
