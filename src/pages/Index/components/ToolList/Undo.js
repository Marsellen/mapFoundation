import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { logDecorator, editLock } from 'src/utils/decorator';

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
        const { OperateHistoryStore, DataLayerStore } = this.props;
        const { editType } = DataLayerStore;
        let { currentNode, savedNode, pendding } = OperateHistoryStore;
        let shouldUndo = currentNode > savedNode;
        return !shouldUndo || pendding || editType !== 'normal';
    };

    @editLock
    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.undo();
        this.undoHandler();
    };

    @logDecorator({ operate: '撤销', skipHistory: true, toolType: 'undo' })
    async undoHandler() {
        const { OperateHistoryStore, AttributeStore } = this.props;
        OperateHistoryStore.doning();
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        let history = await OperateHistoryStore.undo();
        OperateHistoryStore.done();
        return history;
    }
}

export default Undo;
