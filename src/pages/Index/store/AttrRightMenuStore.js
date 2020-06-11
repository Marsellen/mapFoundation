import { configure, observable, action } from 'mobx';

configure({ enforceActions: 'always' });
class AttrRightMenuStore {
    handleForceDelete;
    @observable visible = false;
    @observable MenuStyle = {};
    @observable currentData = {};
    @observable layerName = '';

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    //右击菜单显示在鼠标旁边,左击菜单显示在屏幕外
    @action getMenuStyle = (e, visible) => {
        var e = event || window.event;
        this.MenuStyle = {
            position: 'absolute',
            top: visible ? e.clientY : -1000,
            left: visible ? e.clientX : -1000
        };
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
