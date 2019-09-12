import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@observer
class ZoomOut extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
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
        map.zoomOut();
    };
}

export default ZoomOut;
