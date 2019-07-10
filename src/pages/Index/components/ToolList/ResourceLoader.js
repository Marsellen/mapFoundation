import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { Modal, Button, Form, Input } from 'antd';

const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

@Form.create()
@inject('taskStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class ResourceLoader extends React.Component {
    state = {
        visible: false
    };
    render() {
        return (
            <span>
                <ToolIcon icon="daoru" title="资料加载" action={this.action} />
                {this.renderModal()}
            </span>
        );
    }

    renderModal = () => {
        const { form } = this.props;

        return (
            <Modal
                visible={this.state.visible}
                title="资料加载"
                destroyOnClose={true}
                onCancel={this.handleCancel}
                maskClosable={false}
                footer={this.renderFooter()}>
                <Form colon={false} hideRequiredMark={true} {...formLayout}>
                    <Form.Item label="资料名称">
                        {form.getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '资料名称必填'
                                }
                            ],
                            initialValue: '123'
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="资料路径">
                        {form.getFieldDecorator('url', {
                            rules: [
                                {
                                    required: true,
                                    message: '资料路径必填'
                                },
                                {
                                    pattern: /^http:\/\/*|^https:\/\/*/,
                                    message: '资料路径必需为url'
                                }
                            ],
                            initialValue: 'http://10.43.16.80:15001/zhushanhu'
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    renderFooter = () => {
        return <Button onClick={this.submit}>加载</Button>;
    };

    action = () => {
        this.setState({
            visible: true
        });
    };

    submit = () => {
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
                    this.save();
                }
            });
        } else {
            this.save();
        }
    };

    save = () => {
        const {
            form,
            taskStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            taskStore.load(
                values,
                () => {
                    this.setState({
                        visible: false
                    });
                    OperateHistoryStore.destroy();
                    DataLayerStore.activeEditor();
                    ToolCtrlStore.updateByEditLayer();
                },
                () => {
                    Modal.error({
                        title: '此资料已打开',
                        okText: '确定'
                    });
                }
            );
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default ResourceLoader;
