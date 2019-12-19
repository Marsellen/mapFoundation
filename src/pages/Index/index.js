import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizCompnent from './components/VizCompnent';
import HeaderBar from './components/HeaderBar';
import 'less/home.less';
import logo from 'src/assets/img/logo.png';
import VersionInfo from './components/VersionInfo';
import { shortcut } from 'src/utils/shortcuts';
import HelpList from './components/HelpList';

const { Header } = Layout;

@inject('MenuStore')
@observer
class Index extends React.Component {
    state = {};

    componentWillMount() {
        this.handleBeforeUnload();
    }

    componentDidMount() {
        this.props.MenuStore.initMenus();
        shortcut.init();

        const nextVisitedCountNum = this.addVisitedCount();
        nextVisitedCountNum > 1 && this.linkToBlank();
    }
    //增加访问次数
    addVisitedCount = () => {
        const visiteCount = window.localStorage.getItem('visiteCount');
        const visiteCountNum = visiteCount ? Number(visiteCount) : 0;
        const nextVisitedCountNum = visiteCountNum + 1;
        window.localStorage.setItem('visiteCount', nextVisitedCountNum);
        return nextVisitedCountNum;
    };
    //减少访问次数
    removeVisitedCount = () => {
        const visiteCount = window.localStorage.getItem('visiteCount');
        const visiteCountNum = visiteCount ? Number(visiteCount) : 0;
        if (visiteCountNum === 0) return;
        window.localStorage.setItem('visiteCount', visiteCountNum - 1);
    };
    //监听浏览器即将离开当前页面事件
    handleBeforeUnload = () => {
        window.onbeforeunload = e => {
            this.removeVisitedCount();
        };
    };
    //跳转到空白页
    linkToBlank = () => {
        window.location.href = '/blank';
    };

    render() {
        const { menus } = this.props.MenuStore;
        return (
            <Layout id="home">
                <Header className="header">
                    <div className="logo-content">
                        <img className="logo" src={logo} alt="logo" />
                    </div>
                    <HeaderBar />
                </Header>
                <div className="flex flex-row">
                    <Sider menus={menus}>{SiderView}</Sider>
                    <HelpList />
                    <VersionInfo />
                    <div className="flex-1 viz-content" id="viz-content">
                        <VizCompnent />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Index;
