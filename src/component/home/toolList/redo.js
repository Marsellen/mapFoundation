import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { logDecorator, editLock } from 'src/util/decorator';
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
        const { OperateHistoryStore, DataLayerStore } = this.props;
        const { editType } = DataLayerStore;
        let { currentNode, finalNode, pendding } = OperateHistoryStore;
        let shouldRedo = currentNode < finalNode;
        return !shouldRedo || pendding || editType !== 'normal';
    };

    @editLock
    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.redo();
        this.redoHandler();
    };

    @logDecorator({ operate: '回退', skipHistory: true, toolType: 'redo' })
    async redoHandler() {
        const { OperateHistoryStore, AttributeStore } = this.props;
        OperateHistoryStore.doning();
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        let history = await OperateHistoryStore.redo();
        OperateHistoryStore.done();
        return history;
    }
}

export default Redo;
