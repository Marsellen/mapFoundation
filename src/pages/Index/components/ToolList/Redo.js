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
class Redo extends React.Component {
    render() {
        return (
            <ToolIcon
                id="redo-btn"
                icon="huitui_"
                title="回退"
                disabled={this.disabled()}
                action={this.action}
            />
        );
    }

    disabled = () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, finalNode, pendding } = OperateHistoryStore;
        let shouldRedo = currentNode < finalNode;
        return !shouldRedo || pendding;
    };

    action = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore,
            RenderModeStore
        } = this.props;
        OperateHistoryStore.doning();
        OperateHistoryStore.redo().then(history => {
            let log = {
                operateHistory: history,
                action: 'redo',
                result: 'success'
            };
            editLog.store.add(log);
            DataLayerStore.exitEdit();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            AdEmitter.emit('fetchViewAttributeData');
            OperateHistoryStore.done();
            RenderModeStore.updateRels(history);
        });
    };
}

export default Redo;
