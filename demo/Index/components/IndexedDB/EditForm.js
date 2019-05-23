import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
}

@Form.create()
class EditForm extends React.Component {

    render() {
        const { visible } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                visible={visible}
                title='新建'
                wrapClassName="vertical-center-modal"
                onOk={this.submit}
                onCancel={this.cancel}
            >
                <Form>
                    <FormItem label='name' {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写姓名'
                                    }
                                ]
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem label='age' {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                rules: [
                                    {
                                        type: 'number',
                                        message: '请输入数字'
                                    },
                                    {
                                        required: true,
                                        message: '请填写年龄'
                                    }
                                ]
                            })(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                    <FormItem label='address' {...formItemLayout}>
                        {
                            getFieldDecorator('address')(
                                <Input />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }

    submit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                let id = new Date().valueOf()
                this.props.handleSave({id: id, ...values})
            }
        })
    }

    cancel = () => {
        this.props.onCancel()
    }
}

export default EditForm
