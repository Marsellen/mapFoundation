import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
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
        this.undo();
    };

    @logDecorator({ operate: '撤销', skipHistory: true })
    async undo() {
        const { OperateHistoryStore, AttributeStore } = this.props;
        try {
            message.loading({
                content: '正在撤销...',
                key: 'undo',
                duration: 0
            });
            OperateHistoryStore.doning();
            AttributeStore.hide();
            AttributeStore.hideRelFeatures();
            let history = await OperateHistoryStore.undo();

            OperateHistoryStore.done();
            message.success({
                content: '撤销成功',
                key: 'undo',
                duration: 1
            });
            return history;
        } catch (e) {
            message.error({
                content: `撤销失败`,
                key: 'undo',
                duration: 1
            });
            throw e;
        }
    }
}

export default Undo;
