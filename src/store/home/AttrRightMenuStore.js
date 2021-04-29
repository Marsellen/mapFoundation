import { configure, observable, action } from 'mobx';

configure({ enforceActions: 'always' });
class AttrRightMenuStore {
    handleForceDelete;
    @observable visible = false;
    @observable MenuStyle = {};
    @observable currentData = {};
    @observable layerName = '';
    @observable zIndex = -1;

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    //右击菜单显示在鼠标旁边,左击菜单显示在屏幕外
    @action getMenuStyle = (e, visible) => {
        this.MenuStyle = {
            position: 'absolute',
            top: e.clientY,
            left: e.clientX
        };
        this.zIndex = visible ? 999 : -1;
    };

    @action getData = data => {
        this.currentData = data;
    };

    @action getLayerName = layerName => {
        this.layerName = layerName;
    };

    @action registerForceDelete = fn => {
        this.handleForceDelete = fn;
    };
}
export default new AttrRightMenuStore();
