import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import OperateFactory from 'src/utils/OperateFactory';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
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
            AttributeStore
        } = this.props;
        OperateHistoryStore.undo(preNode => {
            let layer = DataLayerStore.getLayerByName(preNode.layerName).layer;
            OperateFactory.undo(layer, preNode);
            DataLayerStore.clearChoose();
            AttributeStore.hide();
        });
    };
}

export default Undo;