import React from 'react';
import { notification } from 'antd';
import 'src/asset/less/login.less';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LoginForm from 'src/component/login/loginForm';
import { loginVisitedHistory } from 'src/tool/visiteHistory';

//处理登陆页面访问历史
window.onbeforeunload = e => loginVisitedHistory.removeVisitedHistory();
loginVisitedHistory.addVisitedHistory();
loginVisitedHistory.pollingVisiteHistory();
loginVisitedHistory.LinkToBlank();

@withRouter
@inject('appStore')
@observer
class Login extends React.Component {
    state = {};

    componentDidMount() {
        const { loginUser } = this.props.appStore;
        if (loginUser) {
            loginVisitedHistory.removeVisitedHistory();
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
