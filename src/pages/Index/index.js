import React from 'react';
import { Layout, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizComponent from './components/VizComponent';
import HeaderBar from './components/HeaderBar';
import 'less/home.less';
import logo from 'src/assets/img/logo.png';
import ShortcutKey from 'src/utils/ShortcutKey';
import { editVisiteHistory } from 'src/utils/visiteHistory';
import { deleteDatabase } from 'src/utils/IndexedDB';
import sysProperties from 'src/models/sysProperties';
import ManageCtrl from 'src/utils/ManageCtrl';

const { Header } = Layout;

//处理编辑页面访问历史
window.onbeforeunload = e => editVisiteHistory.removeVisitedHistory();
editVisiteHistory.addVisitedHistory();
editVisiteHistory.pollingVisiteHistory();
let jump = editVisiteHistory.LinkToBlank();
if (!jump) {
    deleteDatabase('attributes');
    deleteDatabase('editLogs');
    deleteDatabase('adEditor');
    deleteDatabase('relationships');
}
//加载nacos配置
sysProperties.loadConfigs();
//加载质检标注配置
ManageCtrl.queryConfig();
//记录登陆状态
window.isLogin = true;
@inject('LoadingStore')
@inject('MenuStore')
@observer
class Index extends React.Component {
    componentDidMount() {
        this.props.MenuStore.initMenus();
        ShortcutKey.init();
    }

    render() {
        const {
            MenuStore: { menus },
            LoadingStore: { globalLoading }
        } = this.props;
        return (
            <Spin tip="loading..." spinning={globalLoading}>
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
            </Spin>
        );
    }
}

export default Index;
