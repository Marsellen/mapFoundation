import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { logDecorator } from 'src/utils/decorator';

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

    action = () => {
        this.redo();
    };

    @logDecorator({ operate: '回退', skipHistory: true })
    async redo() {
        const { OperateHistoryStore, AttributeStore } = this.props;
        try {
            message.loading({
                content: '正在回退...',
                key: 'redo',
                duration: 0
            });
            OperateHistoryStore.doning();
            let history = await OperateHistoryStore.redo();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            OperateHistoryStore.done();
            message.success({
                content: '回退成功',
                key: 'redo',
                duration: 1
            });
            return history;
        } catch (e) {
            message.error({
                content: `回退失败`,
                key: 'redo',
                duration: 1
            });
            throw e;
        }
    }
}

export default Redo;
