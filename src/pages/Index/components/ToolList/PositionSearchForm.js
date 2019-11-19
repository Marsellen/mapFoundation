import React from 'react';
import { Form } from 'antd';
import AdInput from 'src/components/Form/AdInput';

const FormItem = Form.Item;

@Form.create()
class PositionSearchForm extends React.Component {
    render() {
        const { form } = this.props;
        return (
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <FormItem label="x坐标：">
                    {form.getFieldDecorator('x', {
                        rules: [{ required: true, message: 'x坐标必填!' }]
                    })(<AdInput type="number" className="position-input" />)}
                    <span className="suffix-form-text">m</span>
                </FormItem>
                <FormItem label="y坐标：">
                    {form.getFieldDecorator('y', {
                        rules: [{ required: true, message: 'y坐标必填!' }]
                    })(<AdInput type="number" className="position-input" />)}
                    <span className="suffix-form-text">m</span>
                </FormItem>
                <FormItem label="z坐标：">
                    {form.getFieldDecorator(
                        'z',
                        {}
                    )(<AdInput type="number" className="position-input" />)}
                    <span className="suffix-form-text">m</span>
                </FormItem>
            </Form>
        );
    }
}

export default PositionSearchForm;
