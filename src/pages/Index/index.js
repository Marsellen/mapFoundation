import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizCompnent from './components/VizCompnent';
import MultimediaView from './components/MultimediaView';
import HeaderBar from './components/HeaderBar';
import 'less/home.less';

const { Header } = Layout;

@inject('menuStore')
@observer
class Index extends React.Component {
    state = {};

    componentDidMount() {
        this.props.menuStore.initMenus();
    }

    render() {
        const { menus } = this.props.menuStore;
        return (
            <Layout id="home">
                <Header className="header">
                    <HeaderBar />
                </Header>
                <div className="flex flex-row">
                    <Sider menus={menus}>{SiderView}</Sider>
                    <div className="flex-1 viz-content">
                        <VizCompnent />
                    </div>
                    <MultimediaView />
                </div>
            </Layout>
        );
    }
}

export default Index;
