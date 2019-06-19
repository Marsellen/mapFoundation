const UNDO_MAP = {
    addFeature: 'deleteFeature',
    deleteFeature: 'addFeature',
    updateFeature: 'reUpdateFeature'
}

class OperateFactory {
    redo(layer, history) {
        this[history.type](layer, history)
    }

    undo(layer, history) {
        let action = UNDO_MAP[history.type]
        this[action](layer, history)
    }

    addFeature(layer, history) {
        layer.addFeatures([history.feature])
    }

    deleteFeature(layer, history) {
        layer.removeFeatureById(history.feature.properties.uuid)
    }

    updateFeature(layer, history) {
        layer.updateFeatures([{
            data: history.newFeature,
            uuid: history.newFeature.properties.uuid
        }])
    }

    reUpdateFeature(layer, history) {
        layer.updateFeatures([{
            data: history.oldFeature,
            uuid: history.oldFeature.properties.uuid
        }])
    }

}

export default new OperateFactory()