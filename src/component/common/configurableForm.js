import React from 'react';
import { Form, Select, Input } from 'antd';
import 'less/configurable-form.less';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import RadioIconGroup from 'src/component/common/radioIconGroup';
import { getValidator } from 'src/util/validator';
import RcViewer from 'src/component/common/rcViewer';

const { Option } = Select;
const { TextArea } = Input;

@Form.create()
class ConfigurableForm extends React.Component {
    constructor() {
        super();
        this.options = {
            inline: true //内联模式
        };
    }
    componentWillUnmount() {
        this.props.form.resetFields();
    }
    //获取表单某控件值
    getFieldValue = (fieldName, initValue) => {
        if (!fieldName) return;
        const value = this.props.form.getFieldValue(fieldName);
        const currentValue = value || value === 0 ? value : initValue;
        return currentValue;
    };

    handleChange = (name, value) => {
        const { form } = this.props;
        form.setFieldsValue({
            [name]: value
        });
    };

    getCompareRes = (fieldValue, currentVal) => {
        if (!fieldValue) return false;
        if (Array.isArray(fieldValue)) {
            return fieldValue.includes(currentVal);
        } else {
            return currentVal == fieldValue;
        }
    };

    formItemConfig = item => {
        const { initData, form, fieldChange } = this.props;
        const { setFieldsValue } = form;
        const { name, initialValue, rules, resetField, resetFieldByField } = item;
        return {
            initialValue: initData?.[name] ?? initialValue,
            rules:
                rules &&
                Object.entries(rules).map(([ruleName, ruleVal]) => {
                    if (ruleName === 'validator') {
                        return { [ruleName]: getValidator(ruleVal) };
                    } else {
                        const { value, message, fieldName, fieldValue } = ruleVal;
                        const currentVal = this.getFieldValue(fieldName, initData?.[fieldName]);
                        return {
                            [ruleName]: fieldName
                                ? this.getCompareRes(fieldValue, currentVal)
                                : value,
                            message: message
                        };
                    }
                }),
            //改变其它表单控件值
            getValueFromEvent: param => {
                const value = param?.target?.value ?? param;
                let resetObj;
                //如果有resetField，根据配置重置表单其它字段
                if (resetField) {
                    resetObj = resetField?.[value] ?? resetField?.default ?? {};
                }
                //如果有resetFieldByField，根据配置重置表单其它字段
                if (resetFieldByField) {
                    const { data, dependFieldNames } = resetFieldByField;
                    resetObj = data || {};
                    dependFieldNames.forEach(fieldName => {
                        const fieldValue = this.getFieldValue(fieldName, initData?.[fieldName]);
                        resetObj = resetObj?.[fieldValue] ?? {};
                    });
                }
                const formData = { ...resetObj, [name]: value };
                setFieldsValue(formData);
                //调用onChange事件
                fieldChange?.default?.(name, value, formData);
                fieldChange?.[name]?.(name, value, formData);
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
            const secondKeyValue = this.getFieldValue(secondKey, initData?.[secondKey]);
            return data[secondKeyValue];
        }
        //有fieldName，根据该fieldName的值，获取对应data_[fieldValue]作为下拉框选项数组
        if (fieldName) {
            const optionFieldValue = this.getFieldValue(fieldName, initData?.[fieldName]);
            return option[`data_${optionFieldValue}`];
        }
        //除以上两种情况，直接拿静态配置的下拉框选项数组
        return data;
    };

    getEditStatus = (condition, initData) => {
        const { fieldName, fieldValue } = condition;
        const currentVal = this.getFieldValue(fieldName, initData?.[fieldName]);
        const isEditable = fieldValue ? this.getCompareRes(fieldValue, currentVal) : currentVal;
        return isEditable;
    };

    //判断是否相等
    getAllEditStatus = (editableByField, initData) => {
        if (!editableByField) return true;
        if (Array.isArray(editableByField)) {
            return editableByField
                .map(condition => this.getEditStatus(condition, initData))
                .every(status => status);
        } else {
            return this.getEditStatus(editableByField, initData);
        }
    };

    _renderInput = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isEditable = this.getAllEditStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <Input
                        disabled={editable ? !isEditable : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isEditable : true} />
                )}
            </Form.Item>
        );
    };

    _renderText = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const {
            name,
            tool: Tool,
            initialValue,
            className,
            editable,
            editableByField,
            layout
        } = item;
        const isEditable = this.getAllEditStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(<span>{initialValue}</span>)}
                {Tool && <Tool form={form} className="tool" />}
            </Form.Item>
        );
    };

    _renderInputNumber = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isEditable = this.getAllEditStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <AdInputNumber
                        disabled={editable ? !isEditable : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isEditable : true} />
                )}
            </Form.Item>
        );
    };

    _renderSelect = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const {
            name,
            option,
            tool: Tool,
            className,
            editable,
            editableByField,
            layout,
            optionClass
        } = item;
        const selectOptions = this.getSelectOption(option, initData);
        const isEditable = this.getAllEditStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <Select
                        showSearch={item.showSearch}
                        disabled={editable ? !isEditable : true}
                        onChange={value => this.handleChange(name, value)}
                    >
                        {Array.isArray(selectOptions) &&
                            selectOptions.map(optionItem => {
                                return (
                                    <Option
                                        title={optionItem[option.label]}
                                        value={optionItem[option.value]}
                                        key={optionItem[option.value]}
                                        className={`configurable-form-select-option ${optionClass}`}
                                    >
                                        {optionItem[option.label]}
                                    </Option>
                                );
                            })}
                    </Select>
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isEditable : true} />
                )}
            </Form.Item>
        );
    };

    _renderTextArea = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, tool: Tool, className, editable, editableByField, layout } = item;
        const isEditable = this.getAllEditStatus(editableByField, initData);

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
                        disabled={editable ? !isEditable : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isEditable : true} />
                )}
            </Form.Item>
        );
    };

    _renderRadioIconGroup = (item, initData) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { name, option, tool: Tool, className, editable, editableByField, layout } = item;
        const isEditable = this.getAllEditStatus(editableByField, initData);

        return (
            <Form.Item label={item.label} key={item.name} className={className} {...layout}>
                {getFieldDecorator(
                    item.name,
                    this.formItemConfig(item)
                )(
                    <RadioIconGroup
                        options={option.data}
                        disabled={editable ? !isEditable : true}
                        onChange={value => this.handleChange(name, value)}
                    />
                )}
                {Tool && (
                    <Tool form={form} className="tool" disabled={editable ? !isEditable : true} />
                )}
            </Form.Item>
        );
    };

    _renderImage = (item, initData) => {
        const { layout, className } = item;
        return (
            <>
                {initData?.qcPath && (
                    <Form.Item key={item.name} label={item.label} className={className} {...layout}>
                        <div className="qc-marker-view-container" key={item.name}>
                            <div className="img-banner">
                                <RcViewer options={this.options}>
                                    <img src={initData?.qcPath} alt="图片" />
                                </RcViewer>
                            </div>
                        </div>
                    </Form.Item>
                )}
            </>
        );
    };

    render() {
        const { initData, formConfig, formLayout } = this.props;
        return (
            <Form
                {...formLayout}
                className="configurable-form"
                hideRequiredMark={true}
                colon={false}
                labelAlign="left"
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
