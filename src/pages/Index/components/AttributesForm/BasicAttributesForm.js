import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import RadioIconGroup from 'src/components/RadioIconGroup';
import CheckBoxIconGroup from 'src/components/CheckBoxIconGroup';
import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import ChooseErrorLayer from 'src/components/ChooseErrorLayer';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { getValidator } from 'src/utils/form/validator';
import Filter from 'src/utils/table/filter';

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
@inject('appStore')
@observer
class BasicAttributesForm extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setErrorLayerCallback(this.errorCallback);
    }
    errorCallback = result => {
        let layerId,
            layerName = '';
        const { form } = this.props;
        if (result.length > 0) {
            layerId =
                result[0].data.properties[
                    DATA_LAYER_MAP[result[0].layerName].id
                ];
            layerName = result[0].layerName;
        }
        form.setFieldsValue({
            'attributes.FILE_NAME': layerName,
            'attributes.FEAT_ID': layerId
        });
    };
    render() {
        const { AttributeStore } = this.props;
        const { attributes } = AttributeStore;
        return (
            <div>
                {attributes.map((item, index) =>
                    this.renderItem(item, index, 'attributes')
                )}
            </div>
        );
    }

    renderItem = (item, index, name) => {
        return this['render' + item.domType](item, index, name);
    };

    renderText = (item, index, name) => {
        const { form, AttributeStore } = this.props;
        const { readonly } = AttributeStore;
        let value = item.filterBy
            ? Filter.get(item.filterBy)(item.value)
            : item.value;
        return (
            <Form.Item key={index} label={item.name} {...formItemLayout}>
                {!readonly ? (
                    form.getFieldDecorator(name + '.' + item.key, {
                        initialValue: value
                    })(
                        <Input
                            disabled
                            onChange={val => this.handleChange(val, item, name)}
                        />
                    )
                ) : (
                    <span className="ant-form-text">
                        {this.isPresent(value) ? value : '--'}
                    </span>
                )}
            </Form.Item>
        );
    };

    renderInputNumber = (item, index, name) => {
        const {
            form,
            AttributeStore,
            appStore: { loginUser }
        } = this.props;
        const { readonly, type } = AttributeStore;
        const producerDisabled =
            loginUser.roleCode === 'producer' && type === 'AD_Map_QC'; //作业员员标记图层禁用项
        const disabledKey = item.key === 'FEAT_ID'; //作业员标记图层需要禁用项
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
                            disabled={producerDisabled && disabledKey}
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
        const { form, AttributeStore } = this.props;
        const { readonly, type } = AttributeStore;
        const disabledKey =
            item.key === 'QC_PERSON' || item.key === 'FIX_PERSON';

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
                            disabled={
                                readonly ||
                                (type === 'AD_Map_QC' && disabledKey)
                            }
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
        const {
            form,
            AttributeStore,
            appStore: { loginUser }
        } = this.props;
        const { readonly, type } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        const producerDisabled =
            loginUser.roleCode === 'producer' && type === 'AD_Map_QC'; //作业员员标记图层禁用项
        const disabledKey =
            item.key === 'ERROR_TYPE' || item.key === 'QC_STATUS'; //作业员标记图层需要禁用项
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
                            disabled={
                                readonly || (producerDisabled && disabledKey)
                            }
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={val =>
                                this.handleChange(val, item, name)
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

    renderChooseErrorLayer = (item, index, name) => {
        const {
            form,
            AttributeStore,
            appStore: { loginUser }
        } = this.props;
        const { readonly, type } = AttributeStore;
        const options = TYPE_SELECT_OPTION_MAP[item.type] || [];
        const producerDisabled =
            loginUser.roleCode === 'producer' && type === 'AD_Map_QC'; //作业员员标记图层禁用项
        return (
            <Form.Item
                key={index}
                label={item.name}
                {...formItemLayout}
                shouldupdate="true">
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
                        <ChooseErrorLayer
                            options={options}
                            disabled={readonly || producerDisabled}
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

    handleChange = (val, filed, name) => {
        const { link } = filed;
        if (!link) return;
        const linkData = link[val] || link.default || null;
        linkData && this.props.form.setFieldsValue({ [name]: linkData });
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
