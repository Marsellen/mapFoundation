import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizComponent from './components/VizComponent';
import HeaderBar from './components/HeaderBar';
import 'less/home.less';
import logo from 'src/assets/img/logo.png';
import { shortcut } from 'src/utils/shortcuts';
import { editVisiteHistory } from 'src/utils/visiteHistory';

const { Header } = Layout;

//处理编辑页面访问历史
window.onbeforeunload = e => editVisiteHistory.removeVisitedHistory();
editVisiteHistory.addVisitedHistory();
editVisiteHistory.pollingVisiteHistory();
editVisiteHistory.LinkToBlank();

@inject('MenuStore')
@observer
class Index extends React.Component {
    state = {};

    componentDidMount() {
        this.props.MenuStore.initMenus();
        shortcut.init();
    }

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
                    <div className="flex-1 viz-content" id="viz-content">
                        <VizComponent />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Index;
