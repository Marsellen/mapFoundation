import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'src/config/adMapDataConfig';
import SearchIconGroup from 'src/component/common/searchIconGroup';
import AdDateInput from 'src/component/common/form/adDateInput';
import 'less/ad-traffic-sign-content.less';
import ToolIcon from 'src/component/common/toolIcon';
import Filter from 'src/util/filter';
import { getValidator } from 'src/util/validator';
import { testDataString } from 'src/util/timeUtils';
import { parseArrayString } from 'src/util/utils';
import AttributeStore from 'src/store/home/attributeStore';

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
const SIGN_TYPE_OPTIONS = TYPE_SELECT_OPTION_MAP.AD_TS_CONTENT_SIGN_TYPE;
const CONT_TYPE_OPTIONS = TYPE_SELECT_OPTION_MAP.AD_TS_CONTENT_CONT_TYPE;
const DEFAULT_CONTENT = { SIGN_NO: 1, SIGN_TYPE: 0, CONT_TYPE: 0, CONT_VALUE: 0, TIMEDOM: '' };
const DISABLED_TYPES = new Set([0, 1, 2]);

function isPresent(obj) {
    return (!!obj && String(obj) != '') || obj === 0;
}

function getValidatorSetting(CONT_TYPE) {
    switch (CONT_TYPE) {
        case 3:
            return [{ validator: getValidator('Numeric|range|0|120') }];
        case 4:
            return [{ validator: getValidator('Numeric|range|0|110') }];
        default:
            return [];
    }
}

function checkDate(rule, value, callback) {
    let testResult = testDataString(value);
    if (!testResult) {
        AttributeStore.showTime(false);
        callback(new Error('与值域不符合'));
    } else {
        AttributeStore.showTime(true);
        callback();
    }
}

let radomKey = 0;

export default function AdTrafficSignContent(props) {
    let { form, readonly, item, name } = props;
    let { value, key } = item;

    const [contents, setContents] = useState(parseArrayString(value));

    useEffect(() => {
        form.validateFields();
    }, [contents]);

    const contTypeOnChange = (keyName, index, value) => {
        if (DISABLED_TYPES.has(value)) {
            form.setFieldsValue({ [keyName]: 0 });
        }
        const values = form.getFieldValue(`${name}.${key}`);
        values[index].CONT_TYPE = value;
        setContents(values);
    };

    const signTypeOnChange = (keyName, index, value) => {
        switch (true) {
            case value == 2219:
                form.setFieldsValue({ [keyName]: 3 });
                break;
            case value == 2314:
                form.setFieldsValue({ [keyName]: 4 });
                break;
            case value >= 2207 && value <= 2213:
                form.setFieldsValue({ [keyName]: 1 });
                break;
            default:
                form.setFieldsValue({ [keyName]: 0 });
                break;
        }
        const values = form.getFieldValue(`${name}.${key}`);
        values[index].SIGN_TYPE = value;
        setContents(values);
    };

    return (
        <div>
            {contents.map((content, index) => (
                <div key={index} className="content-box">
                    <Form.Item
                        key={`SIGN_TYPE-${index}-${radomKey}`}
                        label="交通标志牌类型"
                        className="inline-search-icon-group"
                        {...formItemLayout}
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].SIGN_TYPE`, {
                                initialValue: content.SIGN_TYPE
                            })(
                                <SearchIconGroup
                                    options={SIGN_TYPE_OPTIONS}
                                    onChange={signTypeOnChange.bind(
                                        null,
                                        `${name}.${key}[${index}].CONT_TYPE`,
                                        index
                                    )}
                                />
                            )
                        ) : (
                            <span className="ant-form-text">
                                {isPresent(content.SIGN_TYPE)
                                    ? Filter.get('typeFilter|AD_TS_CONTENT_SIGN_TYPE')(
                                        content.SIGN_TYPE
                                    )
                                    : '--'}
                            </span>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={`CONT_TYPE-${index}-${radomKey}`}
                        label="语义类型"
                        {...formItemLayout}
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].CONT_TYPE`, {
                                initialValue: content.CONT_TYPE
                            })(
                                <Select
                                    onChange={contTypeOnChange.bind(
                                        null,
                                        `${name}.${key}[${index}].CONT_VALUE`,
                                        index
                                    )}
                                >
                                    {CONT_TYPE_OPTIONS.map((option, index) => {
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
                                {isPresent(content.CONT_TYPE)
                                    ? Filter.get('typeFilter|AD_TS_CONTENT_CONT_TYPE')(
                                        content.CONT_TYPE
                                    )
                                    : '--'}
                            </span>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={`CONT_VALUE-${index}-${radomKey}`}
                        label="语义内容"
                        {...formItemLayout}
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].CONT_VALUE`, {
                                initialValue: content.CONT_VALUE,
                                rules: [
                                    {
                                        required: true,
                                        message: '交通标志牌语义内容必填,请输入合法的数字'
                                    },
                                    ...getValidatorSetting(content.CONT_TYPE)
                                ]
                            })(<Input disabled={DISABLED_TYPES.has(content.CONT_TYPE)} />)
                        ) : (
                            <span className="ant-form-text">
                                {isPresent(content.CONT_VALUE) ? content.CONT_VALUE : '--'}
                            </span>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={`TIMEDOM-${index}-${radomKey}`}
                        label="限制时间描述"
                        {...formItemLayout}
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].TIMEDOM`, {
                                rules: [{ validator: checkDate }],
                                initialValue: content.TIMEDOM,
                                validateTrigger: 'onBlur'
                            })(<AdDateInput />)
                        ) : (
                            <span className="ant-form-text">{content.TIMEDOM}</span>
                        )}
                    </Form.Item>
                    {contents.length > 1 && (
                        <ToolIcon
                            icon="shanchu"
                            className={`del-icon ${!readonly && 'show'}`}
                            action={() => {
                                const values = form.getFieldValue(`${name}.${key}`);
                                const newValues = values.filter((n, i) => i !== index);
                                form.setFieldsValue({ [`${name}.${key}`]: newValues });
                                radomKey = Math.random();
                                setContents(newValues);
                            }}
                        />
                    )}
                </div>
            ))}
            {!readonly && contents.length < 10 && (
                <Button
                    onClick={() => {
                        const values = form.getFieldValue(`${name}.${key}`) || [];
                        setContents(values.concat(DEFAULT_CONTENT));
                    }}
                >
                    增加标牌子属性
                </Button>
            )}
        </div>
    );
}
