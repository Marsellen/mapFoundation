import { configure, flow } from 'mobx';
import modelFactory from 'src/tool/vectorCtrl/modelFactory';
import IDService from 'src/service/idService';
import { DATA_LAYER_MAP } from 'src/config/dataLayerConfig';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function* (result) {
        let feature = result.data;
        let layerName = result.layerName;
        const _result = yield IDService.initID({
            id_type: DATA_LAYER_MAP[layerName].spec
        });

        let id = _result.data[0].min;
        const defaultProperties = modelFactory.getDefaultProperties(layerName, id);
        feature.properties = {
            ...defaultProperties,
            ...feature.properties
        };
        return result;
    });
}

export default new NewFeatureStore();
