import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizCompnent from './components/VizCompnent';
import HeaderBar from './components/HeaderBar';
import 'less/home.less';
import logo from 'src/assets/img/logo.png';

const { Header } = Layout;

@inject('menuStore')
@inject('taskStore')
@observer
class Index extends React.Component {
    state = {};

    componentDidMount() {
        const { taskStore } = this.props;
        taskStore.initTask({ type: 4 });
        this.props.menuStore.initMenus();
    }

    render() {
        const { menus } = this.props.menuStore;
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
                    <div className="flex-1 viz-content">
                        <VizCompnent />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Index;
