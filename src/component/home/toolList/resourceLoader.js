import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { Modal, Button, Form, message, Select, Input } from 'antd';
import CONFIG from 'src/config';
import AdLocalStorage from 'src/util/adLocalStorage';

const processNameOptions = CONFIG.processNameOptions;
const roleCodes = ['producer', 'producer_leader', 'quality', 'quality_leader'];
const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};

@Form.create()
@inject('QualityCheckStore')
@inject('RenderModeStore')
@inject('TaskStore')
@inject('OperateHistoryStore')
@inject('ToolCtrlStore')
@inject('appStore')
@observer
class ResourceLoader extends React.Component {
    state = {
        visible: false
    };
    render() {
        return (
            <span>
                <ToolIcon icon="ziliaojiazai" title="资料加载" action={this.action} />
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
                footer={this.renderFooter()}
            >
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
                                {this.getProcessNameOptions(processNameOptions).map(
                                    (option, index) => {
                                        return (
                                            <Select.Option key={index} value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        );
                                    }
                                )}
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

    getProcessNameOptions = options => {
        const {
            appStore: { loginUser }
        } = this.props;
        const roleCode = roleCodes.includes(loginUser.roleCode) ? loginUser.roleCode : 'producer';
        return options.filter(item => item.roleCodes.includes(roleCode));
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

    //保存当前任务比例
    saveTaskScale = () => {
        if (!window.map) return;
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        if (!activeTaskId) return;
        const preTaskScale = window.map.getEyeView();
        const { position } = preTaskScale;
        const { x, y, z } = position;
        if (!(x === 0 && y === 0 && z === 0)) {
            AdLocalStorage.setTaskInfosStorage({
                taskId: activeTaskId,
                taskScale: preTaskScale
            });
        }
    };

    submit = () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        //保存当前任务比例
        this.saveTaskScale();
        //提示保存当前任务
        if (shouldSave) {
            Modal.confirm({
                title: '当前任务未保存，切换任务后会丢失，是否继续？',
                okText: '确定',
                cancelText: '取消',
                okType: 'danger',
                maskStyle: { zIndex: 99999999 },
                zIndex: 999999999,
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

        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            try {
                if (!/^\d+$/.test(values.taskId)) {
                    throw new Error('资料目录不符合规范');
                }
                await TaskStore.loadLocalTask(values);
                this.setState({
                    visible: false
                });
            } catch (e) {
                message.error(e.message);
            }
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default ResourceLoader;
