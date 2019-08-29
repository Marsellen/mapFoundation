import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { Modal } from 'antd';
import { updateFeatures, updateRels } from './relCtrl/operateCtrl';
import { getLayerByName } from './vectorUtils';

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
        let layer = getLayerByName(history.layerName);
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
        let layer = getLayerByName(history.layerName);
        layer.removeFeatureByOption({
            key: key,
            value: history.feature.properties[key]
        });
    }

    updateFeature(history) {
        let layer = getLayerByName(history.layerName);
        layer.updateFeatures([history.feature]);
    }

    reUpdateFeature(history) {
        let layer = getLayerByName(history.layerName);
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
            let log = {};
            log.features = features.reverse();
            if (rels) {
                log.rels = rels.reverse();
            }
            if (attrs) {
                log.attrs = attrs.reverse();
            }
            updateFeatures(log);
        } else if (rels) {
            // 只变更了关联关系
            updateRels(rels.reverse());
        }
    }
}

export default new OperateFactory();
