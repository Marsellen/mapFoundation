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
                onCancel={this.handleCancel}>
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

    @logDecorator({ operate: '批量赋值' })
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
        const { BatchAssignStore } = this.props;
        BatchAssignStore.hide();
    };

    renderItem = (item, index, name) => {
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
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderInputNumber = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
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
                    })(<AdInputNumber type="number" />)
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderInput = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
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
                    })(<Input disabled={readonly} />)
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderSelect = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
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
                            disabled={readonly}
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }>
                            {options.map((option, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={option.value}>
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

    getArrayOption = (value, arr) => {
        let text = '';
        const pos = arr.findIndex(val => val.value === value);
        text =
            pos != -1 && this.isPresent(arr[pos].label) ? arr[pos].label : '--';
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
                    })(<RadioIconGroup options={options} disabled={readonly} />)
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options)}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index, name) => {
        const { form } = this.props;
        const { readonly } = item;
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
                            disabled={readonly}
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
