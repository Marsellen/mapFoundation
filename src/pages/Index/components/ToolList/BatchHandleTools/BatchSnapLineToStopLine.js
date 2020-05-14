import React from 'react';
import { message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { inject, observer } from 'mobx-react';
import { lineToStop } from 'src/utils/relCtrl/operateCtrl';
import { logDecorator } from 'src/utils/decorator';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import TaskStore from 'src/pages/Index/store/TaskStore';
import AttributeStore from 'src/pages/Index/store/AttributeStore';

import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@observer
class BatchSnapLineToStopLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            visible: false,
            message: ''
        };
        this.result = [];
    }
    componentDidMount() {
        const { DataLayerStore } = this.props;
        DataLayerStore.setSelectFeatureCallback(this.selectFeatureCallback);
    }

    componentWillUnmount() {
        this.removeEventListener();
    }
    render() {
        const { DataLayerStore } = this.props;
        const { message, visible } = this.state;
        let messageVisible =
            DataLayerStore.editType == 'line_snap_stop' && visible;
        return (
            <div
                id="line-snap-stop-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="xianyaosuduiqidaotingzhixian" />
                <div>线要素对齐到停止线</div>
                <AdMessage visible={messageVisible} content={message} />
            </div>
        );
    }

    addEventListener = () => {
        document.addEventListener('keyup', this.shiftCallback);
    };

    shiftCallback = event => {
        const { DataLayerStore } = this.props;
        if (
            event.key !== 'Shift' ||
            DataLayerStore.editType !== 'line_snap_stop'
        )
            return;
        try {
            this.lineCheck(); //条件判断
            this.gotoCheckStop();
        } catch (e) {
            this.setState({
                message: e.message
            });
            setTimeout(() => {
                this.setState({
                    message: '选择待处理的线要素，然后按shift进入下一步'
                });
            }, 1000);
        }
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.shiftCallback);
    };

    lineCheck = () => {
        const { DataLayerStore } = this.props;
        let layerName = DataLayerStore.getEditLayer().layerName;

        if (!this.result || this.result.length === 0) {
            throw new Error('未选择要素！');
        }
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i].layerName !== layerName) {
                throw new Error('所选要素不符合要求！');
            }
        }
    };

    gotoCheckStop = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.lineSnapStop(1);
        this.removeEventListener();
        this.setState({
            step: 1,
            message: '选择一根停止线，右键完成对齐',
            visible: true
        });
    };

    selectFeatureCallback = (result, event) => {
        const { step } = this.state;
        this.result = result;
        if (step === 1) {
            this.handleSnap(event);
            this.setState({
                step: 0,
                visible: false,
                message: ''
            });
        }
    };

    @logDecorator({ operate: '线要素对齐到停止线' })
    async handleSnap(event) {
        if (event.button !== 2) return;
        try {
            const { activeTask } = TaskStore;
            let layerName = DataLayerStore.getEditLayer().layerName;
            message.loading({
                content: '处理中...',
                key: 'line_snap_stop',
                duration: 0
            });
            let [features, [stopLine]] = this.result;
            if (!stopLine) {
                throw new Error('没有做对齐处理');
            }
            let historyLog = await lineToStop(
                features,
                stopLine,
                layerName,
                activeTask
            );
            return historyLog;
        } catch (e) {
            message.error({
                content: e.message,
                key: 'line_snap_stop',
                duration: 3
            });
            this.removeEventListener();
            throw e;
        }
    }

    action = () => {
        const { DataLayerStore } = this.props;
        this.result = [];
        if (DataLayerStore.editType == 'line_snap_stop') return;

        AttributeStore.hideRelFeatures();
        this.addEventListener();
        DataLayerStore.lineSnapStop();
        this.setState({
            step: 0,
            message: '选择待处理的线要素，然后按shift进入下一步',
            visible: true
        });
    };
}

export default BatchSnapLineToStopLine;
