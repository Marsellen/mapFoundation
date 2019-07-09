import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class ExportShp extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return (
            <ToolIcon
                icon="daochu"
                title="矢量转存为shp文件"
                disabled={!activeTaskId}
                action={this.action}
            />
        );
    }

    action = () => {
        const { taskStore } = this.props;
        taskStore.exportShp();
        // let data = map.getLayerManager().getAllVectorData();
        // let task = taskStore.getActiveTask();
        // let taskName = task && task.name;
        // let dataStr =
        //     'data:text/json;charset=utf-8,' +
        //     encodeURIComponent(JSON.stringify(data));
        // let a = document.createElement('a');
        // a.setAttribute('href', dataStr);
        // a.setAttribute('download', taskName + '.json');
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
    };
}

export default ExportShp;
