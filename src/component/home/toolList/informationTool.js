import React from 'react';
import { Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import AdMessage from 'src/component/common/adMessage';
import { checkSdkError } from 'src/util/vectorUtils';

@inject('AttributeStore')
@inject('ToolCtrlStore')
@inject('DataLayerStore')
@inject('InformationStore')
@inject('TaskStore')
@inject('appStore')
@observer
class InformationTool extends React.Component {
    componentDidMount() {
        const { DataLayerStore } = this.props;
        //注册质检标注绘制完成回调函数
        DataLayerStore.setInformationCallback(this.InformationCallback);
    }

    action = () => {
        const { DataLayerStore, InformationStore } = this.props;
        if (InformationStore.isCreateMarker()) return;
        InformationStore.setEditStatus(null, 'toggle');
        //关闭当前标注属性窗口
        InformationStore.hide();
        //切换到质检注记图层
        DataLayerStore.setEditLayer(window.informationLayer);
        //进入资料问题录入绘制模式
        DataLayerStore.newInformationMark();
        //标识当前是新增标注
        InformationStore.setEditStatus('create');
    };

    //质检标注线绘制完成回调
    InformationCallback = result => {
        const { DataLayerStore, InformationStore } = this.props;
        try {
            //判断是否绘制成功
            checkSdkError(result);
            //退出编辑工具
            DataLayerStore.removeCur();
            DataLayerStore.editor.clear();
            DataLayerStore.editor.cancel();
            //打开质检标注属性窗口
            InformationStore.show();
            //初始化选中的标注
            InformationStore.initCurrentMarker(result);
            //设置可选择图层，只能选除质检标注以外的图层
            const targetLayers = DataLayerStore.targetLayers.filter(
                layer => layer.layerName !== 'AD_Information'
            );
            DataLayerStore.setTargetLayers(targetLayers);
            if (DataLayerStore.editType === 'change_inform_feature') {
                DataLayerStore.exitChangeInformFeature();
            }
        } catch (e) {
            // InformationStore.exitMarker();
            message.error(e.message, 3);
        }
    };

    content = () => {
        const { editType } = this.props.DataLayerStore;
        const tip1 = '正在进行资料问题录入，按Esc退出资料问题录入操作';
        const tip2 = '正在选取问题数据，按Esc退出资料问题录入操作';
        const tip3 = '正在修改形状，按Esc退出资料问题录入操作';
        return (
            <label>
                <Icon type="info-circle" />{' '}
                {editType === 'choose_inform_feature'
                    ? tip2
                    : editType === 'change_inform_feature'
                    ? tip3
                    : tip1}
            </label>
        );
    };

    render() {
        const {
            appStore: { isQuality },
            InformationStore: { isCreateMarker },
            TaskStore: { isLocalTask, isEditableTask },
            DataLayerStore: { updateKey }
        } = this.props;
        const visible = isCreateMarker();
        return (
            <span key={updateKey}>
                <ToolIcon
                    id="add-information-mark"
                    icon="ziliaowentichuliqingbao"
                    title="资料问题录入"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                    disabled={!isEditableTask || isLocalTask}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }
}

export default InformationTool;
