import React from 'react';
import { Form, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';
import AdInputNumber from 'src/component/common/form/adInputNumber';
const FormItem = Form.Item;

@Form.create()
@inject('VectorsStore')
@observer
class IDSearchForm extends React.Component {
    render() {
        const { VectorsStore, form } = this.props;
        let options = VectorsStore.vectors.vector || [];

        return (
            <Form labelCol={{ span: 10 }} wrapperCol={{ span: 12 }}>
                <FormItem label="要素所在图层：">
                    {form.getFieldDecorator('layerName', {
                        rules: [{ required: true, message: '请选择要素所在图层!' }]
                        //initialValue: defaultValue
                    })(
                        <Select className="layer-select">
                            {options.map((option, index) => {
                                return (
                                    <Select.Option key={index} value={option.value}>
                                        {this.getLabel(option)}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="要素用户编号：">
                    {form.getFieldDecorator('id', {
                        rules: [{ required: true, message: '请选择要素用户编号!' }]
                    })(<AdInputNumber type="number" />)}
                </FormItem>
            </Form>
        );
    }

    getLabel = item => {
        if (!item.value) {
            return item.label;
        }
        return DATA_LAYER_MAP[item.value] ? DATA_LAYER_MAP[item.value].label : item.value;
    };
}

export default IDSearchForm;