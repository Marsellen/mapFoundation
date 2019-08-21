import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { Modal } from 'antd';
import { updateFeatures, updateRels } from './relCtrl/operateCtrl';

const UNDO_MAP = {
    addFeature: 'deleteFeature',
    deleteFeature: 'addFeature',
    updateFeature: 'reUpdateFeature',
    updateFeatureRels: 'reUpdateFeatureRels'
};

class OperateFactory {
    redo(history) {
        this[history.type](history);
    }

    undo(history) {
        let action = UNDO_MAP[history.type];
        this[action](history);
    }

    addFeature(history) {
        let layer = map
            .getLayerManager()
            .getLayersByType('VectorLayer')
            .find(layer => layer.layerName == history.layerName).layer;
        layer.addFeatures([history.feature]);
    }

    deleteFeature(history) {
        let key = DATA_LAYER_MAP[history.layerName].id;
        if (!history.feature.properties[key]) {
            return Modal.error({
                title: `要素[${key}]字段缺失，无法执行该操作`,
                okText: '确定'
            });
        }
        let layer = map
            .getLayerManager()
            .getLayersByType('VectorLayer')
            .find(layer => layer.layerName == history.layerName).layer;
        layer.removeFeatureByOption({
            key: key,
            value: history.feature.properties[key]
        });
    }

    updateFeature(history) {
        let layer = map
            .getLayerManager()
            .getLayersByType('VectorLayer')
            .find(layer => layer.layerName == history.layerName).layer;
        layer.updateFeatures([history.feature]);
    }

    reUpdateFeature(history) {
        let layer = map
            .getLayerManager()
            .getLayersByType('VectorLayer')
            .find(layer => layer.layerName == history.layerName).layer;
        layer.updateFeatures([history.oldFeature]);
    }

    updateFeatureRels(history) {
        let { features, rels } = history.data;
        if (features) {
            updateFeatures(history.data);
        } else {
            updateRels(rels);
        }
    }

    reUpdateFeatureRels(history) {
        let { features, rels, attrs } = history.data;
        if (features) {
            let log = {
                features: features.reverse(),
                rels: rels.reverse(),
                attrs: attrs.reverse()
            };
            updateFeatures(log);
        } else {
            // 只变更了关联关系
            updateRels(rels.reverse());
        }
    }
}

export default new OperateFactory();
