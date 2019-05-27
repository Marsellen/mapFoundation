import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizCompnent from './components/VizCompnent';
import MultimediaView from './components/MultimediaView';
import HeaderBar from './components/HeaderBar';

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
            <Layout>
                <Header style={styles.header}>
                    <HeaderBar />
                </Header>
                <div style={styles.content}>
                    <Sider menus={menus}>{SiderView}</Sider>
                    <div style={styles.vizContent}>
                        <VizCompnent />
                    </div>
                    <MultimediaView />
                </div>
            </Layout>
        );
    }
}

const styles = {
    header: {
        height: 40,
        lineHeight: '40px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '0 20px 0 50px'
    },
    content: {
        display: 'flex',
        flexDirection: 'row'
    },
    vizContent: {
        flexGrow: 1,
        position: 'relative'
    }
};

export default Index;
