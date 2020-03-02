import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

@inject('TaskStore')
@observer
class ZoomOut extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return activeTaskId ? (
            <div>
                <ToolIcon
                    icon="suoxiao"
                    title="缩小比例尺"
                    placement="left"
                    className="ad-icon-topview"
                    action={this.action}
                />
            </div>
        ) : null;
    }

    action = () => {
        console.log('缩小比例尺');
        map.zoomOut();
    };
}

export default ZoomOut;
