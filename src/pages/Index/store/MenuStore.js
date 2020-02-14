import { observable, flow, configure } from 'mobx';
import { message } from 'antd';
import MenuService from 'src/services/MenuService';

configure({ enforceActions: 'always' });
class MenuStore {
    @observable state = 'pending'; // 'pending' / 'done' / 'error'
    @observable menus = [];

    initMenus = flow(function*() {
        this.state = 'pending';
        try {
            const menus = yield MenuService.getMenu();
            // 异步代码块会被自动包装成动作并修改状态
            this.state = 'done';
            this.menus = menus;
        } catch (e) {
            console.log(e.message);
            message.warning('左侧菜单栏请求失败：' + e.message, 3);
            this.state = 'error';
        }
    });
}

export default new MenuStore();
