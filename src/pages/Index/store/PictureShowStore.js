import { observable, configure, action } from 'mobx';
import TextStore from 'src/pages/Index/store/TextStore';

configure({ enforceActions: 'always' });
class PictureShowStore {
    @observable picData = [];
    @observable picIndex;
    @observable visible = false;
    activeBtn = [];

    @action setPicData = obj => {
        const { properties } = obj;
        const { imgs, idx } = properties;
        const { Forward_Right, Forward_Left } = imgs;
        this.picIndex = idx;
        if (!imgs) return;
        this.picData = [Forward_Right, Forward_Left];
    };

    @action setPicDataFormTrack = track => {
        const { index, trackpoint, direction } = track;
        const { Images } = trackpoint;
        const { Forward_Right, Forward_Left } = Images;
        this.picIndex = index;
        let imgs = [Forward_Right, Forward_Left];
        if (direction === 'Forward_Left') imgs.reverse();
        this.picData = imgs;
    };

    getIdx = () => {
        return this.picIndex;
    };

    @action show = type => {
        if (type === 'TraceListLayer') {
            TextStore.hide();
        }
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
