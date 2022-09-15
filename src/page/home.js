import React from 'react';
import { Layout, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/component/common/sider';
import SiderView from 'src/component/home/siderView';
import VizComponent from 'src/component/home/vizComponent';
import VizComponentXGIS from 'src/component/home/vizComponentXGIS';
import HeaderBar from 'src/component/home/headerBar';
import 'less/home.less';
import logo from 'src/asset/img/logo.svg';
import ShortcutKey from 'src/util/shortcutKey';
import SettingStore from 'src/store/setting/settingStore';
import { MENUS } from 'src/config/menuConfig';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';

const { Header } = Layout;
//加载质检标注配置
SettingStore.queryConfig();
//记录登陆状态
window.isLogin = true;

@inject('LoadingStore')
@observer
class Home extends React.Component {
    componentWillMount() {
        HomeVisiteHistory.enterPage();
    }

    componentDidMount() {
        ShortcutKey.init();
    }

    render() {
        const { LoadingStore } = this.props;
        window.isXGIS = true;


        return (window.isXGIS ?
            <Spin tip="loading..." spinning={LoadingStore.globalLoading}>
                <Layout id="home">
                    <Header className="header">
                        <div className="logo-content">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                        <HeaderBar />
                    </Header>
                    <Sider menus={MENUS}>{SiderView}</Sider>
                    <div className="flex-1 viz-content" id="viz-content">
                        <VizComponentXGIS />
                    </div>
                </Layout>
            </Spin> : <Spin tip="loading..." spinning={LoadingStore.globalLoading}>
                <Layout id="home">
                    <Header className="header">
                        <div className="logo-content">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                        <HeaderBar />
                    </Header>
                    <Sider menus={MENUS}>{SiderView}</Sider>
                    <div className="flex-1 viz-content" id="viz-content">
                        <VizComponent />
                    </div>
                </Layout>
            </Spin>
        );
    }
}

export default Home;
