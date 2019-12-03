import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Modal, Select } from 'antd';
import { ATTR_TABLE_CONFIG } from 'src/config/AttrsConfig';
import {
    TYPE_SELECT_OPTION_MAP,
    DEFAULT_PROPERTIES_MAP
} from 'src/config/ADMapDataConfig';
import RadioIconGroup from 'src/components/RadioIconGroup';
import SearchIconGroup from 'src/components/SearchIconGroup';
import _ from 'lodash';
import AdInput from 'src/components/Form/AdInput';
import AdDateInput from 'src/components/Form/AdDateInput';
import { getValidator } from 'src/utils/form/validator';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import AdSelect from 'src/components/Form/AdSelect';

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
        value: '',
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
                cancelText="取消">
                <Form
                    colon={false}
                    hideRequiredMark={true}
                    layout="vertical"
                    className="svg-style">
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
        const { AttributeStore, form } = this.props;
        const { key, properties } = this.state;
        this.setState({
            confirmLoading: true
        });
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            //console.log(values);
            AttributeStore.newAttr(key, values, properties).then(() => {
                this.onCancel();
            });
        });
    };

    onCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false
        });
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
                })(<AdInput disabled placeholder={item.placeholder} />)}
            </Form.Item>
        );
    };

    renderAdDateInput = (item, index) => {
        const { form } = this.props;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {form.getFieldDecorator(item.key, {
                    rules: [
                        {
                            required: item.required,
                            message: `${item.name}必填`
                        },
                        { validator: this.checkPrice },
                        ...this.getValidatorSetting(item.validates)
                    ],
                    initialValue: this.state.value || item.value
                })(
                    <AdDateInput option={item.value} onSubmit={this.onSubmit} />
                )}
            </Form.Item>
        );
    };

    onSubmit = (timeArr, dateFormat) => {
        let date = '',
            monthAndWeek;

        if (Object.keys(dateFormat).length !== 0) {
            const start =
                dateFormat.switchDate === 'week'
                    ? dateFormat.startDate.split('-')[0]
                    : dateFormat.startDate;
            const end =
                dateFormat.switchDate === 'week'
                    ? dateFormat.endDate.split('-')[0]
                    : dateFormat.endDate;

            const format = dateFormat.switchDate === 'week' ? 'WD' : 'D';
            monthAndWeek = `[(${format}${start}){D${Number(end) -
                Number(start)}}]`;
        } else {
            monthAndWeek = '';
        }
        let timeAndMin = '';
        timeArr.map((item, index) => {
            if (index !== timeArr.length - 1) {
                timeAndMin += `[(h${item.startHour}m${item.startMin}){h${item.endHour}m${item.endMin}}]&`;
            } else {
                timeAndMin += `[(h${item.startHour}m${item.startMin}){h${item.endHour}m${item.endMin}}]`;
            }
        });
        date = monthAndWeek + timeAndMin;

        this.setState({
            value: date
        });
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
                })(<AdInput />)}
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
                                <Select.Option key={index} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            );
                        })}
                    </AdSelect>
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
