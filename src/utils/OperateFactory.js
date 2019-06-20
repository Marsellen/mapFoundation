import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

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
        layer.removeFeatureByOption({
            key: key,
            value: history.feature.properties[key]
        });
    }

    updateFeature(layer, history) {
        layer.updateFeatures([
            {
                data: history.newFeature,
                uuid: history.newFeature.properties.uuid
            }
        ]);
    }

    reUpdateFeature(layer, history) {
        layer.updateFeatures([
            {
                data: history.oldFeature,
                uuid: history.oldFeature.properties.uuid
            }
        ]);
    }
}

export default new OperateFactory();
