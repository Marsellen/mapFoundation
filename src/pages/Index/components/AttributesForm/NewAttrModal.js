import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Modal, Select } from 'antd';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    DEFAULT_PROPERTIES_MAP
} from 'src/config/ADMapDataConfig';
import RadioIconGroup from 'src/components/RadioIconGroup';
import _ from 'lodash';
import AdInput from 'src/components/Form/Input';
import { getValidator } from 'src/utils/form/validator';
import AdInputNumber from 'src/components/Form/InputNumber';

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
                destroyOnClose={true}
                title="新增"
                okText="确定"
                cancelText="取消">
                <Form
                    colon={false}
                    hideRequiredMark={true}
                    layout="vertical"
                    className="svg-style">
                    {attrs.map((item, index) => this.renderItem(item, index))}
                </Form>
            </Modal>
        );
    }

    show = (key, properties) => {
        let config = _.cloneDeep(ATTR_TABLE_CONFIG[key]);
        config.forEach(item => {
            item.value = DEFAULT_PROPERTIES_MAP[key][item.key];
        });
        this.setState({
            key,
            properties,
            visible: true,
            attrs: config
        });
    };

    onOk = () => {
        const { AttributeStore, form } = this.props;
        const { key, properties } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            AttributeStore.newAttr(key, values, properties).then(() => {
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
                })(<AdInput disabled placeholder={item.placeholder} />)}
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

                        ...this.getValidatorSetting(item.validates)
                    ],
                    initialValue: item.value
                })(<AdInput />)}
            </Form.Item>
        );
    };

    renderInputNumber = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填,请输入合法的数字`
                        },

                        ...this.getValidatorSetting(item.validates)
                    ],
                    initialValue: item.value
                })(<AdInputNumber type="number" />)}
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

    getValidatorSetting = validates => {
        return validates
            ? [
                  {
                      validator: getValidator(validates)
                  }
              ]
            : [];
    };
}

export default NewAttrModal;
