import { observable, flow, configure } from 'mobx';
import MenuService from '../service/MenuService';

configure({ enforceActions: 'always' });
class DemoMenuStore {
    @observable state = 'pending'; // 'pending' / 'done' / 'error'
    @observable menus = [];

    initMenus = flow(function*() {
        this.state = 'pending';
        try {
            const menus = yield MenuService.get();
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.menus = menus;
        } catch (e) {
            console.log(e);
            this.state = 'error';
        }
    });
}

export default new DemoMenuStore();
