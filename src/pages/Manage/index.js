import React from 'react';
import { Form, Input, Button, message } from 'antd';
import 'src/assets/less/manage.less';
import ManageCtrl from 'src/utils/ManageCtrl';
import appStore from 'src/store/appStore';
import { QC_MARKER_CONFIG } from 'src/config/QCMarkerConfig';
import logo from 'src/assets/img/logo.png';
import Avatar from 'src/pages/Index/components/Avatar';

const { TextArea } = Input;

//超级管理员 admin、生产管理员 producer_manager、质检管理员 quality_manager
const ROLE_WHITE_LIST = ['admin', 'producer_manager', 'quality_manager'];

@Form.create()
class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { config: null };
        this.getConfig();
    }

    getConfig = async () => {
        const config = await ManageCtrl.queryConfig();
        this.setState({ config });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            if (ROLE_WHITE_LIST.includes(appStore.roleCode)) {
                ManageCtrl.saveConfig(values.data);
            } else {
                message.warning('超级管理员、生产管理员、质检管理员才能修改配置');
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = this.state.config || QC_MARKER_CONFIG;
        const formatConfig = JSON.stringify(config, null, 4);
        return (
            <div className="manage-wrap">
                <header className="manage-header">
                    <div className="logo-wrap">
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                    <Avatar />
                </header>
                <div className="manage-form-wrap">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('data', {
                                initialValue: formatConfig,
                                rules: [{ required: true, message: '请输入配置' }]
                            })(<TextArea />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                更新
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Manage;
