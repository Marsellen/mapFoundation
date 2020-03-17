import React from 'react';
import { inject, observer } from 'mobx-react';
import CONFIG from 'src/config';
import { Modal, Descriptions, Button } from 'antd';
import 'src/assets/less/components/hotkey.less';
import ToolIcon from 'src/components/ToolIcon';

@inject('TaskStore')
@inject('appStore')
@observer
class FeedBack extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <div className='feedback'>
                <span onClick={this.toggle}><ToolIcon icon='wentifankui' className='feedback' />问题反馈</span>
                <Modal
                    footer={this.renderFooter()}
                    title={<span className="modal-title">问题数据反馈</span>}
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    width={780}
                >
                    {this.feedBackList()}
                </Modal>
            </div>
        );
    }

    feedBackList = () => {
        const { TaskStore, appStore } = this.props;
        const { activeTaskId, validTasks } = TaskStore;
        const { loginUser } = appStore;

        try {
            let task = validTasks.filter(item => {
                return item.taskId === activeTaskId
            })

            return (
                <div>
                    <div>说明：会将当前任务内的所有矢量数据打包反馈</div>
                    <Descriptions title="环境基本信息" layout="vertical">
                        <Descriptions.Item label="环境地址">{task[0].Input_imp_data_path}</Descriptions.Item>
                        <Descriptions.Item label="编辑平台版本">{CONFIG.version}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="任务基本信息" layout="vertical">
                        <Descriptions.Item label="工程编号">{task[0].projectId}</Descriptions.Item>
                        <Descriptions.Item label="任务编号">{task[0].taskId}</Descriptions.Item>
                        <Descriptions.Item label="工作人员">{loginUser.name} {loginUser.roleName}</Descriptions.Item>
                        <Descriptions.Item label="任务类型&amp;状态">{task[0].nodeDesc}-{task[0].manualStatusDesc}</Descriptions.Item>
                    </Descriptions>
                </div >
            )
        } catch (e) {
            return (
                <div>请打开一个任务</div>
            )
        }
    };

    renderFooter = () => {
        return (
            <div>
                <Button type="primary" onClick={this.handleCancel}>
                    取消
                </Button>
                <Button type="primary" >
                    反馈
                </Button>
            </div>
        );
    };


    toggle = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}
export default FeedBack