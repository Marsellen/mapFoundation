import React from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { logout } from 'src/util/session';
import ToolIcon from 'src/component/common/toolIcon';
import HomeVisiteHistory from 'src/util/visiteHistory/homeVisiteHistory';
import BuriedPoint from 'src/util/buriedPoint';

@withRouter
@inject('appStore')
@inject('TaskStore')
@observer
class Avatar extends React.Component {
    state = {
        visible: false,
        avatar: require('src/asset/img/touxiang.png')
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
        const style = {
            fontSize: '12px'
        };
        return (
            <Menu className="submenu-title-wrapper" style={style}>
                <Menu.Item>{loginUser ? loginUser.name : '未登录'}</Menu.Item>
                <Menu.Item>
                    {/* onClick={this.about} */}
                    {loginUser ? loginUser.roleName : '未登录'}
                    {/* <span>版本信息</span> */}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={this.logout} className="logout-item">
                    <ToolIcon icon="tuichu" />
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
            onOk: async () => {
                await BuriedPoint.buriedPointEnd('logout');
                logout();
                location.pathname === '/' && HomeVisiteHistory.removeVisitedHistory();
                location.href = '/login';
            }
        });
    };
}

export default Avatar;
