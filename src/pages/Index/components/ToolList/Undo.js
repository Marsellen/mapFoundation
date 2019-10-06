import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
@inject('EditLogStore')
@observer
class Undo extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldUndo = currentNode > savedNode;

        return (
            <ToolIcon
                disabled={!shouldUndo}
                icon="chexiao"
                title="撤销"
                action={this.action}
            />
        );
    }

    action = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            AttributeStore,
            EditLogStore
        } = this.props;
        OperateHistoryStore.undo().then(history => {
            let log = {
                operateHistory: history,
                action: 'undo',
                result: 'success'
            };
            EditLogStore.add(log);
            DataLayerStore.exitEdit();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
        });
    };
}

export default Undo;
