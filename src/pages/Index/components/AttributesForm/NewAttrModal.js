import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Modal, Select } from 'antd';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import RadioIconGroup from 'src/components/RadioIconGroup';
import _ from 'lodash';

const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 }
    }
};

@Form.create()
@inject('AttributeStore')
@observer
class NewAttrModal extends React.Component {
    state = {
        visible: false,
        attrs: []
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    render() {
        const { attrs, visible } = this.state;
        return (
            <Modal
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                destroyOnClose={true}>
                <Form colon={false} hideRequiredMark={true}>
                    {attrs.map((item, index) => this.renderItem(item, index))}
                </Form>
            </Modal>
        );
    }

    show = key => {
        let config = _.cloneDeep(ATTR_TABLE_CONFIG[key]);
        this.setState({
            key: key,
            visible: true,
            attrs: config
        });
    };

    onOk = () => {
        const { AttributeStore, form } = this.props;
        const { key } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            AttributeStore.newAttr(key, values).then(() => {
                this.onCancel();
            });
        });
    };

    onCancel = () => {
        this.setState({
            visible: false
        });
    };

    renderItem = (item, index) => {
        return this['render' + item.domType](item, index);
    };

    renderText = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    initialValue: item.value
                })(<Input disabled placeholder={item.placeholder} />)}
            </Form.Item>
        );
    };

    renderInput = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填`
                        },
                        ...(item.validates || []).map(validate => validate)
                    ],
                    initialValue: item.value
                })(<Input />)}
            </Form.Item>
        );
    };

    renderSelect = (item, index) => {
        const { form } = this.props;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填`
                        },
                        ...(item.validates || []).map(validate => {
                            return {
                                pattern: validate.pattern,
                                message: validate.message
                            };
                        })
                    ],
                    initialValue: item.value
                })(
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={this.attrOnChange(item.link)}>
                        {options.map((option, index) => {
                            return (
                                <Select.Option key={index} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )}
            </Form.Item>
        );
    };

    renderRadioIconGroup = (item, index) => {
        const { form } = this.props;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={item.name}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填`
                        },
                        ...(item.validates || []).map(validate => {
                            return {
                                pattern: validate.pattern,
                                message: validate.message
                            };
                        })
                    ],
                    initialValue: item.value
                })(<RadioIconGroup options={options} />)}
            </Form.Item>
        );
    };

    attrOnChange = key => {
        if (key) {
            return value => {
                const { attrs } = this.state;
                const { form } = this.props;
                let index = attrs.findIndex(attr => attr.key == key);
                attrs[index].type =
                    attrs[index].type.replace(/[0-9]/, '') + value;
                form.setFieldsValue({
                    [attrs[index].key]: null
                });
                this.setState({
                    attrs
                });
            };
        } else {
            return () => {};
        }
    };
}

export default NewAttrModal;
