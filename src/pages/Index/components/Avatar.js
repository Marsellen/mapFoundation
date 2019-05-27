import React from 'react';
import { Dropdown, Menu } from 'antd';
import { isAuthenticated } from 'src/utils/Session';

class Avatar extends React.Component {
    state = {
        visible: false,
        avatar: require('src/assets/img/profile.jpg')
    };

    render() {
        const { avatar } = this.state;
        return (
            <div style={Styles.container}>
                <Dropdown overlay={this._renderMenu()}>
                    <img
                        onClick={() => this.setState({ visible: true })}
                        src={avatar}
                        style={Styles.img}
                        alt=""
                    />
                </Dropdown>
            </div>
        );
    }

    _renderMenu() {
        return (
            <Menu className="menu">
                <Menu.Item>{isAuthenticated()}</Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <span onClick={this.logout}>退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    logout = () => {};
}

const Styles = {
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    img: {
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 20
    }
};

export default Avatar;
