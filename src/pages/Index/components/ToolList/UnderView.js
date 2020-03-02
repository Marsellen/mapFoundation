import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

@inject('TaskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return activeTaskId ? (
            <div>
                <ToolIcon
                    icon="compass"
                    title="视角还原"
                    placement="left"
                    className="ad-icon-topview"
                    action={this.action}
                />
            </div>
        ) : null;
    }

    action = () => {
        map.setView('U');
    };
}

export default UnderView;
