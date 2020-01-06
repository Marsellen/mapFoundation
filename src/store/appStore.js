import { observable, flow, configure, computed } from 'mobx';
import { getAuthentication, authenticateSuccess } from '../utils/Session';
import AppService from 'src/services/AppService';

configure({ enforceActions: 'always' });
class AppStore {
    @observable loginUser = getAuthentication(); //当前登录用户信息
    @computed get roleCode() {
        return this.loginUser.roleCode;
    }

    login = flow(function*(userInfo, option) {
        let result = yield AppService.login(userInfo);
        // console.log(result);
        if (result.code !== 1) {
            throw result;
        }
        authenticateSuccess(result.data, option.autoLogin);
        this.loginUser = result.data;
    });
}

export default new AppStore();
