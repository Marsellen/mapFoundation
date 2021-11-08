import React from 'react';
import { Layout, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/component/common/sider';
import SiderView from 'src/component/home/siderView';
import VizComponent from 'src/component/home/vizComponent';
import HeaderBar from 'src/component/home/headerBar';
import 'less/home.less';
import logo from 'src/asset/img/logo.svg';
import ShortcutKey from 'src/util/shortcutKey';
import SettingStore from 'src/store/setting/settingStore';
import { MENUS } from 'src/config/menuConfig';

const { Header } = Layout;
//加载质检标注配置
SettingStore.queryConfig();
//记录登陆状态
window.isLogin = true;

@inject('LoadingStore')
@observer
class Home extends React.Component {
    componentDidMount() {
        ShortcutKey.init();
    }

    render() {
        const { LoadingStore } = this.props;
        return (
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
                        <VizComponent />
                    </div>
                </Layout>
            </Spin>
        );
    };
};

export default Home;
