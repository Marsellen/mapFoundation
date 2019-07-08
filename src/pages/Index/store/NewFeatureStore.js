import { observable, configure, action, flow } from 'mobx';
import modelFactory from 'src/utils/mapModel/modelFactory';
import getID from 'src/pages/Index/service/IDService';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(feature, layerName) {
        try {
            const id = yield getID();
            const defaultProperties = modelFactory.getDefaultProperties(
                layerName
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
