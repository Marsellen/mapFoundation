import { observable, flow, configure } from 'mobx';
import { isAuthenticated, authenticateSuccess, logout } from '../utils/Session';
import AppService from '../services/AppService';

configure({ enforceActions: 'always' });
class AppStore {
    @observable isLogin = !!isAuthenticated(); //利用cookie来判断用户是否登录，避免刷新页面后登录状态丢失
    @observable loginUser = {}; //当前登录用户信息

    login = flow(function*(userInfo, option) {
        let result = yield AppService.login(userInfo);
        console.log(result.data);
        console.log(this.loginUser);
        console.log(userInfo);
        
        
    });
}

export default new AppStore();
