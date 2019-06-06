import React from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import { isAuthenticated } from 'src/utils/Session';
import { inject, observer } from 'mobx-react';

@inject('appStore')
@observer
class Avatar extends React.Component {
    state = {
        visible: false,
        avatar: require('src/assets/img/profile.jpg')
    };

    render() {
        const { avatar } = this.state;
        return (
            <div className="flex flex-center">
                <Dropdown overlay={this._renderMenu()}>
                    <img
                        onClick={() => this.setState({ visible: true })}
                        src={avatar}
                        className="avatar-img"
                        alt=""
                    />
                </Dropdown>
            </div>
        );
    }

    _renderMenu() {
        return (
            <Menu className="submenu-title-wrapper">
                <Menu.Item>{isAuthenticated()}</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={this.logout}>
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    logout = () => {
        const { appStore } = this.props;
        Modal.confirm({
            title: '您确定要退出登录？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                appStore.toggleLogin(false);
                location.reload();
            }
        });
    };
}

export default Avatar;
