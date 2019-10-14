import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message, Modal } from 'antd';
import config from 'src/config';
import { getAuthentication, logout } from 'src/utils/Session';

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
                id="save-btn"
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
        let { timestamp, expireTime = 86400 } = getAuthentication();
        expireTime = expireTime > 3600 ? expireTime - 3600 : 0; // 提前一小时提醒
        let time = new Date(timestamp) - new Date() + expireTime * 1000;
        window.setTimeout(this.expireConfirm, time);

        window.setInterval(this.autoSave, config.autoSaveTime);
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

    expireConfirm = () => {
        Modal.warning({
            title: '提示',
            content: '登录超时，请重新登录',
            okText: '保存并退出',
            keyboard: false,
            onOk: this.quitWithSave
        });
    };

    quitWithSave = async () => {
        await this.save();
        logout();
        location.reload();
    };
}

export default Save;
