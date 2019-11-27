import React from 'react';
import { Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';
import 'less/components/jobstatus.less';

const MANUALSTATUS = {
    4: '返修',
    5: '返工'
};

@withRouter
@inject('QualityCheckStore')
@inject('appStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('TaskStore')
@inject('RelStore')
@inject('AttrStore')
@inject('AttributeStore')
@inject('PictureShowStore')
@observer
class JobStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qualityVisible: false };
        this.submitOption = { resultCode: 1 };
        this.passOption = { resultCode: 1, inspection_pass: 1 };
        this.repairOption = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 4
        };
        this.remadeOption = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 5
        };
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { qualityVisible } = this.state;

        return (
            <div className="flex flex-center">
                <Button onClick={this.getJob}>获取任务</Button>
                <Button
                    disabled={activeTaskId ? false : true}
                    onClick={this.submitTask}>
                    提交任务
                </Button>
                <Modal
                    className="quality-sub"
                    title="当前任务是否通过质检？"
                    visible={qualityVisible}
                    footer={this.renderFooter()}
                    onCancel={this.closeQualityComfirm}></Modal>
            </div>
        );
    }

    // 获取
    getJob = async () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;

        if (shouldSave) {
            return Modal.confirm({
                title: '提示',
                content: '当前任务未保存，是否自动保存',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.action();
                    await this.fetchTask();
                }
            });
        }
        await this.fetchTask();
    };

    fetchTask = async () => {
        const { TaskStore } = this.props;
        const { tasks: oldTasks } = TaskStore;
        let result = await TaskStore.initTask({ type: 2 });

        if (result.overLimit) {
            message.warning('任务已达领取上限', 3);
            return;
        }

        const { tasks } = TaskStore;
        if (tasks && tasks.length > 0) {
            if (oldTasks && oldTasks.length == tasks.length) {
                message.warning('暂无新任务', 3);
                return;
            } else {
                message.success('成功获取任务', 3);
            }
        }
        if (!oldTasks || !oldTasks.length) {
            this.clearWorkSpace();
        }
    };

    // 提交
    submitJob = option => {
        Modal.confirm({
            title: '提交任务',
            content: '是否提交当前任务',
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: () => this.handleTaskSubmit(option),
            onCancel: this.props.QualityCheckStore.cancelPolling
        });
    };

    //质量检查
    check = async () => {
        const { QualityCheckStore, TaskStore, appStore } = this.props;
        const {
            handleProducerCheck,
            handleProducerGetReport
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
        return await handleProducerGetReport({ task_id: taskId });
    };

    //质检有报表提示
    hasReportModal = content => {
        const { QualityCheckStore } = this.props;
        const { openCheckReport } = QualityCheckStore;
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: openCheckReport
        });
    };

    //质检无报表提示
    noReportModal = (content, option) => {
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '提交',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: () => this.taskSubmit(option)
        });
    };

    handleCheck = async option => {
        const { QualityCheckStore, appStore } = this.props;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const {
            isAllVisited,
            isAllChecked,
            openCheckRepor,
            closeCheckReport
        } = QualityCheckStore;
        const { manualStatus } = option;
        const taskStatus = MANUALSTATUS[manualStatus] || '提交';

        if (!isAllVisited) {
            const modalContent = `质检报表存在未查看检查条目，当前任务不允许${taskStatus}`;
            message.warning(modalContent);
            openCheckReport();
            return false;
        }

        switch (roleCode) {
            case 'producer':
                const reportList = await this.check();
                if (!reportList) return false;
                const reportListL = reportList.length;
                if (reportListL > 0) {
                    const modalContent = `质量检查结束，发现${reportListL}个错误，是否查看？`;
                    this.hasReportModal(modalContent);
                    return false;
                } else {
                    const modalContent = `质量检查结束，未发现数据问题，任务可正常提交`;
                    this.noReportModal(modalContent, option);
                    return false;
                }
            case 'quality':
                if (!isAllChecked && taskStatus === '提交') {
                    const modalContent = `存在需返修条目，当前任务不允许提交`;
                    message.warning(modalContent);
                    return false;
                }
                return true;
            default:
                break;
        }
    };

    handleTaskSubmit = async option => {
        const { OperateHistoryStore } = this.props;
        const { currentNode, savedNode } = OperateHistoryStore;
        const shouldSave = currentNode > savedNode;

        //保存
        if (shouldSave) {
            await this.action();
        }

        //质检
        const res = await this.handleCheck(option);
        if (!res) return false;

        //提交
        this.taskSubmit(option);
    };

    taskSubmit = async option => {
        const { TaskStore, QualityCheckStore } = this.props;
        const { closeCheckReport } = QualityCheckStore;
        try {
            await TaskStore.initSubmit(option);
            TaskStore.setActiveTask();
            this.clearWorkSpace();
            // 返工或返修不获取新任务
            if (option.manualStatus === 4 || option.manualStatus === 5) {
                TaskStore.initTask({ type: 4 });
            } else {
                // 提交后重新获取任务
                TaskStore.initTask({ type: 3 });
            }
            message.success('提交成功');
            //关闭质检弹窗
            closeCheckReport();
        } catch (e) {
            message.error(e.message, 3);
        }
    };

    // 自动保存
    action = async () => {
        const { TaskStore, OperateHistoryStore } = this.props;

        await TaskStore.submit();
        await TaskStore.writeEditLog();
        OperateHistoryStore.save();
    };

    clearWorkSpace = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            PictureShowStore
        } = this.props;
        OperateHistoryStore.destroy();
        editLog.store.clear();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
    };

    renderFooter = () => {
        return (
            <div className="flex">
                <Button onClick={this.closeQualityComfirm}>取消</Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.passOption);
                        this.closeQualityComfirm();
                    }}>
                    质检通过
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.repairOption);
                        this.closeQualityComfirm();
                    }}>
                    任务返修
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.remadeOption);
                        this.closeQualityComfirm();
                    }}>
                    任务返工
                </Button>
            </div>
        );
    };

    submitTask = e => {
        e || e.target || e.target.blur(); //在click事件中主动去掉button的焦点，回车就不会触发click

        const { appStore } = this.props;
        const { loginUser } = appStore;
        if (loginUser.roleCode === 'quality') {
            return this.showQualityComfirm();
        } else {
            return this.submitJob(this.submitOption);
        }

        // switch (loginUser.roleCode) {
        //     case 'quality':
        //         this.showQualityComfirm();
        //         break;
        //     default:
        //         this.submitJob(this.submitOption);
        //         break;
        // }
    };

    showQualityComfirm = () => {
        this.setState({
            qualityVisible: true
        });
    };

    closeQualityComfirm = () => {
        this.setState({
            qualityVisible: false
        });
    };
}

export default JobStatus;
