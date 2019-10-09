import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import config from 'src/config';

@inject('TaskStore')
@inject('OperateHistoryStore')
@observer
class Save extends React.Component {
    constructor(props) {
        super(props);
        this.loop();
    }

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
        await this.save();
        message.success('保存成功', 3);
    };

    save = async () => {
        const { TaskStore, OperateHistoryStore } = this.props;

        await TaskStore.submit();
        await TaskStore.writeEditLog();
        OperateHistoryStore.save();
    };

    loop = () => {
        this.intervalId = window.setInterval(
            this.autoSave,
            config.autoSaveTime
        );
    };

    autoSave = async () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            await this.save();
            message.success('自动保存成功', 3);
        }
    };
}

export default Save;
