// 测距
import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@inject('taskStore')
@observer
class Ranging extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return (
            <ToolIcon
                icon="ceju"
                title="测距"
                action={this.action}
                disabled={!activeTaskId}
            />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.startMeatureDistance();
    };
}

export default Ranging;
