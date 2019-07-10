import { observable, configure, action } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';

configure({ enforceActions: 'always' });
class PictureShowStore {
    model;
    @observable picData;

    @action getPicData = obj => {
        this.model = obj;
        debugger;
        this.type = this.model.layerName;
    };

}

export default new PictureShowStore();
