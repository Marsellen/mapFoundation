import React from 'react';
import { notification } from 'antd';
import 'src/asset/less/login.less';
import LoginForm from 'src/component/login/loginForm';
import LoginVisitedHistory from 'src/util/visiteHistory/loginVisiteHistory';
import { getAuthentication } from 'src/util/session';

class Login extends React.Component {
    componentDidMount() {
        const { token } = getAuthentication() || {};
        if (token) {
            LoginVisitedHistory.removeVisitedHistory();
            window.location.href = '/';
        }
    }

    componentWillUnmount() {
        this.particle && this.particle.destory();
        notification.destroy();
    }

    render() {
        return (
            <div id="login-page">
                <div>
                    <div id="backgroundBox" className="background-box" />
                    <div className="container">
                        <LoginForm className={'box showBox'} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
