import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

@Form.create()
@inject('SettingStore')
@observer
class SettingForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const { SettingStore } = this.props;
            SettingStore.saveConfig(values.data);
        });
    };

    render() {
        const {
            SettingStore,
            form: { getFieldDecorator }
        } = this.props;
        const config = SettingStore.getConfig(SettingStore.activeKey);
        const formatConfig = JSON.stringify(config, null, 4);
        return (
            <div className="form-wrap">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('data', {
                            initialValue: formatConfig,
                            rules: [{ required: true, message: '请输入配置' }]
                        })(<TextArea />)}
                    </Form.Item>
                    <Form.Item className="submit-wrap">
                        <Button type="primary" htmlType="submit">
                            更新
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SettingForm;
