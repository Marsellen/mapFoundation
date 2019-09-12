import React from 'react';
import { Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import 'less/components/jobstatus.less';
import { ATTR_REL_DATA_SET } from 'src/config/RelsConfig';

@withRouter
@inject('appStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('taskStore')
@inject('RelStore')
@inject('AttrStore')
@observer
class JobStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qualityVisible: false };
        this.submitOption = { resultCode: 1 };
        this.passOption = { resultCode: 1, inspection_pass: 1 };
        this.repairOption = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 4
        };
        this.remadeOption = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 5
        };
    }

    render() {
        const { taskStore } = this.props;
        const { tasks } = taskStore;
        const { qualityVisible } = this.state;

        return (
            <div className="flex flex-center">
                <Button
                    disabled={tasks && tasks.length >= 5 ? true : false}
                    onClick={this.getJob}>
                    获取任务
                </Button>
                <Button onClick={this.submitTask}>提交任务</Button>
                <Modal
                    className="quality-sub"
                    title="当前任务是否通过质检？"
                    visible={qualityVisible}
                    footer={this.renderFooter()}
                    onCancel={this.closeQualityComfirm}></Modal>
            </div>
        );
    }

    // 获取
    getJob = async () => {
        const { taskStore, OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;

        if (shouldSave) {
            Modal.confirm({
                title: '提示',
                content: '当前任务未保存，是否自动保存',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.action();
                    await taskStore.initTask({ type: 2 });
                    taskStore.setActiveTask();
                    this.clearWorkSpace();
                }
            });
            return;
        }

        await taskStore.initTask({ type: 2 });
        const { tasks } = taskStore;
        if (tasks && tasks.length > 0) {
            message.success('获取完成', 3);
        }
        taskStore.setActiveTask();
        this.clearWorkSpace();
    };

    // 提交
    submitJob = option => {
        Modal.confirm({
            title: '提交任务',
            content: '是否提交当前任务',
            okText: '确定',
            cancelText: '取消',
            onOk: () => this.taskSubmit(option)
        });
    };

    taskSubmit = async option => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        const { taskStore } = this.props;
        // 自动保存
        if (shouldSave) {
            await this.action();
        }
        try {
            await taskStore.initSubmit(option);
            // 提交后重新获取任务
            await taskStore.initTask({ type: 3 });
            taskStore.setActiveTask();
            this.clearWorkSpace();
        } catch (e) {
            message.error(e.message, 3);
        }
    };

    // 自动保存
    action = async () => {
        const {
            taskStore,
            OperateHistoryStore,
            RelStore,
            AttrStore
        } = this.props;
        let vectorData = vectorLayerGroup.getAllVectorData();
        let attrRels = vectorData.features.filter(features =>
            ATTR_REL_DATA_SET.includes(features.name)
        );
        await Promise.all([RelStore.exportRel(), AttrStore.export()]).then(
            result => {
                let [rels, attrs] = result;
                let relData = {
                    features: attrRels.concat(rels),
                    type: 'FeatureCollection',
                    properties: vectorLayerGroup.properties
                };
                let attrData = {
                    features: attrs,
                    type: 'FeatureCollection',
                    properties: vectorLayerGroup.properties
                };
                taskStore
                    .submit({
                        vectorData,
                        relData,
                        attrData
                    })
                    .then(() => {
                        OperateHistoryStore.save();
                    });
            }
        );
    };

    clearWorkSpace = () => {
        const {
            taskStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        const { tasks } = taskStore;
        OperateHistoryStore.destroy();
        if (!tasks || tasks.length == 0) {
            message.warning('暂无任务', 3);
            return;
        }
        if (tasks && tasks.length > 1) {
            DataLayerStore.activeEditor();
            ToolCtrlStore.updateByEditLayer();
        }
    };

    renderFooter = () => {
        return (
            <div className="flex">
                <Button onClick={this.closeQualityComfirm}>取消</Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.passOption);
                        this.closeQualityComfirm();
                    }}>
                    质检通过
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.repairOption);
                        this.closeQualityComfirm();
                    }}>
                    任务返修
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.remadeOption);
                        this.closeQualityComfirm();
                    }}>
                    任务返工
                </Button>
            </div>
        );
    };

    submitTask = () => {
        const { appStore } = this.props;
        const { loginUser } = appStore;
        switch (loginUser.roleCode) {
            case 'quality':
                this.showQualityComfirm();
                break;
            default:
                this.submitJob(this.submitOption);
                break;
        }
    };

    showQualityComfirm = () => {
        this.setState({
            qualityVisible: true
        });
    };

    closeQualityComfirm = () => {
        this.setState({
            qualityVisible: false
        });
    };
}

export default JobStatus;
