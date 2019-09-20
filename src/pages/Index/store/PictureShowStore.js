import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class PictureShowStore {
    model;
    @observable picData = [];

    @observable visible = false;

    @action setPicData = obj => {
        this.model = obj;
        if (obj.properties.imgs) {
            this.picData = [
                obj.properties.imgs.Forward_Right,
                obj.properties.imgs.Forward_Left,
                // obj.properties.imgs.Forward_Ahead //不显示中间图片
            ];
        }
    };

    @action getIdx = () => {
        return this.model ? this.model.properties.idx : -1;
    };

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };
}

export default new PictureShowStore();
