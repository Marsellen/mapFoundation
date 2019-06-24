import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class Save extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return (
            <ToolIcon
                icon="save"
                title="保存"
                disabled={!activeTaskId}
                action={this.action}
            />
        );
    }

    action = () => {
        const { taskStore } = this.props;
        let exportObj = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [125.6, 10.1]
            },
            properties: {}
        };
        let task = taskStore.getActiveTask();
        let taskName = task && task.name;
        let dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(exportObj));
        let a = document.createElement('a');
        a.setAttribute('href', dataStr);
        a.setAttribute('download', taskName + '.json');
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
}

export default Save;
