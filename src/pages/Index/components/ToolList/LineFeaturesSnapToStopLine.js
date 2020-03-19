import React from 'react';
import { message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import editLog from 'src/models/editLog';
import AdEmitter from 'src/models/event';
import { inject, observer } from 'mobx-react';
import { lineToStop } from 'src/utils/relCtrl/operateCtrl';
import 'less/components/tool-icon.less';

const key = 'lineSnapStop';

@inject('DataLayerStore')
@inject('TaskStore')
@inject('OperateHistoryStore')
@observer
class LineFeaturesSnapToStopLine extends React.Component {
    constructor() {
        super();
        this.state = {
            nextMessage: false,
            holdShift: false
        };
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
                <ToolIcon icon="limianjuxing" />
                <div>线要素对齐到停止线</div>
            </div>
        );
    }

    addEventListener = () => {
        document.addEventListener('keydown', event => {
            if (!event.shiftKey) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            this.lineCheck(); //条件判断
        });
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.addEventListener, true);
    };

    lineCheck = () => {
        const { DataLayerStore } = this.props;
        let layerName = DataLayerStore.getEditLayer().layerName;
        const { result } = this.state;
        for (let i = 0; i < result.length; i++) {
            if (result[i].layerName !== layerName) {
                message.error('所选要素不符合要求');
                return;
            }
        }

        if (result.length === 0) {
            message.error('请选择要素');
            return false;
        }
        message.warning({
            content: '选择一根停止线，右键完成对齐',
            key,
            duration: 0
        });
        DataLayerStore.getSelectFeature();
        this.setState({
            holdShift: true
        });
    };

    selectFeatureCallback = async (result, event) => {
        const { DataLayerStore, TaskStore, OperateHistoryStore } = this.props;
        const { activeTask } = TaskStore;
        let layerName = DataLayerStore.getEditLayer().layerName;
        this.setState({
            result
        });
        this.removeEventListener();
        try {
            if (this.state.holdShift && event.button === 2) {
                let [mainFeature, relFeatures] = result;
                if (relFeatures.length === 0) {
                    //没有选择停止线直接右键
                    message.error('没有做对齐处理');
                    message.warning({
                        content: '选择一根停止线，右键完成对齐',
                        key,
                        duration: 1
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
                    key,
                    duration: 1
                });
                // 刷新属性列表
                AdEmitter.emit('fetchViewAttributeData');
                DataLayerStore.exitEdit();
            }
        } catch (e) {
            message.warning('对齐失败：' + e.message, 3);
            message.warning({
                content: '选择待处理的线要素，然后按shift进入下一步',
                key,
                duration: 1
            });
            DataLayerStore.exitEdit();
        }
    };

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'line_snap_stop') return;
        this.addEventListener();
        DataLayerStore.selectFeature();
        message.warning({
            content: '选择待处理的线要素，然后按shift进入下一步',
            key,
            duration: 0
        });
    };
}

export default LineFeaturesSnapToStopLine;
