import { observable, flow, configure, computed } from 'mobx';
import { getAuthentication, authenticateSuccess } from 'src/util/session';
import AppService from 'src/service/appService';

configure({ enforceActions: 'always' });
class AppStore {
    @observable loginUser = getAuthentication(); //当前登录用户信息
    @computed get roleCode() {
        return this.loginUser.roleCode;
    }
    @computed get isProducer() {
        return this.roleCode === 'producer';
    }
    @computed get isQuality() {
        return this.roleCode === 'quality';
    }

    login = flow(function* (userInfo, option) {
        let result = yield AppService.login(userInfo);

        authenticateSuccess(result.data, option.autoLogin);
        this.loginUser = result.data;
    });
}

export default new AppStore();
