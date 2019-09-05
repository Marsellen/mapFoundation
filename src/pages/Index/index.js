import React from 'react';
import { Layout, message } from 'antd';
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
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@observer
class Index extends React.Component {
    state = {};

    componentDidMount() {
        const { taskStore } = this.props;
        taskStore.initTask({ type: 4 }).then(() => {
            this.openMap()
        });
        this.props.menuStore.initMenus();
    }

    openMap = () => {
        const { taskStore } = this.props;
        const { workData } = taskStore;

        const firstTaskValues = taskStore.getFirstTaskValues();
        taskStore.load(firstTaskValues);
        if (workData && workData.length > 0) {
            this.clearWorkSpace();
        } else {
            message.warning('暂无任务', 3);
        }
    }

    // 默认打开
    clearWorkSpace = () => {
        const {
            taskStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        const { workData } = taskStore;
        OperateHistoryStore.destroy();
        if (workData && workData.length > 1) {
            DataLayerStore.activeEditor();
            ToolCtrlStore.updateByEditLayer();
        }
    };

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
