import { action, configure, observable } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import { getLayerByName } from 'src/utils/vectorUtils';
import _ from 'lodash';

configure({ enforceActions: 'always' });
class BatchAssignStore {
    @observable visible;
    @observable attributes;

    @action show = features => {
        this.visible = true;
        this.features = features;
        this.layerName = features[0].layerName;
        let properties = features.map(feature => feature.data.properties);
        this.attributes = modelFactory.getBatchAssignTableData(
            this.layerName,
            properties
        );
    };

    @action hide = () => {
        this.visible = false;
    };

    @action submit = data => {
        let attributes = data.attributes;
        let newFeatures = _.cloneDeep(this.features);
        newFeatures.forEach(feature => {
            feature.data.properties = {
                ...feature.data.properties,
                ...attributes
            };
        });
        let layer = getLayerByName(this.layerName);
        layer.updateFeatures(newFeatures);

        this.hide();

        return {
            features: [this.features, newFeatures]
        };
    };
}

export default new BatchAssignStore();
