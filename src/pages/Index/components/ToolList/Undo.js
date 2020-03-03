import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';

@inject('RenderModeStore')
@inject('DataLayerStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
@observer
class Undo extends React.Component {
    render() {
        return (
            <ToolIcon
                id="undo-btn"
                icon="chexiao"
                title="撤销"
                action={this.action}
                disabled={this.disabled()}
            />
        );
    }

    disabled = () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode, pendding } = OperateHistoryStore;
        let shouldUndo = currentNode > savedNode;
        return !shouldUndo || pendding;
    };

    action = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore,
            RenderModeStore
        } = this.props;
        OperateHistoryStore.doning();
        OperateHistoryStore.undo().then(history => {
            let log = {
                operateHistory: history,
                action: 'undo',
                result: 'success'
            };
            editLog.store.add(log);
            DataLayerStore.exitEdit();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            AdEmitter.emit('fetchViewAttributeData');
            OperateHistoryStore.done();
            RenderModeStore.updateFeatureColor();
        });
    };
}

export default Undo;
