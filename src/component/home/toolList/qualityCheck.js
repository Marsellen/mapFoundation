import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import { Modal } from 'antd';
import { saveTaskData } from 'src/util/taskUtils';
import { loadQualityLayer } from 'src/util/map/utils';
import ResourceLayerStore from 'src/store/home/resourceLayerStore';
import { SUSPECT_LAYER, WRONG_LAYER } from 'src/config/dataLayerConfig';
import { editLock } from 'src/util/decorator';

@inject('appStore')
@inject('TaskStore')
@inject('CheckModeStore')
@inject('UpdStatModeStore')
@inject('DefineModeStore')
@inject('RenderModeStore')
@inject('QualityCheckStore')
@inject('OperateHistoryStore')
@observer
class QualityCheck extends React.Component {
    state = { visible: false };
    render() {
        const { visible } = this.state;
        const {
            appStore: { isProducer },
            TaskStore: { isEditableTask }
        } = this.props;
        if (isProducer) {
            return (
                <ToolIcon
                    icon="zhiliangjiancha1"
                    title="质量检查"
                    visible={visible}
                    disabled={!isEditableTask}
                    action={this.handleClick}
                />
            );
        } else {
            return null;
        }
    }

    save = async () => {
        const { OperateHistoryStore } = this.props;
        const { currentNode, savedNode } = OperateHistoryStore;
        const shouldSave = currentNode > savedNode;

        if (!shouldSave) return;
        await saveTaskData('check_server');
    };

    @editLock
    handleClick = () => {
        this.setState({ visible: true });
        this.checkModal(`是否质检当前任务`, this.taskCheck);
    };

    //无错质检结果提示
    checkModal = (content, handleOk) => {
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: handleOk,
            onCancel: () => {
                this.props.QualityCheckStore.cancelPolling();
                this.setState({ visible: false });
            }
        });
    };

    taskCheck = async () => {
        try {
            await this.save();

            const {
                QualityCheckStore: {
                    handleProducerGetReport,
                    openCheckReport,
                    closeCheckReport,
                    setActiveKey,
                    handleProducerCheck
                },
                TaskStore: { taskProcessName },
                UpdStatModeStore,
                RenderModeStore,
                DefineModeStore,
                CheckModeStore
            } = this.props;
            const { initVectorConfig } = DefineModeStore;

            closeCheckReport(); //关闭质检弹窗

            //质量检查
            const checkRes = await handleProducerCheck();
            if (!checkRes) throw new Error('质检失败');
            //轮询质检结果
            const reportList = await handleProducerGetReport();
            if (!reportList) throw new Error('获取检查列表失败');
            const reportListL = reportList.length;
            reportListL > 0
                ? this.checkModal(`质量检查结束，发现${reportListL}个错误，是否查看？`, () => {
                      setActiveKey('check');
                      openCheckReport();
                  })
                : this.checkModal(`质量检查结束，未发现数据问题`);
            // 如果是定点检修模式则更新页面检查图标
            const { activeMode } = RenderModeStore;
            if (activeMode == 'check') {
                UpdStatModeStore.clearUpdStatMode();
                initVectorConfig(activeMode, taskProcessName);
                CheckModeStore.initCheckMode();
            }

            this.setState({ visible: false });
            this.loadConfidenceFiles();
        } catch (e) {
            this.setState({ visible: false });
            console.error(e.message);
        }
    };

    async loadConfidenceFiles() {
        try {
            const { TaskStore } = this.props;
            const { activeTask } = TaskStore;
            const { processName, Input_imp_data_path } = activeTask;
            if (processName !== 'imp_manbuild' || processName !== 'imp_designated_repair') return;
            let suspectUrl = `${Input_imp_data_path}/18_QE_DATA/1809_QE_DES/AD_Suspect.geojson`;
            let wrongUrl = `${Input_imp_data_path}/18_QE_DATA/1809_QE_DES/AD_Wrong.geojson`;
            ResourceLayerStore.confidenceLayerRelease();
            let suspectLayer = await loadQualityLayer(suspectUrl, 'AD_Suspect');
            let wrongLayer = await loadQualityLayer(wrongUrl, 'AD_Wrong');
            ResourceLayerStore.addConfidenceLayer([
                { value: SUSPECT_LAYER, layer: suspectLayer, checked: true },
                { value: WRONG_LAYER, layer: wrongLayer, checked: true }
            ]);
        } catch (e) {
            console.error('置信度分区数据加载失败！');
        }
    }
}

export default QualityCheck;
