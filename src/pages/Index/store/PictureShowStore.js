import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class PictureShowStore {
    model;
    @observable picData;

    @observable visible = false;

    @action getPicData = obj => {
        this.model = obj;
        this.picData = obj.properties.imgs[0]
            ? obj.properties.imgs[0].name
            : null;
    };

    @action setPicData = obj => {
        this.model = obj;
        this.picData = obj.properties.imgs[0]
            ? obj.properties.imgs[0].name
            : null;
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
