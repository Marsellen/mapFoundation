import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import RadioIconGroup from 'src/components/RadioIconGroup';
import CheckBoxIconGroup from 'src/components/CheckBoxIconGroup';
import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import AdDateInput from 'src/components/Form/AdDateInput';
import { getValidator } from 'src/utils/form/validator';
import Filter from 'src/utils/table/filter';
import SearchIconGroup from 'src/components/SearchIconGroup';
import AdTrafficSignContent from 'src/components/Form/AdTrafficSignContent';
import { testDataString } from 'src/utils/timeUtils';

const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 10 }
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 14 }
    }
};

@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class BasicAttributesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { disabledList: this.setDisabledList() };
    }

    setDisabledList = currentValues => {
        const { AttributeStore } = this.props;
        const { attributes } = AttributeStore;
        const disabledList = attributes.reduce((total, item) => {
            const { key, linkDisabled } = item;
            const value = currentValues ? currentValues[key] : item.value;
            const fieldDisabledList = linkDisabled?.[value] ?? [];
            return [...total, ...fieldDisabledList];
        }, []);
        return [...new Set(disabledList)];
    };

    render() {
        const { AttributeStore } = this.props;
        const { attributes } = AttributeStore;
        return (
            <div>{attributes.map((item, index) => this.renderItem(item, index, 'attributes'))}</div>
        );
    }

    renderItem = (item, index, name) => {
        return this['render' + item.domType](item, index, name);
    };

    renderText = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        let value = item.filterBy ? Filter.get(item.filterBy)(item.value) : item.value;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        initialValue: value
                    })(<Input disabled onChange={val => this.handleChange(val, item, name)} />)
                ) : (
                    <span className="ant-form-text">{this.isPresent(value) ? value : '--'}</span>
                )}
            </Form.Item>
        );
    };

    renderInputNumber = (item, index, name) => {
        const { disabledList } = this.state;
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填,请输入合法的数字`
                            },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value
                    })(
                        <AdInputNumber
                            type="number"
                            disabled={disabledList?.includes(item.key)}
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderInput = (item, index, name) => {
        const { disabledList } = this.state;
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value
                    })(
                        <Input
                            disabled={disabledList?.includes(item.key)}
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderSelect = (item, index, name) => {
        const { disabledList } = this.state;
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            }
                        ],
                        initialValue: item.value
                    })(
                        <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                            }
                            disabled={disabledList?.includes(item.key)}
                            onChange={val => this.handleChange(val, item, name)}
                        >
                            {options.map((option, index) => {
                                return (
                                    <Select.Option key={index} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options)}
                    </span>
                )}
            </Form.Item>
        );
    };

    handleChange = (val, filed, name) => {
        const { key, link } = filed;
        //表单内容联动
        if (link) {
            const linkData = link[val] || link.default || null;
            linkData && this.props.form.setFieldsValue({ [name]: linkData });
        }
        //表单disabled状态联动
        const fieldsValue = this.props.form.getFieldsValue().attributes;
        fieldsValue[key] = val;
        this.setState({ disabledList: this.setDisabledList(fieldsValue) });
    };

    getArrayOption = (value, arr) => {
        let text = '';
        const pos = arr.findIndex(val => val.value === value);
        text = pos != -1 && this.isPresent(arr[pos].label) ? arr[pos].label : value;
        return text;
    };

    getCheckBoxArrayOption = (value, arr) => {
        const text =
            arr
                .filter(val => value.includes(val.value))
                .map(val => val.label)
                .join('+') || '--';
        return text;
    };

    renderRadioIconGroup = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        let layout = readonly ? formItemLayout : {};
        return (
            <Form.Item key={index} label={item.name} {...layout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            }
                        ],
                        initialValue: item.value
                    })(
                        <RadioIconGroup
                            options={options}
                            disabled={readonly}
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options)}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        let layout = readonly ? formItemLayout : {};
        return (
            <Form.Item key={index} label={item.name} {...layout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            }
                        ],
                        initialValue: item.value
                    })(
                        <CheckBoxIconGroup
                            options={options}
                            max={3}
                            disabled={readonly}
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.getCheckBoxArrayOption(item.value, options)}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderSearchIconGroup = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item
                key={index}
                label={item.name}
                className="inline-search-icon-group"
                {...formItemLayout}
            >
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
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
                    })(<SearchIconGroup options={options} />)
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options.flat(1))}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderAdTrafficSignContent = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <AdTrafficSignContent
                key={index}
                readonly={readonly}
                form={form}
                item={item}
                name={name}
            />
        );
    };

    renderPercentInput = (item, index, name) => {
        const { disabledList } = this.state;
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value
                    })(
                        <AdInputNumber
                            min={0}
                            max={1}
                            disabled={disabledList?.includes(item.key)}
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderAdDateInput = (item, index, name) => {
        const { disabledList } = this.state;
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            { validator: this.checkDate },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value,
                        validateTrigger: 'onBlur'
                    })(
                        <AdDateInput
                            key={disabledList?.includes(item.key)}
                            disabled={disabledList?.includes(item.key)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">{item.value}</span>
                )}
            </Form.Item>
        );
    };

    checkDate = (rule, value, callback) => {
        let testResult = testDataString(value);
        if (!testResult) {
            callback(new Error('与值域不符合'));
        }
        callback();
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }

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

export default BasicAttributesForm;
