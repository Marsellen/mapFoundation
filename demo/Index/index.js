import React from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import Sider from 'src/components/Sider';
import SiderView from './components/SiderView';
import VizCompnent from './components/VizCompnent';
import MultimediaView from './components/MultimediaView';

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
                <Header />
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