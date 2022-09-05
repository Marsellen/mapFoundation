import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';

@inject('TaskStore')
@observer
class ZoomIn extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <div>
                <ToolIcon
                    icon="fangda"
                    title="放大比例尺"
                    placement="left"
                    className="ad-icon-topview"
                    action={this.action}
                />
            </div>
        );
    }

    action = () => {
        map.zoomIn();
    };
}

export default ZoomIn;
