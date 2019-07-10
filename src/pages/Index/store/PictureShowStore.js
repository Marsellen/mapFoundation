import { observable, configure, action } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';

configure({ enforceActions: 'always' });
class PictureShowStore {
    model;
    @observable picData;

    @observable visible = false;

    @action getPicData = obj => {
        this.model = obj;
        this.picData = this.model.data.properties.Img.middle
            ? this.model.data.properties.Img.middle
            : null;
    };

    @action show = readonly => {
        this.visible = true;
    };

    @action hide = () => {
        this.visible = false;
    };
}

export default new PictureShowStore();
