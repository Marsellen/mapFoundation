import { observable, flow, configure, action } from 'mobx';
import {
    getAuthentication,
    authenticateSuccess,
    logout
} from '../utils/Session';
import AppService from '../services/AppService';
import { message } from 'antd';

configure({ enforceActions: 'always' });
class AppStore {
    @observable loginUser = getAuthentication(); //当前登录用户信息

    login = flow(function*(userInfo, option) {
        let result = yield AppService.login(userInfo);
        // console.log(result);
        if (result.code !== 1) {
            message.error(result.message, 3);
            return;
        }
        authenticateSuccess(result.data, option.autoLogin);
        this.loginUser = result.data;
    });

    @action logout = () => {
        logout();
    };
}

export default new AppStore();
