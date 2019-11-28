import { configure, flow } from 'mobx';
import modelFactory from 'src/utils/vectorCtrl/modelFactory';
import IDService from 'src/pages/Index/service/IDService';
import { Modal } from 'antd';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class NewFeatureStore {
    init = flow(function*(result) {
        let feature = result.data;
        let layerName = result.layerName;
        const _result = yield IDService.post({
            id_type: DATA_LAYER_MAP[layerName].spec
        }).catch(e => {
            throw '请求ID失败';
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
    });
}

export default new NewFeatureStore();
