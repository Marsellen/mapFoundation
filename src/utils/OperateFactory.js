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
        return this[history.type](history);
    }

    undo(history) {
        let action = UNDO_MAP[history.type];
        return this[action](history);
    }

    async addFeature(history) {
        let layer = getLayerByName(history.layerName);
        layer.addFeatures([history.feature]);
    }

    async deleteFeature(history) {
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

    async updateFeature(history) {
        let layer = getLayerByName(history.layerName);
        let key = DATA_LAYER_MAP[history.layerName].id;
        layer.removeFeatureByOption({
            key: key,
            value: history.feature.data.properties[key]
        });
        layer.addFeatures([history.feature.data]);
    }

    async reUpdateFeature(history) {
        let layer = getLayerByName(history.layerName);
        let key = DATA_LAYER_MAP[history.layerName].id;
        layer.removeFeatureByOption({
            key: key,
            value: history.oldFeature.data.properties[key]
        });
        layer.addFeatures([history.oldFeature.data]);
    }

    async updateFeatureRels(history) {
        let { features, rels } = history.data;
        if (features) {
            await updateFeatures(history.data);
        } else {
            await updateRels(rels);
        }
    }

    async reUpdateFeatureRels(history) {
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
            await updateFeatures(log);
        } else if (rels) {
            // 只变更了关联关系
            await updateRels(rels.reverse());
        }
    }
}

export default new OperateFactory();
