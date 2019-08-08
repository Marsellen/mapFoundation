import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModelFactory';
import relFactory from 'src/utils/relCtrl/relFactory';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import { message } from 'antd';

configure({ enforceActions: 'always' });
class AttributeStore {
    model;
    relFeatures = [];
    @observable visible;
    @observable type;
    @observable attributes = [];
    @observable rels = [];
    @observable attrs = [];
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
        this.fetchAttrs();
        this.fetchRelFeatures();
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

    fetchAttrs = flow(function*() {
        try {
            this.attrs = yield attrFactory.getTabelData(
                this.model.layerName,
                this.model.data.properties
            );
        } catch (error) {
            console.log(error);
        }
    });

    fetchRelFeatures = flow(function*() {
        try {
            this.hideRelFeatures();
            this.relFeatures = yield relFactory.getRelFeatures(this.model);
            this.showRelFeatures();
        } catch (error) {
            console.log(error);
        }
    });

    @action hideRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                map.getLayerManager()
                    .getLayersByType('VectorLayer')
                    .find(layer => layer.layerName == feature.layerName)
                    .layer.updateFeatureColor(feature.option);
            });
        } catch (error) {
            console.log(error);
        }
    };

    @action showRelFeatures = () => {
        try {
            this.relFeatures.map(feature => {
                map.getLayerManager()
                    .getLayersByType('VectorLayer')
                    .find(layer => layer.layerName == feature.layerName)
                    .layer.updateFeatureColor(
                        feature.option,
                        'rgb(255, 87, 34)'
                    );
            });
        } catch (error) {
            console.log(error);
        }
    };

    submit = flow(function*(data) {
        try {
            // model.data引用sdk要素数据的指针。修改其属性会同步修改sdk的要素数据。
            this.model.data.properties = {
                ...this.model.data.properties,
                ...data.attributes
            };
            // this.fetchAttributes();
            if (data.rels) {
                yield relFactory.updateRels(
                    data.rels,
                    this.model.layerName,
                    this.model.data.properties
                );
            }
            // this.fetchRels();
            if (data.attrs) {
                yield attrFactory.updateAttrs(
                    data.attrs,
                    this.model.layerName,
                    this.model.data.properties
                );
            }
            // this.fetchAttrs();
        } catch (e) {
            console.log(e);
            message.warning(e.message, 3);
        }
        return this.model;
    });
}

export default new AttributeStore();
