import React from 'react'
import { notification } from 'antd'
import './style.css'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import LoginForm from './LoginForm'

@withRouter @inject('appStore') @observer
class Login extends React.Component {
    state = {
        
    }

    componentDidMount() {
        const isLogin = this.props.appStore
        if (isLogin) {
            this.props.history.go(1)     //当浏览器用后退按钮回到登录页时，判断登录页是否登录，是登录就重定向上个页面
            // this.props.appStore.toggleLogin(false) //也可以设置退出登录
        }
        this.initPage()
    }

    componentWillUnmount() {
        this.particle && this.particle.destory()
        notification.destroy()
    }
    //载入页面时的一些处理
    initPage = () => {
        this.props.appStore.initUsers()
        notification.open({
            message: <ul><li>初始账号：admin</li><li>初始密码：admin</li></ul>,
            duration: 0,
            className: 'login-notification'
        })
    }

    render() {
        return (
            <div id='login-page'>
                <div>
                    <div id='backgroundBox' style={styles.backgroundBox} />
                    <div className='container'>
                        <LoginForm className={'box showBox'} />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
        transition: 'all .5s'
    },
    focus: {
        // transform: 'scale(0.7)',
        width: '20px',
        opacity: 1
    },
    loadingBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    loadingTitle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -45,
        marginTop: -18,
        color: '#000',
        fontWeight: 500,
        fontSize: 24
    },
}

export default Login
