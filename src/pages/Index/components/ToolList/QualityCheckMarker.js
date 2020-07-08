import React from 'react';
import { Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';
import AdMessage from 'src/components/AdMessage';
import { regionCheck, checkSdkError } from 'src/utils/vectorUtils';

@inject('appStore')
@inject('AttributeStore')
@inject('ToolCtrlStore')
@inject('DataLayerStore')
@inject('QCMarkerStore')
@inject('TaskStore')
@observer
class QualityCheckMarker extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        //注册质检标注绘制完成回调函数
        DataLayerStore.setQCMarkerCallback(this.QCMarkerCallback);
    }

    action = () => {
        const { DataLayerStore, QCMarkerStore } = this.props;
        //切换到质检注记图层
        this.enterMarkerLayer();
        //进入质检标注绘制模式
        DataLayerStore.newQCMarker();
        //标识当前是新增标注
        QCMarkerStore.setEditStatus('create');
    };

    //切换到质检注记图层
    enterMarkerLayer = () => {
        const { DataLayerStore, ToolCtrlStore, AttributeStore, appStore } = this.props;
        const userInfo = appStore.loginUser;
        const layer = DataLayerStore.activeEditor(window.markerLayer);
        ToolCtrlStore.updateByEditLayer(layer, userInfo);
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
    };

    //质检标注线绘制完成回调
    QCMarkerCallback = (result, event) => {
        const { QCMarkerStore, DataLayerStore } = this.props;
        console.log('result', result);
        console.log('event', event);
        try {
            //判断是否绘制成功
            checkSdkError(result);
            //判断是否在任务范围内
            regionCheck(result);
            //退出编辑工具
            DataLayerStore.exitEdit();
            //打开质检标注属性窗口
            QCMarkerStore.show();
            //初始化选中的标注
            QCMarkerStore.initCurrentMarker(result);
        } catch (e) {
            DataLayerStore.exitMarker();
            message.error(e.message, 3);
        }
    };

    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} /> 开始进行质检标注
            </label>
        );
    };

    render() {
        const { TaskStore, DataLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { getEditLayer, updateKey } = DataLayerStore;
        const editLayer = getEditLayer();
        const visible = editLayer && editLayer.layerName === 'AD_Marker';

        return (
            <span key={updateKey}>
                <ToolIcon
                    id="attribute-brush-btn"
                    icon="shuxingshua"
                    title="质检标注工具"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                    disabled={!activeTaskId}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }
}

export default QualityCheckMarker;
