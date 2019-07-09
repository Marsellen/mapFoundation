import { configure, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import IDService from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(feature, layerName, callback) {
        try {
            const result = yield IDService.post({ id_type: 'AD_' + layerName });
            let id = result.data[0].min;
            const defaultProperties = modelFactory.getDefaultProperties(
                layerName,
                id
            );
            feature.properties = {
                ...feature.properties,
                ...defaultProperties
            };
            callback()
        } catch (e) {
            console.log(e);
        }
    });
}

export default new NewFeatureStore();
