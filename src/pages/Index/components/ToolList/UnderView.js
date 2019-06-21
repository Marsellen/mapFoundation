import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return (
            <ToolIcon
                disabled={!activeTaskId}
                icon="compass"
                title="视角还原"
                action={this.action}
            />
        );
    }

    action = () => {
        map.setView('U');
    };
}

export default UnderView;
