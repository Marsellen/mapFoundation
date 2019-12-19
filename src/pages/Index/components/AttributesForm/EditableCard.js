import React from 'react';
import { Button, Select, Modal, Form, Icon } from 'antd';
import RadioIconGroup from 'src/components/RadioIconGroup';
import SearchIconGroup from 'src/components/SearchIconGroup';
import _ from 'lodash';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/ADMapDataConfig';
import { getLayerIDKey } from 'src/utils/vectorUtils';
import './style.less';
import AdInput from 'src/components/Form/AdInput';
import { getValidator } from 'src/utils/form/validator';
import AdDateInput from 'src/components/Form/AdDateInput';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import CheckBoxIconGroup from 'src/components/CheckBoxIconGroup';
import AdSelect from 'src/components/Form/AdSelect';
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

@Form.create()
class EditableCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            attrs: this.getAttrsFromProps(props),
            editAttrs: []
        };
    }

    getAttrsFromProps(props) {
        const { value } = props;
        let _attrs = ATTR_TABLE_CONFIG[value.source];
        let attrs = _.cloneDeep(_attrs);
        attrs.forEach(attr => {
            attr.value = value.properties[attr.key];

            if (attr.link == 'RS_VALUE') {
                let index = attrs.findIndex(item => item.key == attr.link);
                attrs[index].type =
                    attrs[index].type.replace(/[0-9]/, '') + attr.value;
            }
            if (attr.link == 'CONT_VALUE') {
                let index = attrs.findIndex(item => item.key == attr.link);
                attrs[index].disabled = [0, 1, 2].includes(attr.value);
            }
        });

        return attrs;
    }

    render() {
        const { visible, attrs } = this.state;
        const { readonly } = this.props;
        return (
            <div id="newEdit">
                {attrs.map((item, index) => this.renderItem(item, index, true))}
                <div className="attr">
                    {!readonly && (
                        <Button
                            onClick={this.edit}
                            className="newEdit-edit"
                            title="编辑">
                            <Icon type="edit" />
                        </Button>
                    )}
                    {!readonly && (
                        <Button
                            onClick={this.onDelete}
                            className="newEdit-del"
                            title="删除">
                            <Icon type="delete" />
                        </Button>
                    )}
                </div>
                <Modal
                    visible={visible}
                    title="修改"
                    okText="保存"
                    cancelText="取消"
                    destroyOnClose={true}
                    onCancel={this.onCancel}
                    onOk={this.onCreate}>
                    {this.renderContent()}
                </Modal>
            </div>
        );
    }

    edit = () => {
        this.setState({
            visible: true,
            editAttrs: this.state.attrs
        });
    };

    onCreate = () => {
        const { value, onChange, form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log(values);
            let id = value.key;
            let IDKey = getLayerIDKey(value.spec);
            this.hide();
            onChange({
                ...value,
                properties: {
                    ...value.properties,
                    ...values,
                    [IDKey]: id
                }
            });
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
        Modal.confirm({
            title: '删除后无法撤回，确认删除？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                const { onDelete, value } = this.props;
                onDelete(value);
            }
        });
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };

    renderContent = () => {
        const { editAttrs } = this.state;
        return (
            <Form layout="vertical" className="svg-style">
                {editAttrs.map((item, index) => this.renderItem(item, index))}
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
                    })(<AdInput disabled />)
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(item.value) ? item.value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderAdDateInput = (item, index, readonly) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
                        rules: [
                            { validator: this.checkDate },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value,
                        validateTrigger: 'onBlur'
                    })(<AdDateInput />)
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

    renderInputNumber = (item, index, readonly) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(item.key, {
                        rules: [
                            {
                                required: item.required,
                                message: `${item.name}必填,请输入合法的数字`
                            },
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value
                    })(<AdInputNumber type="number" disabled={item.disabled} />)
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
                            ...this.getValidatorSetting(item.validates)
                        ],
                        initialValue: item.value
                    })(<AdInput disabled={item.disabled} />)
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
                        <AdSelect
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
                                    <Select.Option
                                        key={index}
                                        value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                );
                            })}
                        </AdSelect>
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
                    })(<RadioIconGroup options={options} />)
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(item.value, options)}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderSearchIconGroup = (item, index, readonly) => {
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
                    })(
                        <SearchIconGroup
                            options={options}
                            content={this.getLabelSetting(item.value, options)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.getArrayOption(
                            item.value,
                            this.getOptionsGroup(options)
                        )}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderCheckBoxIconGroup = (item, index, readonly) => {
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
                    })(
                        <CheckBoxIconGroup
                            options={options}
                            max={3}
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

    getCheckBoxArrayOption = (value, arr) => {
        const text =
            arr
                .filter(val => value.includes(val.value))
                .map(val => val.label)
                .join('，') || '--';
        return text;
    };

    getLabelSetting = (value, options) => {
        const opt = this.getOptionsGroup(options);
        let obj = {};
        const pos = opt.findIndex(val => val.value === value);
        obj.value = value;
        obj.label =
            pos != -1 && this.isPresent(opt[pos].label) ? opt[pos].label : '--';
        obj.icon =
            pos != -1 && this.isPresent(opt[pos].icon) ? opt[pos].icon : '--';
        return obj;
    };

    getOptionsGroup = (options = []) => {
        const opt = options.reduce((a, b) => {
            return a.concat(b);
        });
        return opt;
    };

    attrOnChange = key => {
        switch (key) {
            case 'RS_VALUE':
                return this.linkRsValueChangeEvent;
            case 'CONT_VALUE':
                return this.linkContValueChangeEvent;
            default:
                return () => {};
        }
    };

    linkRsValueChangeEvent = value => {
        const { editAttrs } = this.state;
        const { form } = this.props;
        let _attrs = _.cloneDeep(editAttrs);
        let index = _attrs.findIndex(attr => attr.key == 'RS_VALUE');
        _attrs[index].type = _attrs[index].type.replace(/[0-9]/, '') + value;
        form.setFieldsValue({
            RS_VALUE: null
        });
        this.setState({
            editAttrs: _attrs
        });
    };

    linkContValueChangeEvent = value => {
        const { editAttrs } = this.state;
        const { form } = this.props;
        let _attrs = _.cloneDeep(editAttrs);
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
            CONT_VALUE: 0
        });
        this.setState({
            editAttrs: _attrs
        });
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

export default EditableCard;
