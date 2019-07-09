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
                footer={this.renderFooter()}>
                <Form colon={false} hideRequiredMark={true} {...formLayout}>
                    <Form.Item label="资料名称">
                        {form.getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '资料名称必填'
                                }
                            ]
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
                            ]
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    renderFooter = () => {
        return <Button onClick={this.save}>加载</Button>;
    };

    action = () => {
        this.setState({
            visible: true
        });
    };

    save = () => {
        const { form, taskStore } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            taskStore.load(values, () => {
                this.setState({
                    visible: false
                });
            });
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default ResourceLoader;
