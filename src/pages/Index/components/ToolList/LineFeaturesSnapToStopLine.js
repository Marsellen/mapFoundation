import React from 'react';
import { message } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { lineToStop } from 'src/utils/relCtrl/operateCtrl';
// import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';

const key = 'updatable';

@inject('DataLayerStore')
@inject('TaskStore')
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
        const { DataLayerStore } = this.props;
        const { nextMessage } = this.state;
        let visible = DataLayerStore.editType == 'line_snap_stop';
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
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'line_snap_stop') {
            //当批处理时才会监听shit键
            // debugger;
            document.addEventListener('keydown', event => {
                if (!event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                message.warning({
                    content: '选择一根停止线，右键完成对齐',
                    key,
                    duration: 0
                });
                // debugger;
                DataLayerStore.getSelectFeature();
                this.setState({
                    holdShift: true
                });
            });
        }
    };

    removeEventListener = () => {
        document.removeEventListener('keyup', this.addEventListener, true);
    };

    lineCheck = (mainFeature, layerName) => {
        mainFeature.forEach(item => {
            if (item.layerName != layerName) {
                message.error('所选要素不符合要求');
                return;
            }
        });
        if (!mainFeature) {
            message.error('请选择要素');
        }
    };

    selectFeatureCallback = async (result, event) => {
        const { DataLayerStore, TaskStore } = this.props;
        const { activeTask } = TaskStore;
        let layerName = DataLayerStore.getEditLayer().layerName;
        this.addEventListener();
        this.removeEventListener();
        try {
            if (this.state.holdShift && event.button === 2) {
                let [mainFeature, relFeatures] = result;
                if (!relFeatures) {
                    //没有选择停止线直接右键
                    throw {
                        message: '没有做对齐处理'
                    };
                }
                await this.lineCheck(mainFeature, layerName);
                await lineToStop(
                    mainFeature,
                    relFeatures,
                    layerName,
                    activeTask
                );
            }
        } catch (e) {
            message.warning('操作失败：' + e.message, 3);
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
