import { observable, configure, action } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';

configure({ enforceActions: 'always' });
class AttributeStore {
    @observable attributes = [];

    @action setAttributes = properties => {
        this.attributes = modelFactory('ADLaneDivider', properties).tableData();
    };
}

export default new AttributeStore();
