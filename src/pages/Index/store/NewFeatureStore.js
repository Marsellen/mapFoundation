import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import getID from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    feature;
    @observable visible;
    @observable fromData = [];
    @observable fromType;

    @action init = (feature, layerName) => {
        this.feature = feature;
        this.fromType = layerName;
        this.setFromData();
        this.visible = true;
    };

    setFromData = flow(function*() {
        this.fromData = [];
        try {
            const id = yield getID();
            this.fromData = modelFactory.getTabelData(
                this.fromType,
                this.feature.properties,
                id
            );
        } catch (e) {
            console.log(e);
        }
    });

    @action save = (properties, callback) => {
        this.feature.properties = {
            ...this.feature.properties,
            ...properties
        };
        this.hide();
        callback(this.feature, this.fromType);
    };

    @action hide = () => {
        this.visible = false;
    };

    @action getFeatureValue = key => {
        return this.feature[key];
    };
}

export default new NewFeatureStore();
