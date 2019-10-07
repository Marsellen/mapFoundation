import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';

@inject('TaskStore')
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

    action = async () => {
        const { TaskStore, OperateHistoryStore } = this.props;

        await TaskStore.submit();
        OperateHistoryStore.save();
        message.success('保存成功', 3);
    };
}

export default Save;
