import React from 'react';
import { inject, observer } from 'mobx-react';
import CONFIG from 'src/config';
import { Modal, Descriptions, Button } from 'antd';
import 'src/assets/less/components/hotkey.less';
import ToolIcon from 'src/components/ToolIcon';

const taskType = [
    {
        name: 'imp_recognition',
        type: 'MS',
        isLocal: false,
    },
    {
        name: 'imp_check_after_recognition',
        type: 'MS_QC',
        isLocal: false,
    },
    {
        name: 'imp_manbuild',
        type: 'MB',
        isLocal: false,
    },
    {
        name: 'imp_check_after_manbuild',
        type: 'MB_QC',
        isLocal: false,
    },
    {
        name: 'imp_recognition',
        type: 'MSD',
        isLocal: true,
    },
    {
        name: 'imp_manbuild',
        type: 'MBD',
        isLocal: true,
    },
];

@inject('TaskStore')
@inject('appStore')
@inject('OperateHistoryStore')
@inject('FeedbackStore')
@observer
class FeedBack extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            loading: false,
        };
    }

    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { visible } = this.state;

        return (
            <div className="feedback">
                <span onClick={this.toggle}>
                    <ToolIcon icon="wentifankui" className="feedback" />
                    问题反馈
                </span>
                <Modal
                    footer={activeTaskId ? this.renderFooter() : null}
                    title={<span className="modal-title">问题数据反馈</span>}
                    visible={visible}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    width={340}>
                    {this.feedBackList()}
                </Modal>
            </div>
        );
    }

    feedBackList = () => {
        const { TaskStore, appStore } = this.props;
        const { activeTask } = TaskStore;
        const { loginUser } = appStore;
        if (activeTask.taskId) {
            return (
                <div className="feedback-content">
                    <div className="feedback-eg">
                        注：会将当前任务内的所有矢量数据打包反馈
                    </div>
                    <Descriptions
                        className="path-content"
                        title={
                            <span className="feedback-title">环境基本信息</span>
                        }>
                        <Descriptions.Item>
                            环境地址: {activeTask.Input_imp_data_path}
                            <br />
                            编辑平台版本: {CONFIG.version}
                            <br />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        bordered
                        className="task-content"
                        title={
                            <span className="feedback-title">任务基本信息</span>
                        }
                        size="small">
                        <Descriptions.Item label="工程编号" span={3}>
                            {activeTask.projectId}
                        </Descriptions.Item>
                        <Descriptions.Item label="工作人员" span={3}>
                            {loginUser.name} {loginUser.roleName}
                        </Descriptions.Item>
                        <Descriptions.Item label="任务编号" span={3}>
                            {activeTask.taskId}
                        </Descriptions.Item>
                        <Descriptions.Item label="任务类型&amp;状态" span={3}>
                            {activeTask.nodeDesc}-{activeTask.manualStatusDesc}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            );
        } else {
            return <div>请打开一个任务</div>;
        }
    };

    renderFooter = () => {
        return (
            <div>
                <Button type="primary" onClick={this.handleCancel}>
                    取消
                </Button>
                <Button
                    type="primary"
                    loading={this.state.loading}
                    onClick={this.setFeedback}>
                    反馈
                </Button>
            </div>
        );
    };

    _successModal = () => {
        const { FeedbackStore } = this.props;
        const { feedbackData } = FeedbackStore;
        //反馈成功
        Modal.success({
            title: '已成功反馈！',
            content: (
                <div className="success-modal">
                    <p>反馈时间：{feedbackData.feedbackTime}</p>
                    <p>数据唯一编码：{feedbackData.dataId}</p>
                    <p>相关信息请同步记录到编辑平台问题表中。</p>
                </div>
            ),
        });
    };

    setFeedback = async () => {
        const {
            TaskStore,
            OperateHistoryStore,
            FeedbackStore,
            appStore,
        } = this.props;
        this.setState({ loading: true });
        const { loginUser } = appStore;
        const { activeTask } = TaskStore;
        const newTaskType = taskType.filter((item) => {
            return activeTask.processName === item.name;
        });
        const Index = newTaskType.findIndex((item) => {
            if (activeTask.isLocal) {
                return item.isLocal === true;
            } else {
                return item.isLocal === false;
            }
        });
        try {
            let params = {
                taskId: activeTask.taskId,
                taskType: newTaskType[Index].type,
                taskStatus: activeTask.manualStatusDesc,
                enviromentAddress: activeTask.Input_imp_data_path,
                edition: CONFIG.version,
                projectId: activeTask.projectId,
                operator: loginUser.username,
            };
            // console.log('params', params);

            await TaskStore.submit();
            await TaskStore.writeEditLog();
            OperateHistoryStore.save();
            await FeedbackStore.feedback(params);
            this._successModal();
            this.setState({
                visible: false,
                loading: false,
            });
        } catch (e) {
            Modal.error({
                title: '反馈失败！',
                content: (
                    <div className="fail-modal">
                        <p>问题数据反馈失败，</p>
                        <p>请再次提交反馈申请。</p>
                    </div>
                ),
            });
            this.setState({
                visible: false,
                loading: false,
            });
        }
    };

    toggle = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
}
export default FeedBack;
