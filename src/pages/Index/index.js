import React from 'react'
import { Layout } from 'antd'

const { Sider, Header, Content } = Layout


class Index extends React.Component {
    state = {
        
    }

    render() {
        // 设置Sider的minHeight可以使左右自适应对齐
        return (
            <div id='page'>
                <Layout>
                    <Header style={{ background: '#fff', padding: '0 16px' }}>
                        
                    </Header>
                    <Layout>
                        <Sider collapsible
                            trigger={null}
                            collapsed={this.state.collapsed}
                        >
                            
                        </Sider>
                        <Content style={{ overflow: 'hidden', margin: 0 }}>
                            hello world
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
export default Index