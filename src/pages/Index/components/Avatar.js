import React from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { logout } from 'src/utils/Session';
import ToolIcon from 'src/components/ToolIcon';

@inject('appStore')
@inject('TaskStore')
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
        const { appStore } = this.props;
        const { loginUser } = appStore;
        return (
            <Menu className="submenu-title-wrapper">
                <Menu.Item>{loginUser ? loginUser.name : '未登录'}</Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    {/* onClick={this.about} */}
                    {loginUser ? loginUser.roleName : '未登录'}
                    {/* <span>版本信息</span> */}
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                    <ToolIcon
                        icon='tuichu' />
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
    }

    // about = () => {
    //     Modal.info({
    //         title: '版本号',
    //         content: CONFIG.version,
    //         okText: '确定'
    //     });
    // };

    logout = () => {
        Modal.confirm({
            title: '您确定要退出登录？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                logout();
                location.reload();
            }
        });
    };
}

export default Avatar;
