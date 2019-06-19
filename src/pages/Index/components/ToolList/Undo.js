import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import OperateFactory from 'src/utils/OperateFactory';

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@observer
class Undo extends React.Component {
    render() {
        const { OperateHistoryStore } = this.props;
        let shouldUndo = OperateHistoryStore.shouldUndo();
        return (
            <ToolIcon
                disabled={shouldUndo}
                icon="undo"
                title="撤销"
                action={this.action}
            />
        );
    }

    action = () => {
        const { OperateHistoryStore, DataLayerStore } = this.props;
        OperateHistoryStore.undo(preNode => {
            let layer = DataLayerStore.getLayerByName(preNode.layerName).layer;
            OperateFactory.undo(layer, preNode);
        });
    };
}

export default Undo;
