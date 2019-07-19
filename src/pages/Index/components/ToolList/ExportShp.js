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
    };
}

export default ExportShp;
