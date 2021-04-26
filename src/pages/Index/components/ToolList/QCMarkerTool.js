import React from 'react';
import { Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { checkSdkError } from 'src/utils/vectorUtils';

@inject('AttributeStore')
@inject('ToolCtrlStore')
@inject('DataLayerStore')
@inject('QCMarkerStore')
@inject('TaskStore')
@inject('appStore')
@observer
class QCMarkerTool extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        //注册质检标注绘制完成回调函数
        DataLayerStore.setQCMarkerCallback(this.QCMarkerCallback);
    }

    action = () => {
        const { DataLayerStore, QCMarkerStore } = this.props;
        if (QCMarkerStore.isCreateMarker()) return;
        QCMarkerStore.setEditStatus(null, 'toggle');
        //关闭当前标注属性窗口
        QCMarkerStore.hide();
        //切换到质检注记图层
        DataLayerStore.setEditLayer(window.markerLayer);
        //进入质检标注绘制模式
        DataLayerStore.newQCMarker();
        //标识当前是新增标注
        QCMarkerStore.setEditStatus('create');
    };

    //质检标注线绘制完成回调
    QCMarkerCallback = result => {
        const { DataLayerStore, QCMarkerStore } = this.props;
        try {
            //判断是否绘制成功
            checkSdkError(result);
            //退出编辑工具
            DataLayerStore.removeCur();
            DataLayerStore.editor.clear();
            DataLayerStore.editor.cancel();
            //打开质检标注属性窗口
            QCMarkerStore.show();
            //初始化选中的标注
            QCMarkerStore.initCurrentMarker(result);
            //设置可选择图层，只能选除质检标注以外的图层
            const targetLayers = DataLayerStore.targetLayers.filter(
                layer => layer.layerName !== 'AD_Marker'
            );
            DataLayerStore.setTargetLayers(targetLayers);
        } catch (e) {
            QCMarkerStore.exitMarker();
            message.error(e.message, 3);
        }
    };

    content = () => {
        const { editType } = this.props.DataLayerStore;
        const tip1 = '正在进行质检标注，按Esc退出质检标注工具';
        const tip2 = '正选取待标注的错误数据，按Esc退出质检标注工具';
        return (
            <label>
                <Icon type="info-circle" /> {editType === 'choose_error_feature' ? tip2 : tip1}
            </label>
        );
    };

    render() {
        const {
            appStore: { isQuality },
            QCMarkerStore: { isCreateMarker },
            TaskStore: { isLocalTask, isEditableTask },
            DataLayerStore: { updateKey }
        } = this.props;
        const visible = isCreateMarker();
        //当前任务是质检任务，才会显示质检标注工具
        if (isQuality) {
            return (
                <span key={updateKey}>
                    <ToolIcon
                        id="add-quality-mark"
                        icon="zhijianbiaozhugongju"
                        title="质检标注工具"
                        className="ad-tool-icon"
                        focusClassName="ad-tool-icon-active"
                        visible={visible}
                        action={this.action}
                        disabled={!isEditableTask || isLocalTask}
                    />
                    <AdMessage visible={visible} content={this.content()} />
                </span>
            );
        } else {
            return null;
        }
    }
}

export default QCMarkerTool;
