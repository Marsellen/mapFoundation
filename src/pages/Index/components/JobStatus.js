import React from 'react';
import { Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import editLog from 'src/models/editLog';
import 'less/components/jobstatus.less';
import ToolIcon from 'src/components/ToolIcon';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { saveTaskDate } from 'src/utils/taskUtils';

const MANUALSTATUS = {
    4: '返修',
    5: '返工'
};

@withRouter
@inject('QCMarkerStore')
@inject('RenderModeStore')
@inject('QualityCheckStore')
@inject('appStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('TaskStore')
@inject('RelStore')
@inject('AttrStore')
@inject('AttributeStore')
@inject('PictureShowStore')
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
        const { TaskStore } = this.props;
        const {
            activeTask: { isLocal, taskId }
        } = TaskStore;
        const { qualityVisible } = this.state;

        return (
            <div className="flex flex-center jobstatus">
                <ToolIcon
                    icon="huoqurenwu"
                    title="获取任务"
                    className="jobstatus-get"
                    focusColor={false}
                    action={this.getJob}
                />
                {!isLocal && (
                    <ToolIcon
                        icon="tijiaorenwu"
                        title="提交任务"
                        className="jobstatus-submit"
                        disabled={taskId ? false : true}
                        focusColor={false}
                        action={this.submitTask}
                    />
                )}
                <Modal
                    className="quality-sub"
                    title="当前任务是否通过质检？"
                    visible={qualityVisible}
                    footer={this.renderFooter()}
                    onCancel={this.closeQualityComfirm}
                ></Modal>
            </div>
        );
    }

    // 获取
    getJob = async () => {
        const { OperateHistoryStore } = this.props;
        let { currentNode, savedNode } = OperateHistoryStore;
        let shouldSave = currentNode > savedNode;

        if (shouldSave) {
            return Modal.confirm({
                title: '提示',
                content: '当前任务未保存，是否自动保存',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.action();
                    await this.fetchTask();
                }
            });
        }
        await this.fetchTask();
    };

    fetchTask = async () => {
        const { TaskStore } = this.props;
        let { tasks: oldTasks } = TaskStore;
        oldTasks = oldTasks || [];
        let result = await TaskStore.initTask({ type: 2 });

        if (!result) return;

        if (result.overLimit) {
            message.warning('任务已达领取上限', 3);
            return;
        }

        if (oldTasks.length > 0) {
            this.clearWorkSpace();
        }

        const { tasks } = TaskStore;
        if (!tasks) return;
        if (oldTasks.length == tasks.length) {
            message.warning('暂无新任务', 3);
            return;
        } else {
            message.success('成功获取任务', 3);
        }
    };

    // 提交
    submitJob = option => {
        Modal.confirm({
            title: '提交任务',
            content: '是否提交当前任务',
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: () => this.handleTaskSubmit(option),
            onCancel: this.props.QualityCheckStore.cancelPolling
        });
    };

    //质量检查
    check = async () => {
        const { QualityCheckStore, TaskStore, appStore } = this.props;
        const {
            handleProducerCheck,
            handleProducerGetReport,
            closeCheckReport,
            clearCheckReport
        } = QualityCheckStore;
        const { activeTask } = TaskStore;
        const { taskId, processName, projectId } = activeTask;
        const { loginUser } = appStore;
        const { roleCode, username } = loginUser;

        clearCheckReport(); //重置质检列表
        closeCheckReport(); //关闭质检弹窗

        //质量检查
        const checkRes = await handleProducerCheck({
            task_id: taskId,
            process_name: processName,
            project_id: projectId,
            data_path: taskId,
            user_name: username,
            user_type: roleCode
        });
        if (!checkRes) return false;
        return await handleProducerGetReport({ task_id: taskId });
    };

    //质检有报表提示
    hasReportModal = content => {
        const { QualityCheckStore } = this.props;
        const { openCheckReport, setActiveKey } = QualityCheckStore;
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '确定',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: () => {
                setActiveKey('check');
                openCheckReport();
            }
        });
    };

    //质检无报表提示
    noReportModal = (content, option) => {
        Modal.confirm({
            title: '质检提示',
            content,
            okText: '提交',
            cancelText: '取消',
            autoFocusButton: null,
            onOk: () => this.taskSubmit(option)
        });
    };

    qualityCheckTask = async option => {
        const reportList = await this.check();
        if (!reportList) return false;
        const reportListL = reportList.length;
        if (reportListL > 0) {
            const modalContent = `质量检查结束，发现${reportListL}个错误，是否查看？`;
            this.hasReportModal(modalContent);
        } else {
            const modalContent = `质量检查结束，未发现数据问题，任务可正常提交`;
            this.noReportModal(modalContent, option);
        }
        return false;
    };

    //判断生产任务是否满足提交条件 processName='imp_recognition','imp_manbuild'
    checkProdutionTask = async (manualStatus, option) => {
        const {
            QualityCheckStore: { reportListInit },
            QCMarkerStore: { markerList }
        } = this.props;
        const isAllVisited = reportListInit.every(item => item.visited);
        switch (manualStatus) {
            case 1: //已领取
            case 2: //进行中
                if (!isAllVisited) {
                    message.warning(`存在未查看的检查项，当前任务不允许提交`);
                    return false;
                }
                return await this.qualityCheckTask(option);
            case 4: //返修
            case 5: //返工
                const markerStatusIsValid = markerList.every(item => {
                    return item.fixStatus === 2 || item.fixStatus === 3;
                });
                if (!isAllVisited && markerStatusIsValid) {
                    message.warning(`存在未查看的检查项，当前任务不允许提交`);
                    return false;
                }
                if (isAllVisited && !markerStatusIsValid) {
                    message.warning(`存在未确认的质检标注，当前任务不允许提交`);
                    return false;
                }
                if (!(isAllVisited || markerStatusIsValid)) {
                    message.warning(`存在未确认的质检标注与检查项，当前任务不允许提交`);
                    return false;
                }
                return await this.qualityCheckTask(option);
        }
    };

    //判断质检任务是否满足提交条件 processName='imp_check_after_recognition','imp_check_after_manbuild'
    checkQualityCheckTask = async manualStatus => {
        const {
            QualityCheckStore: { reportListInit },
            QCMarkerStore: { markerList, updateMarkerStatus }
        } = this.props;
        switch (manualStatus) {
            case 4: //提交成“返修”
            case 5: //提交成“返工”
                const { TaskStore: { activeTask: { taskId } = {} } = {} } = this.props;
                const result = await updateMarkerStatus({ taskId });
                return result ? true : false;
            default:
                //提交成“通过”
                const checkStatusIsValid = reportListInit.every(item => {
                    return item.status === 2 || item.status === 4;
                });
                const markerStatusIsValid = markerList.every(item => {
                    return item.qcStatus === 2 || item.qcStatus === 3;
                });
                if (!checkStatusIsValid && markerStatusIsValid) {
                    message.warning(`存在未确认的检查项，当前任务不允许提交`);
                    return false;
                }
                if (checkStatusIsValid && !markerStatusIsValid) {
                    message.warning(`存在未确认的质检标注，当前任务不允许提交`);
                    return false;
                }
                if (!(checkStatusIsValid || markerStatusIsValid)) {
                    message.warning(`存在未确认的质检标注与检查项，当前任务不允许提交`);
                    return false;
                }
                return true;
        }
    };

    handleCheck = async option => {
        const { TaskStore: { activeTask: { processName, manualStatus } } = {} } = this.props;
        switch (processName) {
            case 'imp_recognition': //人工识别
            case 'imp_manbuild': //人工构建
                return this.checkProdutionTask(manualStatus, option);
            case 'imp_check_after_recognition': //人工识别后质检
            case 'imp_check_after_manbuild': //人工构建后质检
                return this.checkQualityCheckTask(option.manualStatus);
            default:
                return true;
        }
    };

    handleTaskSubmit = async option => {
        const { OperateHistoryStore } = this.props;
        const { currentNode, savedNode } = OperateHistoryStore;
        const shouldSave = currentNode > savedNode;

        //第一步：保存
        if (shouldSave) {
            await this.action();
        }

        //第二步：判断任务是否满足提交条件
        const res = await this.handleCheck(option);
        if (!res) return false;

        //第三步：提交
        this.taskSubmit(option);
    };

    taskSubmit = async option => {
        const {
            TaskStore,
            QCMarkerStore,
            RenderModeStore,
            appStore: { loginUser: { roleCode } } = {},
            QualityCheckStore: { clearCheckReport, closeCheckReport }
        } = this.props;

        try {
            await TaskStore.initSubmit(option);
            await TaskStore.setActiveTask();
            RenderModeStore.setMode('common');
            this.clearWorkSpace();
            message.success('提交成功');

            //质检员在任务提交成功时，重置质检列表并关闭质检弹窗
            if (roleCode === 'quality') {
                clearCheckReport();
                closeCheckReport();
            }

            //清除质检标注相关数据
            QCMarkerStore.release();

            // 获取新任务，更新任务列表
            await TaskStore.initTask({ type: 3 });

            // 更新任务列表后，清除浏览器缓存中多余任务信息
            AdLocalStorage.filterTaskInfosStorage(TaskStore.taskIdList);
        } catch (e) {
            message.warning('提交失败：' + e.message, 3);
        }
    };

    // 自动保存
    action = async () => {
        await saveTaskDate();
    };

    clearWorkSpace = () => {
        const {
            OperateHistoryStore,
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            PictureShowStore
        } = this.props;
        OperateHistoryStore.destroy();
        editLog.store.clear();
        DataLayerStore.activeEditor();
        ToolCtrlStore.updateByEditLayer();
        AttributeStore.hide();
        PictureShowStore.hide();
        PictureShowStore.destory();

        //切换任务 关闭所有弹框
        document.querySelectorAll('.ant-modal-close').forEach(element => {
            element.click();
        });
    };

    renderFooter = () => {
        return (
            <div className="flex">
                <Button onClick={this.closeQualityComfirm}>取消</Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.passOption);
                        this.closeQualityComfirm();
                    }}
                >
                    质检通过
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.repairOption);
                        this.closeQualityComfirm();
                    }}
                >
                    任务返修
                </Button>
                <Button
                    onClick={() => {
                        this.submitJob(this.remadeOption);
                        this.closeQualityComfirm();
                    }}
                >
                    任务返工
                </Button>
            </div>
        );
    };

    submitTask = e => {
        e || e.target || e.target.blur(); //在click事件中主动去掉button的焦点，回车就不会触发click
        const { appStore } = this.props;
        const { loginUser } = appStore;
        if (loginUser.roleCode === 'quality') {
            return this.showQualityComfirm();
        } else {
            return this.submitJob(this.submitOption);
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
