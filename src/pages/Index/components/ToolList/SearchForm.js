import React from 'react';
import { Form, Input, Select, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
const FormItem = Form.Item;

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class SearchForm extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { DataLayerStore, form } = this.props;
        let options = DataLayerStore.layers || [];
        let editLayer = DataLayerStore.getEditLayer();
        let defaultValue = editLayer ? editLayer.layerName : null;

        return (
            <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                <FormItem label="要素所在图层：">
                    {form.getFieldDecorator('currentLayer', {
                        rules: [
                            { required: true, message: '请选择要素所在图层!' }
                        ],
                        initialValue: defaultValue
                    })(
                        <Select className="layer-select">
                            {options.map((option, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={option.value}>
                                        {this.getLabel(option)}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="要素用户编号：">
                    {form.getFieldDecorator('No', {
                        rules: [
                            { required: true, message: '请选择要素用户编号!' },
                             //自定义的检验函数
                            {
                                validator: (rule, value, callback) =>
                                    this.handleSelfCheck(
                                        rule,
                                        value,
                                        callback
                                    )
                            }
                        ]
                    })(<Input />)}
                </FormItem>
            </Form>
        );
    }

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value]
            ? DATA_LAYER_MAP[item.value].label
            : item.value;
    };

    handleSelfCheck = (rule, value, callback) => {
        const reg = /^\d+(\.\d*)?$|^\.\d+$/;
        if (!reg.test(value)) {
            message.warning('请输入正整数！', 3);
            return;
        }
        callback()
    }
}

const FormInfo = Form.create()(SearchForm);

export default FormInfo;
