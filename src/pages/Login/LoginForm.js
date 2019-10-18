import React from 'react';
// import { randomNum } from '../../utils/utils';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Checkbox, message, Input } from 'antd';

@withRouter
@inject('appStore')
@inject('TaskStore')
@observer
@Form.create()
class LoginForm extends React.Component {
    state = {
        focusItem: -1 //保存当前聚焦的input
    };

    componentDidMount() {
        let rememberMe = localStorage.getItem('rememberMe') === 'true';
        let autoLogin = localStorage.getItem('autoLogin') === 'true';
        this.setState({
            rememberMe, // 记住用户名
            autoLogin //自动登录
        });
    }

    loginSubmit = e => {
        e.preventDefault();
        this.setState({
            focusItem: -1
        });
        const { appStore, TaskStore } = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.password = btoa(values.password); //base64编码
                appStore
                    .login(values, this.state)
                    .then(() => {
                        localStorage.setItem(
                            'rememberMe',
                            this.state.rememberMe
                        );
                        localStorage.setItem('autoLogin', this.state.autoLogin);
                        let userName = this.state.rememberMe
                            ? values.username
                            : '';
                        localStorage.setItem('userName', userName);
                        const { from } = this.props.location.state || {
                            from: { pathname: '/' }
                        };
                        this.props.history.push(from);
                    })
                    .then(() => {
                        TaskStore.initTask({ type: 1 });
                    })
                    .catch(e => {
                        message.error(e.message, 3);
                    });
            }
        });
    };
    changeAutoLogin = e => {
        let rememberMe =
            !e.target.checked && !this.state.rememberMe ? false : true;
        this.setState({
            autoLogin: e.target.checked,
            rememberMe
        });
    };

    changeRememberMe = e => {
        let autoLogin = e.target.checked ? this.state.autoLogin : false;
        this.setState({
            rememberMe: e.target.checked,
            autoLogin
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { focusItem, autoLogin, rememberMe } = this.state;
        let userName = localStorage.getItem('userName');
        return (
            <div className={this.props.className}>
                <h3 className="title">管理员登录</h3>
                <Form onSubmit={this.loginSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入用户名' }
                            ],
                            initialValue: userName
                        })(
                            <Input
                                onFocus={() => this.setState({ focusItem: 0 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                placeholder="用户名"
                                addonBefore={
                                    <Icon
                                        type="user"
                                        style={
                                            focusItem === 0
                                                ? styles.focus
                                                : styles.normal
                                        }
                                    />
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }]
                        })(
                            <Input
                                onFocus={() => this.setState({ focusItem: 1 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                type="password"
                                maxLength={16}
                                placeholder="密码"
                                addonBefore={
                                    <Icon
                                        type="lock"
                                        style={
                                            focusItem === 1
                                                ? styles.focus
                                                : styles.normal
                                        }
                                    />
                                }
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div id="checkbox-color">
                            <Checkbox
                                checked={rememberMe}
                                onChange={this.changeRememberMe}>
                                记住用户名
                            </Checkbox>
                            <Checkbox
                                checked={autoLogin}
                                onChange={this.changeAutoLogin}>
                                下次自动登录
                            </Checkbox>
                        </div>
                    </Form.Item>
                    <div className="bottom">
                        <input
                            className="loginBtn"
                            type="submit"
                            value="登录"
                            width="100%"
                        />
                    </div>
                </Form>
                <div className="footer">
                    <div>欢迎登录编辑系统</div>
                </div>
            </div>
        );
    }
}

const styles = {
    focus: {
        width: '20px',
        opacity: 1,
        color: '#61bfff',
        fontSize: 18
    },
    normal: {
        color: '#61bfff',
        fontSize: 18
    }
};

export default LoginForm;
