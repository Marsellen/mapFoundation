import { observable, flow, configure, action } from 'mobx';
import ReferService from '../service/ReferService';

configure({ enforceActions: 'always' }); //不允许在动作之外进行状态修改

class ReferStore {
    @observable state = 'pending'; // 'pending' / 'done' / 'error'
    @observable refer = [];

    initRefer = flow(function*() {
        this.state = 'pending';
        try {
            const refer = yield ReferService.get();

            this.state = 'done';
            this.refer = refer;
        } catch (e) {
            console.log(e);
            this.state = 'error';
        }
    });
}

export default new ReferStore();
