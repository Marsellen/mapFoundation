import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { Modal } from 'antd';

const UNDO_MAP = {
    addFeature: 'deleteFeature',
    deleteFeature: 'addFeature',
    updateFeature: 'reUpdateFeature'
};

class OperateFactory {
    redo(layer, history) {
        this[history.type](layer, history);
    }

    undo(layer, history) {
        let action = UNDO_MAP[history.type];
        this[action](layer, history);
    }

    addFeature(layer, history) {
        layer.addFeatures([history.feature]);
    }

    deleteFeature(layer, history) {
        let key = DATA_LAYER_MAP[history.layerName].id;
        if (!history.feature.properties[key]) {
            return Modal.error({
                title: `要素[${key}]字段缺失，无法执行该操作`,
                okText: '确定'
            });
        }
        layer.removeFeatureByOption({
            key: key,
            value: history.feature.properties[key]
        });
    }

    updateFeature(layer, history) {
        layer.updateFeatures([history.feature]);
    }

    reUpdateFeature(layer, history) {
        layer.updateFeatures([history.oldFeature]);
    }
}

export default new OperateFactory();
