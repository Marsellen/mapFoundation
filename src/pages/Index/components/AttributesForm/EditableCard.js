import React from 'react';
import { Button, Input, Select, Modal, Form, Icon } from 'antd';
import RadioIconGroup from 'src/components/RadioIconGroup';
import _ from 'lodash';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import './style.less';

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
class EditableCard extends React.Component {
    state = {
        visible: false,
        attrs: []
    };

    static getDerivedStateFromProps(props, state) {
        const { value } = props;
        let config = _.cloneDeep(ATTR_TABLE_CONFIG[value.source]);
        config.forEach(item => {
            item.value = value.properties[item.key];
        });
        return {
            ...state,
            attrs: config
        };
    }

    render() {
        const { visible, attrs } = this.state;
        const { readonly } = this.props;
        return (
            <div id="newEdit">
                {attrs.map((item, index) => this.renderItem(item, index, true))}
                <div className="attr">
                    {!readonly && (
                        <Button onClick={this.edit} id="newEdit-edit">
                            <Icon type="edit" />{' '}
                        </Button>
                    )}
                    {!readonly && (
                        <Button onClick={this.onDelete} id="newEdit-del">
                            <Icon type="delete" />
                        </Button>
                    )}
                </div>
                <Modal
                    visible={visible}
                    title="新建"
                    okText="保存"
                    cancelText="取消"
                    onCancel={this.onCancel}
                    onOk={this.onCreate}>
                    {this.renderContent()}
                </Modal>
            </div>
        );
    }

    edit = () => {
        this.setState({
            visible: true
        });
    };

    onCreate = () => {
        const { value, onChange, form } = this.props;
        const { attrs } = this.state;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            onChange({
                ...value,
                properties: {
                    ...values
                }
            });
            attrs.forEach(item => {
                item.value = values[item.key];
            });
            this.setState({ attrs });
            this.hide();
        });
    };

    onCancel = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.hide();
        });
    };

    onDelete = () => {
        const { onDelete, index } = this.props;
        Modal.confirm({
            title: '删除后无法撤回，确认删除？',
            onOk: () => {
                onDelete(index);
            }
        });
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };

    renderContent = () => {
        const { attrs } = this.state;
        return (
            <Form layout="vertical">
                {attrs.map((item, index) => this.renderItem(item, index))}
            </Form>
        );
    };

    renderItem = (item, index, readonly) => {
        return this['render' + item.domType](item, index, readonly);
    };

    renderText = (item, index, readonly) => {
        const { form } = this.props;
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

    renderInput = (item, index, readonly) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填`
                            },
                            ...(item.validates || []).map(validate => validate)
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

    renderSelect = (item, index, readonly) => {
        const { form } = this.props;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
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
                            disabled={readonly}
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={this.attrOnChange(item.link)}>
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

    renderRadioIconGroup = (item, index, readonly) => {
        const { form } = this.props;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        let layout = readonly ? formItemLayout : {};
        return (
            <Form.Item key={index} label={item.name} {...layout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
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
                    })(<RadioIconGroup options={options} disabled={readonly} />)
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options)}
                    </span>
                )}
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

    getArrayOption = (value, arr) => {
        let text = '';
        const pos = arr.findIndex(val => val.value === value);
        text =
            pos != -1 && this.isPresent(arr[pos].label) ? arr[pos].label : '--';
        return text;
    };

    isPresent(obj) {
        return (!!obj && String(obj) != '') || obj === 0;
    }
}

export default EditableCard;
