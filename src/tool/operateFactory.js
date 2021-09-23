import { updateFeatures, updateRels } from './relCtrl/operateCtrl';

class OperateFactory {
    async redo(history) {
        let { features, rels } = history;
        if (features) {
            await updateFeatures(history);
        } else {
            await updateRels(rels);
        }
    }

    async undo(history) {
        let { features, rels, attrs, pureFeatures } = history;
        if (features) {
            let log = {};
            log.features = features.reverse();
            if (pureFeatures) {
                log.pureFeatures = pureFeatures.reverse();
            }
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
