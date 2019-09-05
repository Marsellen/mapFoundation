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
        this.state = { visible: false };
        this.listParam = { type: 3 };
        this.submitResult = { resultCode: 1 };
        this.passResult = { resultCode: 1, inspection_pass: 1 };
        this.repairResult = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 4
        };
        this.remadeResult = {
            resultCode: 1,
            inspection_pass: 0,
            manualStatus: 5
        };
    }

    // 获取
    getJob = shouldSave => {
        const { taskStore } = this.props;

        if (shouldSave) {
            this.action();
        }
        
        taskStore.initTask({ type: 2 }).then(() => {
            this.openMap();
        });
    };

    openMap = () => {
        const { taskStore } = this.props;
        const { workData } = taskStore;
        const firstTaskValues = taskStore.getFirstTaskValues();
        
        if (firstTaskValues) {
            taskStore.load(firstTaskValues);
            if (workData && workData.length > 0) {
                this.clearWorkSpace();
            } else {
                message.warning('暂无任务', 3);
            }
        }
    }

    // 提交
    submitJob = (submitResult, shouldSave, visible) => {
        if (!visible) {
            Modal.confirm({
                title: '提交任务',
                content: '是否提交当前任务',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.taskSubmit(submitResult, shouldSave);
                }
            });
        } else {
            this.taskSubmit(submitResult, shouldSave, visible);
        }
    };

    taskSubmit = (submitResult, shouldSave, visible) => {
        const { taskStore } = this.props;
        const firstTaskValues = taskStore.getFirstTaskValues();
        // 自动保存
        if (shouldSave) {
            this.action();
        }
        taskStore.submitTask(submitResult, this.listParam);
        if (visible) {
            this.setState({
                visible: false
            });
        }
        taskStore.load(firstTaskValues).then(() => {
            this.clearWorkSpace();
        });
    };

    // 自动保存
    action = () => {
        const {
            taskStore,
            OperateHistoryStore,
            RelStore,
            AttrStore
        } = this.props;
        let vectorData = map.getLayerManager().getAllVectorData();
        let attrRels = vectorData.features.filter(features =>
            ATTR_REL_DATA_SET.includes(features.name)
        );
        Promise.all([RelStore.exportRel(), AttrStore.export()]).then(result => {
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
        });
    };

    // 默认打开
    clearWorkSpace = () => {
        const {
            taskStore,
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore
        } = this.props;
        const { workData } = taskStore;
        OperateHistoryStore.destroy();
        if (workData && workData.length > 1) {
            DataLayerStore.activeEditor();
            ToolCtrlStore.updateByEditLayer();
        }
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    renderFooter = () => {
        const { OperateHistoryStore } = this.props;
        const { visible } = this.state;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        return (
            <div id="quality" className="flex">
                <Button onClick={this.handleCancel}>取消</Button>
                <Button
                    onClick={() =>
                        this.submitJob(this.passResult, shouldSave, visible)
                    }>
                    质检通过
                </Button>
                <Button
                    onClick={() =>
                        this.submitJob(this.repairResult, shouldSave, visible)
                    }>
                    任务返修
                </Button>
                <Button
                    onClick={() =>
                        this.submitJob(this.remadeResult, shouldSave, visible)
                    }>
                    任务返工
                </Button>
            </div>
        );
    };

    render() {
        const { appStore, taskStore, OperateHistoryStore } = this.props;
        const { workData } = taskStore;
        const { loginUser } = appStore;
        const { visible } = this.state;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;
        console.log('this.props:', this.props);

        return (
            <div className="flex flex-center">
                <Button
                    disabled={workData && workData.length >= 5 ? true : false}
                    onClick={() => this.getJob(shouldSave)}>
                    获取任务
                </Button>
                <Button
                    onClick={
                        loginUser.roleCode === 'quality'
                            ? this.showModal
                            : () =>
                                  this.submitJob(this.submitResult, shouldSave)
                    }>
                    提交任务
                </Button>
                <Modal
                    className="qualitySub"
                    title="当前任务是否通过质检？"
                    visible={visible}
                    footer={this.renderFooter()}
                    onCancel={this.handleCancel}></Modal>
            </div>
        );
    }
}

export default JobStatus;
