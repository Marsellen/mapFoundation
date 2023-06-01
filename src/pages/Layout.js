import React from 'react';
import { Layout, Spin, Menu } from 'antd';
import { Link, NavLink, Outlet } from 'react-router-dom';
import IconFont from 'src/components/iconFont';
import 'less/home.less';

const { Header, Content, Footer } = Layout;

class Layouts extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: (
                        <NavLink to={'/oneMap'}>
                            <span>OneMap</span>
                        </NavLink>
                    ),
                    key: '/oneMap'
                },
                {
                    label: (
                        <NavLink to={'/ultron'}>
                            <span>Ultron</span>
                        </NavLink>
                    ),
                    key: '/ultron'
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
                    <div className="logo">
                        Anything<span>just do it!</span>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                        defaultSelectedKeys={[pathname]}
                    />
                </Header>
                <Content>
                    <div className="layout-content">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Layouts;
