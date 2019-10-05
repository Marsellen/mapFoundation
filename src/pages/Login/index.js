import React from 'react';
import { notification } from 'antd';
import './style.css';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LoginForm from './LoginForm';

@withRouter
@inject('appStore')
@observer
class Login extends React.Component {
    state = {};

    componentDidMount() {
        const loginUser = this.props.appStore;
        if (loginUser) {
            this.props.history.push({ pathname: '/' }); //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向主页面
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
