import React, { useState } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { TYPE_SELECT_OPTION_MAP } from 'config/ADMapDataConfig';
import SearchIconGroup from 'src/components/SearchIconGroup';
import 'less/components/ad-traffic-sign-content.less';
import ToolIcon from 'src/components/ToolIcon';

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
const DEFAULT_CONTENT = { SIGN_TYPE: 0, CONT_TYPE: 0, CONT_VALUE: 0 };

function isPresent(obj) {
    return (!!obj && String(obj) != '') || obj === 0;
}

export default function AdTrafficSignContent(props) {
    let { form, readonly, item, name } = props;
    let { value, name: label, key } = item;

    if (!Array.isArray(value)) {
        value = [];
    }
    const [contents, setContents] = useState(value);

    let radomKey = Math.random();
    return (
        <div>
            {contents.map((content, index) => (
                <div key={index} className="content-box">
                    <Form.Item
                        key={`SIGN_TYPE-${index}-${radomKey}`}
                        {...formItemLayout}
                        label="交通标志牌类型"
                        className="sign-content"
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].SIGN_TYPE`, {
                                initialValue: content.SIGN_TYPE
                            })(<SearchIconGroup options={SIGN_TYPE_OPTIONS} />)
                        ) : (
                            <span className="ant-form-text">
                                {isPresent(content.CONT_TYPE) ? content.CONT_TYPE : '--'}
                            </span>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={`CONT_TYPE-${index}-${radomKey}`}
                        {...formItemLayout}
                        label="交通标志牌语义类型"
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].CONT_TYPE`, {
                                initialValue: content.CONT_TYPE
                            })(
                                <Select>
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
                                {isPresent(content.CONT_TYPE) ? content.CONT_TYPE : '--'}
                            </span>
                        )}
                    </Form.Item>
                    <Form.Item
                        key={`CONT_VALUE-${index}-${radomKey}`}
                        {...formItemLayout}
                        label="交通标志牌语义内容"
                    >
                        {!readonly ? (
                            form.getFieldDecorator(`${name}.${key}[${index}].CONT_VALUE`, {
                                initialValue: content.CONT_VALUE
                            })(<Input />)
                        ) : (
                            <span className="ant-form-text">
                                {isPresent(content.CONT_VALUE) ? content.CONT_VALUE : '--'}
                            </span>
                        )}
                    </Form.Item>
                    {contents.length > 1 && (
                        <ToolIcon
                            icon="shanchu"
                            className={`del-icon ${!readonly && 'show'}`}
                            action={() => {
                                const values = form.getFieldValue(`${name}.${key}`);
                                const newValues = values.filter((n, i) => i !== index);
                                form.setFieldsValue({
                                    [`${name}.${key}`]: newValues
                                });
                                setContents(newValues);
                            }}
                        />
                    )}
                </div>
            ))}
            {!readonly && (
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
