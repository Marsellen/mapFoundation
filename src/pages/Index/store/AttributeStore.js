import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    @observable visible;
    @observable type;
    @observable attributes = [];
    @observable rels = [];
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
        this.fetchAttributes();
        this.fetchRels();
    };

    @action getModel = () => {
        return this.model;
    };

    @action fetchAttributes = () => {
        this.attributes = modelFactory.getTabelData(
            this.model.layerName,
            this.model.data.properties
        );
    };

    fetchRels = flow(function*() {
        try {
            this.rels = yield relFactory.getTabelData(
                this.model.layerName,
                this.model.data.properties
            );
        } catch (error) {
            console.log(error);
        }
    });

    submit = flow(function*(data) {
        try {
            // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
            this.model.data.properties = {
                ...this.model.data.properties,
                ...data.attribute
            };
            this.fetchAttributes();
            yield relFactory.updateRels(
                data.rels,
                this.model.layerName,
                this.model.data.properties
            );
            this.fetchRels();
            return this.model;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttributeStore();
