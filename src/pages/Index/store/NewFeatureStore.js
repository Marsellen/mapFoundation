import { configure, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import IDService from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(feature, layerName) {
        try {
            // const result = yield IDService.post({ id_type: 'AD_Lane' });
            // let id = result.data[0].min;
            let id = Date.now();
            const defaultProperties = modelFactory.getDefaultProperties(
                layerName,
                id
            );
            feature.properties = {
                ...feature.properties,
                ...defaultProperties
            };
        } catch (e) {
            console.log(e);
        }
    });
}

export default new NewFeatureStore();
