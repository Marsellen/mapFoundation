import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Modal, Select, Input } from 'antd';
import { ATTR_TABLE_CONFIG } from 'src/config/attrsConfig';
import { TYPE_SELECT_OPTION_MAP, DEFAULT_PROPERTIES_MAP } from 'src/config/adMapDataConfig';
import RadioIconGroup from 'src/component/common/radioIconGroup';
import SearchIconGroup from 'src/component/common/searchIconGroup';
import CheckBoxIconGroup from 'src/component/common/checkBoxIconGroup';
import _ from 'lodash';
import AdDateInput from 'src/component/common/form/adDateInput';
import { getValidator } from 'src/util/validator';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import { testDataString } from 'src/util/timeUtils';

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
        attrs: [],
        confirmLoading: false
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    render() {
        const { attrs, visible, confirmLoading } = this.state;
        return (
            <Modal
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                destroyOnClose={true}
                confirmLoading={confirmLoading}
                title="新增"
                okText="确定"
                cancelText="取消"
                wrapClassName="edit-attr-modal"
            >
                <Form colon={false} hideRequiredMark={true} layout="vertical" className="svg-style">
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
        const { form, handleSave } = this.props;
        const { key, properties } = this.state;
        this.setState({
            confirmLoading: true
        });
        form.validateFields((err, values) => {
            if (err) {
                this.setState({
                    confirmLoading: false
                });
                return;
            }
            handleSave(key, values, properties, this.onCancel);
        });
    };

    onCancel = () => {
        const { AttributeStore } = this.props;
        this.setState({
            visible: false,
            confirmLoading: false
        });
        AttributeStore.showTime(true);
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

    renderAdDateInput = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        { validator: this.checkDate },
                        ...this.getValidatorSetting(item.validates)
                    ],
                    initialValue: item.value,
                    validateTrigger: 'onBlur'
                })(<AdDateInput />)}
            </Form.Item>
        );
    };

    checkDate = (rule, value, callback) => {
        const { AttributeStore } = this.props;
        let testResult = testDataString(value);
        if (!testResult) {
            AttributeStore.showTime(false);
            callback(new Error('与值域不符合'));
        } else {
            AttributeStore.showTime(true);
            callback();
        }
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
                })(<Input />)}
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
                })(<AdInputNumber type="number" disabled={item.disabled} />)}
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
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={this.attrOnChange(item.link)}
                    >
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

    renderSearchIconGroup = (item, index) => {
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
                })(<SearchIconGroup options={options} />)}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index) => {
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
                })(<CheckBoxIconGroup options={options} max={3} />)}
            </Form.Item>
        );
    };

    attrOnChange = key => {
        switch (key) {
            case 'RS_VALUE':
                return this.linkRsValueChangeEvent;
            case 'CONT_VALUE':
                return this.linkContValueChangeEvent;
            default:
                return () => { };
        }
    };

    linkRsValueChangeEvent = value => {
        const { attrs } = this.state;
        const { form } = this.props;
        let _attrs = _.cloneDeep(attrs);
        let index = _attrs.findIndex(attr => attr.key == 'RS_VALUE');
        _attrs[index].type = _attrs[index].type.replace(/[0-9]/, '') + value;
        form.setFieldsValue({
            [_attrs[index].key]: null
        });
        this.setState({
            attrs: _attrs
        });
    };

    linkContValueChangeEvent = value => {
        const { attrs } = this.state;
        const { form } = this.props;
        let _attrs = _.cloneDeep(attrs);
        let index = _attrs.findIndex(attr => attr.key == 'CONT_VALUE');
        switch (value) {
            case 0:
            case 1:
            case 2:
                _attrs[index].disabled = true;
                break;
            case 3:
                _attrs[index].disabled = false;
                _attrs[index].validates = 'Numeric|range|0|120';
                break;
            case 4:
                _attrs[index].disabled = false;
                _attrs[index].validates = 'Numeric|range|0|110';
                break;
        }
        form.setFieldsValue({
            [_attrs[index].key]: 0
        });
        this.setState({
            attrs: _attrs
        });
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