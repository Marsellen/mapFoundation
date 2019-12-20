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
import VisitedHistory from 'src/utils/visiteCount';

const { Header } = Layout;

window.onbeforeunload = e => VisitedHistory.removeVisitedHistory();
VisitedHistory.addVisitedHistory();
VisitedHistory.pollingVisiteHistory();
VisitedHistory.LinkToBlank();

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
