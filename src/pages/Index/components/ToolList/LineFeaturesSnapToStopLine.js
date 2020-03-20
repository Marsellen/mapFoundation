import React from 'react';
import { message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';
import { inject, observer } from 'mobx-react';
import { lineToStop } from 'src/utils/relCtrl/operateCtrl';
import 'less/components/tool-icon.less';

window.messagekey = 'key';

@inject('DataLayerStore')
@inject('TaskStore')
@inject('OperateHistoryStore')
@inject('AttributeStore')
@observer
class LineFeaturesSnapToStopLine extends React.Component {
    constructor() {
        super();
        this.state = {
            nextMessage: false,
            holdShift: false,
            flag: false,
            visible: false
        };
        this.result = [];
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setSelectFeatureCallback(this.selectFeatureCallback);
    }
    render() {
        return (
            <div
                id="line-snap-stop-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="xianyaosuduiqidaotingzhixian" />
                <div>线要素对齐到停止线</div>
            </div>
        );
    }

    addEventListener = () => {
        document.addEventListener('keyup', this.shiftCallback);
    };

    shiftCallback = event => {
        if (event.key === 'Shift' && !this.state.flag) {
            if (this.result.length === 0) {
                return;
            }
            this.lineCheck(this.result); //条件判断
        }
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.shiftCallback);
        this.setState({
            flag: false
        });
    };

    lineCheck = result => {
        const { DataLayerStore } = this.props;
        let layerName = DataLayerStore.getEditLayer().layerName;
        // let editType = DataLayerStore.editType == 'line_snap_stop';

        if (!result || result.length === 0) {
            message.error('请选择要素');
            return false;
        } else {
            for (let i = 0; i < result.length; i++) {
                if (result[i].layerName !== layerName) {
                    message.error('所选要素不符合要求');
                    return;
                }
            }
            DataLayerStore.getSelectFeature();
            this.removeEventListener();
            this.setState({
                holdShift: true,
                flag: true
                // flag: editType ? true : false
            });
            message.warning({
                content: '选择一根停止线，右键完成对齐',
                messagekey,
                duration: 0
            });
        }
    };

    selectFeatureCallback = async (result, event) => {
        const { DataLayerStore, TaskStore, OperateHistoryStore } = this.props;
        const { activeTask } = TaskStore;
        let layerName = DataLayerStore.getEditLayer().layerName;
        this.result = result;
        try {
            if (this.state.holdShift && event.button === 2) {
                let [mainFeature, relFeatures] = result;
                if (relFeatures.length === 0) {
                    //没有选择停止线直接右键
                    message.error('没有做对齐处理');
                    message.warning({
                        content: '选择一根停止线，右键完成对齐',
                        messagekey,
                        duration: 1
                    });
                    this.setState({
                        flag: false
                    });
                    DataLayerStore.exitEdit();
                    return false;
                }
                let { historyLog, Message } = await lineToStop(
                    mainFeature,
                    relFeatures,
                    layerName,
                    activeTask
                );
                let history = {
                    type: 'updateFeatureRels',
                    data: historyLog
                };
                let log = {
                    operateHistory: history,
                    action: 'batchAssignment',
                    result: 'success'
                };
                OperateHistoryStore.add(history);
                editLog.store.add(log);
                message.success(Message, 3);
                message.warning({
                    content: '选择一根停止线，右键完成对齐',
                    messagekey,
                    duration: 1
                });
                // 刷新属性列表
                AdEmitter.emit('fetchViewAttributeData');
                this.setState({
                    flag: false
                });
                DataLayerStore.exitEdit();
            }
        } catch (e) {
            message.warning('对齐失败：' + e.message, 3);
            this.removeEventListener();
            message.warning({
                content: this.state.flag
                    ? '选择一根停止线，右键完成对齐'
                    : '选择待处理的线要素，然后按shift进入下一步',
                messagekey,
                duration: 1
            });
            this.setState({
                flag: false
            });
            DataLayerStore.exitEdit();
        }
    };

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'line_snap_stop') return;
        message.warning({
            content: '选择待处理的线要素，然后按shift进入下一步',
            messagekey,
            duration: 0
        });

        AttributeStore.hideRelFeatures();
        this.addEventListener();
        DataLayerStore.selectFeature();
    };
}

export default LineFeaturesSnapToStopLine;
