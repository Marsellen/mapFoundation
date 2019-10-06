import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';

@inject('TaskStore')
@observer
class ZoomIn extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
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
        map.zoomIn();
    };
}

export default ZoomIn;