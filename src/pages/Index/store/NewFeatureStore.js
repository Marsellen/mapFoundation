import { configure, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import IDService from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(result) {
        try {
            let feature = result.data;
            let layerName = result.layerName;
            const _result = yield IDService.post({
                id_type: 'AD_' + result.layerName
            });
            let id = _result.data[0].min;
            const defaultProperties = modelFactory.getDefaultProperties(
                layerName,
                id
            );
            feature.properties = {
                ...feature.properties,
                ...defaultProperties
            };
            return result;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new NewFeatureStore();
