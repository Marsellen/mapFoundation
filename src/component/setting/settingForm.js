import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import appStore from 'src/store/common/appStore';
import { ROLE_WHITE_MAP } from 'src/config/settingConfig';

const { TextArea } = Input;

@Form.create()
@inject('SettingStore')
@observer
class SettingForm extends React.Component {
    getDisabledStatus = () => {
        const { SettingStore } = this.props;
        const roleWhiteList = ROLE_WHITE_MAP[SettingStore.activeKey];
        return !roleWhiteList.includes(appStore.roleCode);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            const { SettingStore } = this.props;
            SettingStore.saveConfig(values.data);
        });
    };

    handleLocalSubmit = e => {
        e.preventDefault();
        const { SettingStore } = this.props;
        SettingStore.saveLocalConfig();
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={this.getDisabledStatus()}
                        >
                            更新
                        </Button>
                        <Button
                            className="submit-local-all-update"
                            type="primary"
                            title="配置全量更新"
                            onClick={this.handleLocalSubmit}
                            disabled={this.getDisabledStatus()}
                        >
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default SettingForm;
