import React from 'react';
import { Form, Modal, Select, Button, Input, message } from 'antd';
import { observer, inject } from 'mobx-react';
import RadioIconGroup from 'src/components/RadioIconGroup';
import CheckBoxIconGroup from 'src/components/CheckBoxIconGroup';
import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import AdDateInput from 'src/components/Form/AdDateInput';
import { getValidator } from 'src/utils/form/validator';
import AdEmitter from 'src/models/event';
import { logDecorator } from 'src/utils/decorator';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import BatchAssignStore from 'src/pages/Index/store/BatchAssignStore';
import SearchIconGroup from 'src/components/SearchIconGroup';
import { testDataString } from 'src/utils/timeUtils';
import BuriedPoint from 'src/utils/BuriedPoint';

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

@Form.create()
@inject('BatchAssignStore')
@inject('AttributeStore')
@observer
class BatchAssignModal extends React.Component {
    render() {
        const { BatchAssignStore } = this.props;
        const { visible } = BatchAssignStore;
        const disabledList = this.getDisabledList();
        return (
            <Modal
                footer={this._renderFooter()}
                mask={false}
                destroyOnClose={true}
                wrapClassName="ad-attributes-modal"
                title={this._renderTitle()}
                visible={visible}
                onCancel={this.handleCancel}
            >
                <div className="obscuration" />
                <Form colon={false} hideRequiredMark={true}>
                    {this._renderForm(disabledList)}
                </Form>
            </Modal>
        );
    }

    _renderTitle = () => {
        return '批量赋值';
    };

    _renderForm = disabledList => {
        const { BatchAssignStore } = this.props;
        const { attributes } = BatchAssignStore;
        return (
            <div>
                {(attributes || []).map((item, index) =>
                    this.renderItem(item, index, 'attributes', disabledList)
                )}
            </div>
        );
    };

    _renderFooter = () => {
        return (
            <Button type="primary" onClick={this.save} size="small" ghost>
                保存
            </Button>
        );
    };

    getDisabledList = () => {
        const { BatchAssignStore } = this.props;
        const { attributes } = BatchAssignStore;
        if (!attributes) return;
        const fieldsValue = this.props.form.getFieldsValue().attributes;
        const disabledList = attributes.reduce((total, item) => {
            const { key, linkDisabled } = item;
            const value = fieldsValue?.[key] ?? item.value;
            const fieldDisabledList = linkDisabled?.[value] ?? [];
            return [...total, ...fieldDisabledList];
        }, []);
        return [...new Set(disabledList)];
    };

    save = () => {
        const { form } = this.props;
        form.validateFields(this.submit);
    };

    @logDecorator({
        operate: '批量赋值',
        skipRenderMode: true,
        toolType: 'batch_attr_edit_modal'
    })
    async submit(err, values) {
        if (err) {
            return;
        }
        try {
            let result = BatchAssignStore.submit(values);
            AdEmitter.emit('fetchViewAttributeData');
            DataLayerStore.clearPick();
            return result;
        } catch (e) {
            message.error(e.message);
            throw e;
        }
    }

    handleCancel = e => {
        const channel = e?.keyCode ? 'esc' : 'close';
        const { BatchAssignStore, AttributeStore } = this.props;
        DataLayerStore.UnQCAttrModal(['error_layer']);
        BatchAssignStore.hide();
        AttributeStore.showTime(true);
        BuriedPoint.toolBuriedPointEnd('batch_attr_edit_modal', channel);
    };

    renderItem = (item, index, name, disabledList) => {
        if (typeof this['render' + item.domType] !== 'function') return;
        return this['render' + item.domType](item, index, name, disabledList);
    };

    renderText = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            item.key != 'UPD_STAT' && (
                <Form.Item key={index} label={item.name} {...formItemLayout}>
                    {!readonly ? (
                        form.getFieldDecorator(name + '.' + item.key, {
                            initialValue: item.value
                        })(<Input disabled />)
                    ) : (
                        <Input placeholder="(多项内容)" disabled />
                    )}
                </Form.Item>
            )
        );
    };

    renderInputNumber = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    rules: [...this.getValidatorSetting(item.validates)],
                    initialValue: !readonly ? item.value : null
                })(
                    <AdInputNumber
                        placeholder={!readonly ? item.value : '(多项内容)'}
                        type="number"
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderSearchIconGroup = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly, type } = item;
        const options = TYPE_SELECT_OPTION_MAP[type] || [];
        return (
            <Form.Item
                key={index}
                label={item.name}
                className="inline-search-icon-group"
                {...formItemLayout}
            >
                {form.getFieldDecorator(name + '.' + item.key, {
                    initialValue: !readonly ? item.value : undefined
                })(
                    <SearchIconGroup
                        options={options}
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderInput = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    rules: [...this.getValidatorSetting(item.validates)],
                    initialValue: !readonly ? item.value : null
                })(
                    <Input
                        placeholder={!readonly ? item.value : '(多项内容)'}
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderSelect = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    initialValue: !readonly ? item.value : undefined
                })(
                    <Select
                        showSearch
                        optionFilterProp="children"
                        // disabled={readonly}
                        placeholder={!readonly ? item.value : '(多项内容)'}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                )}
            </Form.Item>
        );
    };

    getArrayOption = (value, arr) => {
        let text = '';
        const pos = arr.findIndex(val => val.value === value);
        text = pos != -1 && this.isPresent(arr[pos].label) ? arr[pos].label : '--';
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

    renderRadioIconGroup = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={this.getLabel(readonly, item)}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    initialValue: !readonly ? item.value : undefined
                })(
                    <RadioIconGroup
                        options={options}
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={this.getLabel(readonly, item)}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    initialValue: !readonly ? item.value : undefined
                })(
                    <CheckBoxIconGroup
                        options={options}
                        max={3}
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderPercentInput = (item, index, name, disabledList) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    rules: [...this.getValidatorSetting(item.validates)],
                    initialValue: !readonly ? item.value : null
                })(
                    <AdInputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        placeholder={!readonly ? item.value : '(多项内容)'}
                        disabled={disabledList?.includes(item.key)}
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderAdDateInput = (item, index, name, disabledList) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
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
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
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

    handleChange = (val, filed, name) => {
        const { link } = filed;
        //表单内容联动
        if (link) {
            const linkData = link[val] || link.default || null;
            linkData && this.props.form.setFieldsValue({ [name]: linkData });
        }
    };

    getLabel = (readonly, item) => {
        const placeholder = (
            <span>
                {item.name}
                <span style={{ color: '#9A9A9A' }}>(多项内容)</span>
            </span>
        );
        return !readonly ? item.name : placeholder;
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

export default BatchAssignModal;
