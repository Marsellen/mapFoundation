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
        const isLogin = this.props.appStore;
        if (isLogin) {
            this.props.history.go(1); //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
            // this.props.appStore.toggleLogin(false) //也可以设置退出登录
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
