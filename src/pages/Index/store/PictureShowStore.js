import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'always' });
class PictureShowStore {
    @observable picData = [];
    @observable picIndex;
    @observable visible = false;
    activeBtn = [];

    @action setPicData = obj => {
        if (obj.properties.imgs) {
            this.picData = [
                obj.properties.imgs.Forward_Right,
                obj.properties.imgs.Forward_Left
                // obj.properties.imgs.Forward_Ahead //不显示中间图片
            ];
            this.picIndex = obj.properties.idx;
        }
    };

    @action setPicDataFormTrack = track => {
        this.picIndex = track.index;
        let imgs = [
            track.trackpoint.Images.Forward_Right,
            track.trackpoint.Images.Forward_Left
        ];
        if (track.direction === 'Forward_Left') imgs.reverse();
        this.picData = imgs;
    };

    getIdx = () => {
        return this.picIndex;
    };

    @action show = () => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action destory = () => {
        this.picData = [];
        this.picIndex = -1;
    };

    toggleActiveBtn = className => {
        if (this.activeBtn.includes(className)) {
            let index = this.activeBtn.findIndex(name => className === name);
            this.activeBtn.splice(index, 1);
        } else {
            this.activeBtn.push(className);
        }
    };
}

export default new PictureShowStore();
