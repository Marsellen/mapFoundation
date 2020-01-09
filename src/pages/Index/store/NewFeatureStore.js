import { configure, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import IDService from 'src/services/IDService';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(result, isManbuildTask) {
        let feature = result.data;
        let layerName = result.layerName;
        const _result = yield IDService.initID({
            id_type: DATA_LAYER_MAP[layerName].spec
        });

        let id = _result.data[0].min;
        const defaultProperties = modelFactory.getDefaultProperties(
            layerName,
            id,
            isManbuildTask
        );
        feature.properties = {
            ...feature.properties,
            ...defaultProperties
        };
        return result;
    });
}

export default new NewFeatureStore();
