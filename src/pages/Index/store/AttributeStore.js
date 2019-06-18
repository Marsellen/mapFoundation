import { observable, configure, action } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    @observable attributes = [];

    @action setModel = obj => {
        this.model = obj;
        this.updataAttributes();
    };

    @action updataAttributes = () => {
        this.attributes = modelFactory.getTabelData(this.model);
    };

    @action setAttributes = row => {
        // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
        this.model.data.properties[row.key] = row.value;
        this.updataAttributes();
    };
}

export default new AttributeStore();
