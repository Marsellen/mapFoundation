import React from 'react';
import { Form, Modal, Select, Button, Input, message } from 'antd';
import { observer, inject } from 'mobx-react';
import RadioIconGroup from 'src/components/RadioIconGroup';
import CheckBoxIconGroup from 'src/components/CheckBoxIconGroup';
import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import { getValidator } from 'src/utils/form/validator';
import AdEmitter from 'src/models/event';
import { logDecorator } from 'src/utils/decorator';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import BatchAssignStore from 'src/pages/Index/store/BatchAssignStore';
import SearchIconGroup from 'src/components/SearchIconGroup';

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
@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class BatchAssignModal extends React.Component {
    render() {
        const { BatchAssignStore } = this.props;
        const { visible } = BatchAssignStore;
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
                    {this._renderForm()}
                </Form>
            </Modal>
        );
    }

    _renderTitle = () => {
        return '批量赋值';
    };

    _renderForm = () => {
        const { BatchAssignStore } = this.props;
        const { attributes } = BatchAssignStore;
        return (
            <div>
                {(attributes || []).map((item, index) =>
                    this.renderItem(item, index, 'attributes')
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

    save = () => {
        const { form } = this.props;
        form.validateFields(this.submit);
    };

    @logDecorator({ operate: '批量赋值', skipRenderMode: true })
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

    handleCancel = () => {
        const { BatchAssignStore, DataLayerStore } = this.props;
        DataLayerStore.UnQCAttrModal(['error_layer']);
        BatchAssignStore.hide();
    };

    renderItem = (item, index, name) => {
        if (typeof this['render' + item.domType] !== 'function') return;
        return this['render' + item.domType](item, index, name);
    };

    renderText = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        initialValue: item.value
                    })(<Input disabled />)
                ) : (
                    <Input placeholder="(多项内容)" disabled />
                )}
            </Form.Item>
        );
    };

    renderInputNumber = (item, index, name) => {
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
                    />
                )}
            </Form.Item>
        );
    };

    renderSearchIconGroup = (item, index, name) => {
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
                })(<SearchIconGroup options={options} />)}
            </Form.Item>
        );
    };

    renderInput = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    rules: [...this.getValidatorSetting(item.validates)],
                    initialValue: !readonly ? item.value : null
                })(<Input placeholder={!readonly ? item.value : '(多项内容)'} />)}
            </Form.Item>
        );
    };

    renderSelect = (item, index, name) => {
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

    renderRadioIconGroup = (item, index, name) => {
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
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index, name) => {
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
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    renderPercentInput = (item, index, name) => {
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
                        onChange={val => this.handleChange(val, item, name)}
                    />
                )}
            </Form.Item>
        );
    };

    handleChange = (val, filed, name) => {
        const { link } = filed;
        if (!link) return;
        const linkData = link[val] || link.default || null;
        linkData && this.props.form.setFieldsValue({ [name]: linkData });
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
