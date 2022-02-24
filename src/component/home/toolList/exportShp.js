import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';

@inject('TaskStore')
@observer
class ExportShp extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <ToolIcon
                icon="shiliang"
                title="矢量转存为shp文件"
                disabled={!activeTaskId}
                action={this.action}
            />
        );
    }

    action = () => {
        const { TaskStore } = this.props;
        TaskStore.exportShp();
    };
}

export default ExportShp;