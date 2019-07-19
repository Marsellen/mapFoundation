import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    @observable visible;
    @observable type;
    @observable attributes = [];
    @observable readonly;

    @action show = readonly => {
        this.visible = true;
        this.readonly = readonly;
    };

    @action hide = () => {
        this.visible = false;
    };

    @action setModel = obj => {
        this.model = obj;
        this.type = this.model.layerName;
        this.updataAttributes();
    };

    @action updataAttributes = () => {
        this.attributes = modelFactory.getTabelData(
            this.model.layerName,
            this.model.data.properties
        );
    };

    setAttributes = flow(function*(properties) {
        // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
        this.model.data.properties = {
            ...this.model.data.properties,
            ...properties
        };
        this.updataAttributes();
        return this.model;
    });
}

export default new AttributeStore();
