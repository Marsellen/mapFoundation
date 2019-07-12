import React from 'react';
import { inject, observer } from 'mobx-react';
import RadioIconGroup from 'src/components/RadioIconGroup';
import { Modal, Form, Input, Select, Button } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import 'less/components/attributes-modal.less';

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
@inject('AttributeStore')
@inject('DataLayerStore')
@observer
class AttributesModal extends React.Component {
    handleCancel = e => {
        const { AttributeStore } = this.props;
        AttributeStore.hide();
    };

    render() {
        const { AttributeStore } = this.props;
        const { visible } = AttributeStore;
        return (
            <Modal
                footer={this.renderFooter()}
                mask={false}
                destroyOnClose={true}
                wrapClassName="ad-attributes-modal"
                title={this.renderTitle()}
                visible={visible}
                onCancel={this.handleCancel}>
                <div className="obscuration" />
                {this.renderForm()}
            </Modal>
        );
    }

    renderTitle = () => {
        const { AttributeStore } = this.props;
        const { type } = AttributeStore;
        return DATA_LAYER_MAP[type] ? DATA_LAYER_MAP[type].label : type;
    };

    renderFooter = () => {
        const { AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return readonly ? null : (
            <Button type="primary" onClick={this.save} size="small" ghost>
                保存
            </Button>
        );
    };

    save = () => {
        const { form, AttributeStore, DataLayerStore } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            AttributeStore.setAttributes(values).then(result => {
                DataLayerStore.updateFeature(result);
            });
            AttributeStore.hide();
        });
    };

    renderForm() {
        const { AttributeStore } = this.props;
        const { attributes } = AttributeStore;
        return (
            <Form colon={false} hideRequiredMark={true}>
                {attributes.map((item, index) => this.renderItem(item, index))}
            </Form>
        );
    }

    renderItem = (item, index) => {
        return this['render' + item.domType](item, index);
    };

    renderText = (item, index) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
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

    renderInput = (item, index) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            {
                                pattern:
                                    item.validate === 'number'
                                        ? '^[0-9]*$'
                                        : '',
                                message: '请输入数字'
                            }
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

    renderSelect = (item, index) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type];
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
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

    renderRadioIconGroup = (item, index) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type];
        //console.log(item);
        return (
            <Form.Item key={index} label={item.name}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填`
                        }
                    ],
                    initialValue: item.value
                })(<RadioIconGroup options={options} disabled={readonly} />)}
            </Form.Item>
        );
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }
}

export default AttributesModal;
