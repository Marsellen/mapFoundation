import React from 'react';
import { Form, Modal, Select, Button, Input, message, Spin } from 'antd';
import { observer, inject } from 'mobx-react';
import RadioIconGroup from 'src/component/common/radioIconGroup';
import CheckBoxIconGroup from 'src/component/common/checkBoxIconGroup';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/adMapDataConfig';
import AdInputNumber from 'src/component/common/form/adInputNumber';
import AdDateInput from 'src/component/common/form/adDateInput';
import { getValidator } from 'src/util/validator';
import AdEmitter from 'src/util/event';
import { logDecorator } from 'src/util/decorator';
import DataLayerStore from 'src/store/home/dataLayerStore';
import BatchAssignStore from 'src/store/home/batchAssignStore';
import SearchIconGroup from 'src/component/common/searchIconGroup';
import { testDataString } from 'src/util/timeUtils';
import BuriedPoint from 'src/util/buriedPoint';
import AttrsForm from './attributesForm/attrsForm';
import { updateFeatures } from 'src/util/relCtrl/operateCtrl';
import { ATTR_SPEC_CONFIG } from 'src/config/attrsConfig';
import batchAssignStore from 'src/store/home/batchAssignStore';
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

    constructor(props) {

        super(props);
        this.submit = this.submit.bind(this);
    }

    getAttrType = () => {

        const { BatchAssignStore } = this.props;
        const { layerName } = BatchAssignStore;
        const attrConfig = ATTR_SPEC_CONFIG.filter(item => item.relSpec === layerName);
        return attrConfig ?? [];
    };

    render() {

        const { BatchAssignStore, form } = this.props;
        const { visible, loading } = BatchAssignStore;
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
                <Spin spinning={loading}>
                    <Form colon={false} hideRequiredMark={true}>
                        {this._renderForm(disabledList)}
                        {this._renderAttrForm()}
                    </Form>
                </Spin>
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

    _renderAttrForm = () => {
        const {
            form,
            BatchAssignStore: { layerName, attrs, spliceAttrs, updateKey }
        } = this.props;
        let { BatchAssignStore: { attrMap } } = this.props;




        return layerName === 'AD_Lane' ? (
            <>
                {this.getAttrType().map((item, index) => {
                    return (
                        <AttrsForm
                            key={index}
                            updateKey={updateKey}
                            form={form}
                            attrType={item.source}
                            layerName={layerName}
                            attrs={attrs}
                            attrMap={attrMap}
                            readonly={false}
                            onOk={this.handleSave}
                            onBatchAssignDelete={this.onBatchAssignDelete}
                            onDelete={spliceAttrs}
                            batchAssign={false}
                        />
                    );
                })}
            </>
        ) : null;
    };

    handleSave = (key, values, properties, onCancel, batchAssign = false, title) => {

        const { BatchAssignStore } = this.props;

        if (!batchAssign) {
            BatchAssignStore.newAttr(key, values, properties);
            onCancel();
        }
        else {
            BatchAssignStore.editAttr(values, title);
            onCancel();

        }

    };
    // 限速批量删除
    onBatchAssignDelete = (value) => {
        const { BatchAssignStore } = this.props;
        batchAssignStore.onBatchAssignDelete(value);
    }

    _renderFooter = () => {
        return (
            <Button type="primary" onClick={this.save} size="small" ghost>
                保存
            </Button>
        );
    };

    getDisabledList = () => {
        const { attributes } = BatchAssignStore;
        if (!attributes) return;
        const fieldsValue = this.props.form.getFieldsValue().attributes;
        const disabledList = attributes.reduce((total, item) => {
            let { key, linkDisabled, readonly } = item;
            readonly = false
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

    @logDecorator({ operate: '批量赋值', skipRenderMode: true, toolType: 'batch_assign' })
    async submit(err, values) {

        if (err) {
            return;
        }
        try {

            const attrtype = this.getAttrType();
            const log = await BatchAssignStore.submit(values, attrtype);
            if (log) {
                await updateFeatures(log);
            }

            AdEmitter.emit('fetchViewAttributeData');
            DataLayerStore.clearPick();
            return log;
        } catch (e) {
            message.error(e.message);
            throw e;
        }
    }

    handleCancel = e => {

        const channel = e.keyCode ? 'esc' : e.detail ? 'close' : null;
        const { BatchAssignStore, AttributeStore } = this.props;
        BatchAssignStore.hide();
        AttributeStore.showTime(true);
        BuriedPoint.toolBuriedPointEnd('batch_assign', channel);
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
        text = pos != -1 && this.isPresent(arr[pos].label) ? arr[pos].label : '--11111';
        return text;
    };

    getCheckBoxArrayOption = (value, arr) => {
        const text =
            arr
                .filter(val => value.includes(val.value))
                .map(val => val.label)
                .join('+') || '--1111';
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
        // 对TYPE_PLUS使用“｜”分割字符串 且不限制最小选择
        const spaceMark = item?.key == 'TYPE_PLUS' ? '|' : '';
        const minLimit = item?.key == 'TYPE_PLUS' ? false : true;
        return (
            <Form.Item key={index} label={this.getLabel(readonly, item)}>
                {form.getFieldDecorator(name + '.' + item.key, {
                    initialValue: !readonly ? item.value : undefined
                })(
                    <CheckBoxIconGroup
                        options={options}
                        minLimit={minLimit}
                        spaceMark={spaceMark}
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
