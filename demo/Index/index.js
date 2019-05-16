import React from 'react'
import { Layout } from 'antd'
import { inject, observer } from 'mobx-react'
import Sider from 'src/components/Sider'
import SiderView from './components/SiderView'

const { Header } = Layout

@inject('menuStore')
@observer
class Index extends React.Component {
    state = {
        
    }

    componentWillMount() {
        this.props.menuStore.initMenus()
    }

    render() {
        const { menus } = this.props.menuStore
        return (
            <div id='page'>
                <Layout>
                    <Header style={{ background: '#fff', padding: '0 16px' }}>
                        
                    </Header>
                    <div style={styles.content}>
                        <Sider menus={menus}>
                            {SiderView}
                        </Sider>
                        <div style={styles.rightContent}>
                            hello world demo
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}

const styles = {
    content: {
        display: 'flex',
        flexDirection: 'row'
    },
    rightContent: {
        flexGrow: 1
    }
}

export default Index