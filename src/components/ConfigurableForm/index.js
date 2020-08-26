import React from 'react';
import { Form, Select, Input } from 'antd';
import 'less/components/configurable-form.less';
import AdInputNumber from 'src/components/Form/AdInputNumber';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 }
    }
};

@Form.create()
class ConfigurableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateKey: null };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.updateKey !== state.updateKey) {
            //重置表单值
            const formData = props.form.getFieldsValue();
            for (let i in formData) {
                formData[i] = props.initData[i];
            }
            props.form.setFieldsValue(formData);
            return {
                ...state,
                updateKey: props.updateKey
            };
        }
        return null;
    }

    //获取表单某控件值
    getFieldValue = (fieldName, initValue) => {
        if (!fieldName) return;
        const value = this.props.form.getFieldValue(fieldName);
        const currentValue = value || value === 0 ? value : initValue;
        return currentValue;
    };

    handleChange = (name, value) => {
        const { fieldChange, form } = this.props;
        if (!fieldChange[name]) return;
        form.setFieldsValue({
            [name]: value
        });
        fieldChange[name]();
    };

    formItemConfig = item => {
        const { initData, form } = this.props;
        const { setFieldsValue } = form;
        const { name, initialValue, rules, resetField } = item;

        return {
            initialValue: initData[name] || initialValue,
            rules:
                rules &&
                Object.keys(rules).map(ruleName => {
                    const ruleVal = rules[ruleName];
                    const { value, message, fieldName, fieldValue } = ruleVal;
                    const currentVal = this.getFieldValue(fieldName, initData[fieldName]);
                    return {
                        [ruleName]: fieldName ? currentVal == fieldValue : value,
                        message: message
                    };
                }),
            //改变其它表单控件值
            getValueFromEvent: param => {
                const isObject = typeof param === 'object';
                const value = isObject ? param.target.value : param;
                resetField && setFieldsValue({ ...resetField, [name]: value });
                return value;
            }
        };
    };

    //获取下拉菜单的选项
    getSelectOption = (option, initData) => {
        if (!option) return;
        const { data, secondKey, fieldName } = option;
        //有secondKey，secondKey的值是下拉框选项数据的第二个键，需要结合第二个键，获取下拉框选项数组
        if (secondKey) {
            const secondKeyValue = this.getFieldValue(secondKey, initData[secondKey]);
            return data[secondKeyValue];
        }
        //有fieldName，根据该fieldName的值，获取对应data_[fieldValue]作为下拉框选项数组
        if (fieldName) {
            const optionFieldValue = this.getFieldValue(fieldName, initData[fieldName]);
            return option[`data_${optionFieldValue}`];
        }
        //除以上两种情况，直接拿静态配置的下拉框选项数组
        return data;
    };

    //获取表单可用状态
    getDisabledStatus = (disabled, initData) => {
        if (!disabled) return true;
        const { fieldName, fieldValue } = disabled;
        const disabledFieldValue = this.getFieldValue(fieldName, initData[fieldName]);
        const isDisabled = fieldValue ? disabledFieldValue == fieldValue : disabledFieldValue;
        return isDisabled;
    };

    _renderInput = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isDisabled = this.getDisabledStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <Input
                        disabled={editable ? !isDisabled : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isDisabled : true} />
                )}
            </Form.Item>
        );
    };

    _renderInputNumber = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isDisabled = this.getDisabledStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <AdInputNumber
                        disabled={editable ? !isDisabled : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isDisabled : true} />
                )}
            </Form.Item>
        );
    };

    _renderSelect = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, option, tool: Tool, className, editable, editableByField, layout } = item;
        const selectOptions = this.getSelectOption(option, initData);
        const isDisabled = this.getDisabledStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <Select
                        dropdownMatchSelectWidth={false}
                        disabled={editable ? !isDisabled : true}
                        onChange={value => this.handleChange(name, value)}
                    >
                        {Array.isArray(selectOptions) &&
                            selectOptions.map(optionItem => {
                                return (
                                    <Option
                                        value={optionItem[option.value]}
                                        key={optionItem[option.value]}
                                    >
                                        {optionItem[option.label]}
                                    </Option>
                                );
                            })}
                    </Select>
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isDisabled : true} />
                )}
            </Form.Item>
        );
    };

    _renderTextArea = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isDisabled = this.getDisabledStatus(editableByField, initData);

        return (
            <Form.Item
                label={item.label}
                key={item.name}
                className={`form-item-textarea ${className}`}
                {...layout}
            >
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <TextArea
                        rows={4}
                        disabled={editable ? !isDisabled : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isDisabled : true} />
                )}
            </Form.Item>
        );
    };

    render() {
        const { initData, formConfig } = this.props;
        return (
            <Form
                className="configurable-form"
                hideRequiredMark={true}
                colon={false}
                labelAlign="left"
                {...formItemLayout}
            >
                {formConfig.map(item => {
                    const _renderFn = this['_render' + item.type];
                    return _renderFn ? _renderFn(item, initData) : null;
                })}
            </Form>
        );
    }
}

export default ConfigurableForm;
