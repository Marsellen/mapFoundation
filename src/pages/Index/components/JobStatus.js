import React from 'react';
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import 'less/components/jobstatus.less';

@withRouter
@inject('appStore')
@inject('GetTaskStore')
@inject('OperateHistoryStore')
@observer
class JobStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    render() {
        const { GetTaskStore } = this.props;
        const { tasks } = GetTaskStore;

        return (
            <div className="flex flex-center">
                <Button
                    onClick={this.getJobs}
                    disabled={
                        tasks.data &&
                        tasks.data.taskList &&
                        tasks.data.taskList.length > 4
                            ? true
                            : false
                    }>
                    获取任务
                </Button>
                <Button onClick={this.submitJob}>提交任务</Button>
                <Modal
                    title="当前任务是否通过质检？"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}>
                    <div id="quality" className='flex'>
                        <Button onClick={this.handleCancel}>取消取消</Button>
                        <Button>质检通过</Button>
                        <Button>任务返修</Button>
                        <Button>任务返工</Button>
                    </div>
                </Modal>
            </div>
        );
    }
    submitJob = () => {
        const { appStore } = this.props;
        const { roleCode } = appStore.loginUser;
        console.log(roleCode);

        if (roleCode === 'producer') {
            Modal.confirm({
                title: '提交任务',
                content: '是否提交当前任务',
                okText: '确定',
                cancelText: '取消',
                onOK: () => {
                    console.log('已成功提交任务');
                }
            });
        } else if (roleCode === 'quality') {
            this.showModal();
        }
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    getJobs = () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        if (shouldSave) {
            Modal.confirm({
                title: '当前任务未保存，切换任务后会丢失，是否继续？',
                okText: '确定',
                cancelText: '取消',
                okType: 'danger',
                onOk: () => {
                    this.props.GetTaskStore.initTasks();
                }
            });
        } else {
            this.props.GetTaskStore.initTasks();
        }
    };
}

export default JobStatus;
