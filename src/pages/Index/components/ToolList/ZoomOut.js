import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('taskStore')
@observer
class ZoomOut extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return activeTaskId ? (
            <div placement="bottom" title="放大比例尺" className="zoom-scale">
                <IconFont
                    type="icon-fangda"
                    className="ad-icon"
                    onClick={this.action}
                />
            </div>
        ) : (
            <span />
        );
    }

    action = () => {
        console.log('放大比例尺');
    };
}

export default ZoomOut;
