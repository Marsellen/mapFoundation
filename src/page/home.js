import React from 'react';
import { Layout, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Sider from 'src/component/common/sider';
import SiderView from 'src/component/home/siderView';
import VizComponent from 'src/component/home/vizComponent';
import VizComponentXGIS from 'src/component/home/vizComponentXGIS';
import HeaderBar from 'src/component/home/headerBar';
import 'less/home.less';
import logo from 'src/asset/img/logo.svg';
import ultronLogo from 'src/asset/img/ultron-logo.svg';
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
        // 进入首页后清楚历史
        HomeVisiteHistory.enterPage();
    }

    componentDidMount() {
        ShortcutKey.init();
    }

    render() {
        const { LoadingStore } = this.props;

        return (
            <Spin tip="loading..." spinning={LoadingStore.globalLoading}>
                <Layout id="home">
                    <Header className="header">
                        <Link to={'/board'}>
                            <div className="logo-content">
                                <img className="logo" src={logo} alt="logo" />
                                <img className="ultron-logo" src={ultronLogo} alt="ultronLogo" />
                            </div>
                        </Link>
                        <HeaderBar />
                    </Header>
                    {/* <Sider menus={MENUS}>{SiderView}</Sider> */}
                    <div className="flex-1 viz-content" id="viz-content">
                        <VizComponentXGIS />
                    </div>
                </Layout>
            </Spin>
        );
    }
}

export default Home;
