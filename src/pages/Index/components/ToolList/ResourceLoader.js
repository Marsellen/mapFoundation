import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { Modal, Button, Form, message, Select, Input } from 'antd';
import CONFIG from 'src/config';

const processNameOptions = CONFIG.processNameOptions;
const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

@Form.create()
@inject('RenderModeStore')
@inject('TaskStore')
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
            <ToolIcon icon="ziliaojiazai" title="资料加载" action={this.action} >
                {this.renderModal()}
            </ToolIcon>


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
                        {form.getFieldDecorator('taskId', {
                            rules: [
                                {
                                    required: true,
                                    message: '资料名称必填'
                                }
                            ]
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item label="资料路径">
                        {form.getFieldDecorator('Input_imp_data_path', {
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
                            //initialValue: 'http://10.43.75.119/task/83504'
                        })(<Input onChange={this.urlOnChange} />)}
                    </Form.Item>
                    <Form.Item label="数据类型">
                        {form.getFieldDecorator('processName', {
                            rules: [
                                {
                                    required: true,
                                    message: '数据类型必填'
                                }
                            ]
                            //initialValue: ''
                        })(
                            <Select>
                                {processNameOptions.map((option, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={option.value}>
                                            {option.label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    renderFooter = () => {
        return <Button onClick={this.submit}>加载</Button>;
    };

    urlOnChange = event => {
        let url = event.target.value;
        let arr = url.split('/');
        let id = arr[arr.length - 1];
        this.props.form.setFieldsValue({
            taskId: id
        });
    };

    action = () => {
        this.setState({
            visible: true
        });
    };

    submit = () => {
        const { OperateHistoryStore, RenderModeStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        RenderModeStore.setMode('common')
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
        const { form, TaskStore } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            try {
                if (!/^\d+$/.test(values.taskId)) {
                    throw {
                        message: '资料目录不符合规范'
                    };
                }
                TaskStore.loadLocalTask(values);
                this.setState({
                    visible: false
                });
                this.clearWorkSpace();
            } catch (e) {
                message.error(e.message);
            }
        });
    };

    clearWorkSpace = () => {
        const {
            TaskStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        const { tasks } = TaskStore;
        OperateHistoryStore.destroy();
        if (tasks && tasks.length > 1) {
            DataLayerStore.activeEditor();
            ToolCtrlStore.updateByEditLayer();
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default ResourceLoader;
