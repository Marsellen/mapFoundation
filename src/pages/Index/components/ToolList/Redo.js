import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import OperateFactory from 'src/utils/OperateFactory';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@observer
class Redo extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let { currentNode, finalNode } = OperateHistoryStore;
        let shouldRedo = currentNode < finalNode;
        return (
            <ToolIcon
                icon="redo"
                title="取消撤销"
                disabled={!shouldRedo}
                action={this.action}
            />
        );
    }

    action = () => {
        const { OperateHistoryStore, DataLayerStore } = this.props;
        OperateHistoryStore.redo(nextNode => {
            let layer = DataLayerStore.getLayerByName(nextNode.layerName).layer;
            OperateFactory.redo(layer, nextNode);
        });
    };
}

export default Redo;
