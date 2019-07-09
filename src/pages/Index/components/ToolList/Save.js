import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@inject('OperateHistoryStore')
@observer
class Save extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        return (
            <ToolIcon
                icon="baocun"
                title="保存"
                disabled={!shouldSave}
                action={this.action}
            />
        );
    }

    action = () => {
        const { taskStore, OperateHistoryStore } = this.props;
        let data = map.getLayerManager().getAllVectorData();
        console.log(data);
        taskStore.submit(data, () => {
            OperateHistoryStore.save()
        });
    };
}

export default Save;
