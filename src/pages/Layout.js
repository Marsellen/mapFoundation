import React from 'react';
import { Layout, Spin, Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import 'less/home.less';

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: (
                        <NavLink to={'/home'}>
                            <span>Home</span>
                        </NavLink>
                    ),
                    key: '/home'
                },
                {
                    label: (
                        <NavLink to={'/board'}>
                            <span>Board</span>
                        </NavLink>
                    ),
                    key: '/board'
                }
            ]
        };
    }

    componentDidMount() {}

    render() {
        const { items } = this.state;
        const { children } = this.props;
        const pathname = window.location.pathname;

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                        defaultSelectedKeys={[pathname]}
                    />
                </Header>
                <Content>
                    <div className="site-layout-content">{children}</div>
                </Content>
            </Layout>
        );
    }
}

export default Home;
