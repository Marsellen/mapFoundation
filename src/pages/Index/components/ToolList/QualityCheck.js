import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import { Modal } from 'antd';

@inject('appStore')
@inject('TaskStore')
@inject('QualityCheckStore')
@inject('OperateHistoryStore')
@observer
class QualityCheck extends React.Component {
    render() {
        const { TaskStore, appStore } = this.props;
        const { loginUser } = appStore;
        const { activeTaskId } = TaskStore;
        switch (loginUser.roleCode) {
            case 'producer':
                return (
                    <ToolIcon
                        icon="zhiliangjiancha1"
                        title="质量检查"
                        disabled={!activeTaskId}
                        action={() =>
                            this.checkModal(`是否质检当前任务`, this.taskCheck)
                        }
                    />
                );
            case 'quality':
                return null;
            default:
                return null;
        }
    }

    save = async () => {
        const { TaskStore, OperateHistoryStore } = this.props;
        const { currentNode, savedNode } = OperateHistoryStore;
        const shouldSave = currentNode > savedNode;

        if (!shouldSave) return;
        await TaskStore.submit();
        await TaskStore.writeEditLog();
        OperateHistoryStore.save();
    };

    //无错质检结果提示
    checkModal = (content, handleOk) => {
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: handleOk,
            onCancel: this.props.QualityCheckStore.cancelPolling
        });
    };

    taskCheck = async () => {
        await this.save();

        const { QualityCheckStore, TaskStore, appStore } = this.props;
        const {
            handleProducerCheck,
            handleProducerGetReport,
            openCheckReport
        } = QualityCheckStore;
        const { activeTask } = TaskStore;
        const { taskId, processName, projectId } = activeTask;
        const { loginUser } = appStore;
        const { roleCode, username } = loginUser;

        //质量检查
        const checkRes = await handleProducerCheck({
            task_id: taskId,
            process_name: processName,
            project_id: projectId,
            data_path: taskId,
            user_name: username,
            user_type: roleCode
        });
        if (!checkRes) return false;

        //轮询质检结果
        const reportList = await handleProducerGetReport({ task_id: taskId });
        if (!reportList) return false;
        const reportListL = reportList.length;
        reportListL > 0
            ? this.checkModal(
                `质量检查结束，发现${reportListL}个错误，是否查看？`,
                openCheckReport
            )
            : this.checkModal(`质量检查结束，未发现数据问题`);
    };
}

export default QualityCheck;
