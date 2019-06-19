import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import getID from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    feature;
    @observable visible;
    @observable fromData = [];
    @observable fromType;

    @action init = feature => {
        this.feature = feature;
        this.setFromData();
        this.visible = true;
    };

    @action setFromType = layer => {
        if (!layer) return;
        this.fromType = layer.layerName;
    };

    setFromData = flow(function*() {
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

    @action save = properties => {
        this.feature.properties = {
            ...this.feature.properties,
            ...properties
        };
        this.visible = false;
        this.feature = null;
        this.fromData = [];
    };
}

export default new NewFeatureStore();
