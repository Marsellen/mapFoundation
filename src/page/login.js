import React from 'react';
import { notification } from 'antd';
import 'src/asset/less/login.less';
import { inject, observer } from 'mobx-react';
import LoginForm from 'src/component/login/loginForm';

@inject('appStore')
@observer
class Login extends React.Component {
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
