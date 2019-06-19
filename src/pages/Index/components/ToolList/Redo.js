import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import OperateFactory from 'src/utils/OperateFactory'

@inject('DataLayerStore')
@inject('OperateHistoryStore')
@observer
class Redo extends React.Component {
    render() {
        return <ToolIcon icon="redo" title="取消撤销" action={this.action} />;
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
