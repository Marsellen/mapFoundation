import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
@observer
class Redo extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, finalNode } = OperateHistoryStore;
        let shouldRedo = currentNode < finalNode;
        return (
            <ToolIcon
                id="redo-btn"
                icon="huitui_"
                title="回退"
                disabled={!shouldRedo}
                action={this.action}
            />
        );
    }

    action = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore
        } = this.props;
        OperateHistoryStore.redo().then(history => {
            let log = {
                operateHistory: history,
                action: 'undo',
                result: 'success'
            };
            editLog.store.add(log);
            DataLayerStore.exitEdit();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
        });
    };
}

export default Redo;
