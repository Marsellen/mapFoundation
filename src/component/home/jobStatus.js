import React from 'react';
import { Modal, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import editLog from 'src/util/editLog';
import ToolIcon from 'src/component/common/toolIcon';
import AdLocalStorage from 'src/util/adLocalStorage';
import { saveTaskData } from 'src/util/taskUtils';
import { editLock } from 'src/util/decorator';
import BuriedPoint from 'src/util/buriedPoint';
import SettingStore from 'src/store/setting/settingStore';
import { VECTOR_FILES, ATTR_FILES, REL_FILES, REGION_FILES } from 'src/config/taskConfig';
import VectorsStore from 'src/store/home/vectorsStore';
import RelStore from 'src/store/home/relStore';
import AttrStore from 'src/store/home/attrStore';
import 'less/jobstatus.less';
import { lineToStop } from 'src/util/relCtrl/operateCtrl';

import { flow } from 'mobx';

import {
    getAllVectorData,
    getAllRelData,
    getAllAttrData
} from 'src/util/vectorUtils';

@withRouter
@inject('QCMarkerStore')
@inject('RenderModeStore')
@inject('QualityCheckStore')
@inject('appStore')
@inject('OperateHistoryStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('TaskStore')
// @inject('RelStore')
// @inject('AttrStore')
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
                    title="导入数据"
                    className="jobstatus-get"
                    focusColor={false}
                    action={this.getJob}
                />
                {!isLocal && (
                    <ToolIcon
                        icon="tijiaorenwu"
                        title="导出数据"
                        className="jobstatus-submit"
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
    impConfig() {
        let formCreate = document.getElementById("fileName");
        if (formCreate) {
            formCreate.removeChild(document.getElementById("file"));
            document.body.removeChild(formCreate);
        }
        let form = document.createElement('form');
        // form.style.display = 'none';
        form.id = "fileName";
        document.body.appendChild(form);
        let fileInput = document.createElement('input');
        fileInput.id = 'file';
        fileInput.multiple = true;
        fileInput.type = 'file';
        fileInput.addEventListener('change', function () {
            let files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsText(files[i]);
                reader.onload = (data) => {
                    try {
                        const result = JSON.parse(data.target.result);
                        const name = result.name;
                        let allLayer = [...VECTOR_FILES, ...ATTR_FILES, ...REL_FILES];
                        let layer = allLayer.includes(name);
                        if (layer) {
                            let vec = VECTOR_FILES.includes(name);
                            if (vec) {
                                VectorsStore.addRecords(null, 'current', result);
                            }
                            let attr = ATTR_FILES.includes(name);
                            if (attr) {
                                AttrStore.addRecords(null, 'current', result);
                            }
                            let rel = REL_FILES.includes(name);
                            if (rel) {
                                RelStore.addRecords(null, 'current', result);
                            }
                        }
                        else {
                            // VectorsStore.addRecords(null, 'boundary', result);
                        }
                        const extent = window.map.getExtentByFeatures(result.features);
                        window.map.setExtent(extent);
                    } catch (error) {
                    }
                };
            }
        });
        form.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(form);
    };
    // 获取
    getJob = async () => {
        this.impConfig();
        // const { OperateHistoryStore } = this.props;
        // let { currentNode, savedNode } = OperateHistoryStore;
        // let shouldSave = currentNode > savedNode;

        // if (shouldSave) {
        //     return Modal.confirm({
        //         title: '提示',
        //         content: '当前任务未保存，是否自动保存',
        //         okText: '确定',
        //         cancelText: '取消',
        //         maskStyle: { zIndex: 99999999 },
        //         zIndex: 999999999,
        //         onOk: async () => {
        //             await this.action();
        //             await this.fetchTask();
        //         }
        //     });
        // }
        // await this.fetchTask();
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
        const { QualityCheckStore } = this.props;
        const { closeCheckReport, handleProducerCheck, handleProducerGetReport } =
            QualityCheckStore;
        closeCheckReport(); //关闭质检弹窗
        //质量检查
        const checkRes = await handleProducerCheck();
        if (!checkRes) return false;
        return await handleProducerGetReport();
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

    checkReport = async option => {
        const { reportList } = this.props.QualityCheckStore;
        const isAllVisited = reportList.every(item => item.visited);
        if (!isAllVisited) {
            message.warning(`存在未查看的检查项，当前任务不允许提交`);
            return false;
        }
        return await this.qualityCheckTask(option);
    };

    checkReportAndMarker = async option => {
        const {
            QualityCheckStore: { reportList },
            QCMarkerStore: { markerList }
        } = this.props;
        const isAllVisited = reportList.every(item => item.visited);
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
    };

    //判断人工识别任务是否满足提交条件
    checkMsTask = async (manualStatus, option) => {
        switch (manualStatus) {
            case 1: //已领取
            case 2: //进行中
                return await this.checkReport(option);
            case 4: //返修
            case 5: //返工
                return await this.checkReportAndMarker(option);
        }
    };

    //判断人工构建任务是否满足提交条件
    checkMbTask = async option => {
        return await this.checkReportAndMarker(option);
    };

    //判断质检任务是否满足提交条件 processName='imp_check_after_recognition','imp_check_after_manbuild'
    checkQcTask = async manualStatus => {
        const {
            QualityCheckStore: { reportList },
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
                const checkStatusIsValid = reportList.every(item => {
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
            case 'imp_std_precompile_man_repair': //编译预处理人工检修
                return this.checkMsTask(manualStatus, option);

            case 'imp_manbuild': //人工构建
            case 'imp_designated_repair': // 定点检修
                return this.checkMbTask(option);

            case 'imp_check_after_recognition': //人工识别后质检
            case 'imp_check_after_manbuild': //人工构建后质检
            case 'imp_map_second_check': //二次质检
                return this.checkQcTask(option.manualStatus);
            default:
                return true;
        }
    };

    handleTaskSubmit = async option => {
        const { OperateHistoryStore, TaskStore } = this.props;
        const { currentNode, savedNode } = OperateHistoryStore;
        const { activeTask } = TaskStore;
        const shouldSave = currentNode > savedNode;
        const notAllowSave = SettingStore.getConfig('OTHER_CONFIG')?.notAllowSaveNodeList.find(
            i => i == activeTask.processName
        );

        //第一步：保存 （满足条件：有修改 且 属于可修改环节）
        if (shouldSave && !notAllowSave) {
            await this.action();
        }

        //第二步：判断任务是否满足提交条件
        const res = await this.handleCheck(option);
        if (!res) return false;

        //第三步：提交
        this.taskSubmit(option);
    };

    taskSubmit = async option => {
        const { TaskStore, QCMarkerStore } = this.props;

        try {
            await BuriedPoint.buriedPointEnd('submit_task');
            await TaskStore.initSubmit(option);
            await TaskStore.setActiveTask();
            this.clearWorkSpace();
            message.success('提交成功');
            // 清除质检标注相关数据
            QCMarkerStore.release();
            // 获取新任务，更新任务列表
            await TaskStore.initTask({
                type: SettingStore.getConfig('OTHER_CONFIG')?.autoGetTask ? 3 : 4
            });
            // 更新任务列表后，清除浏览器缓存中多余任务信息
            AdLocalStorage.filterTaskInfosStorage(TaskStore.taskIdList);
        } catch (e) {
            message.warning('提交失败：' + e.message, 3);
        }
    };

    // 自动保存
    action = async () => {
        await saveTaskData('submit_task');
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
        AttributeStore.hide('other_close');
        PictureShowStore.hide();
        PictureShowStore.destory();
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

    // @editLock
    submitTask = flow(function* () {
        let vectorData = getAllVectorData(true);
        // 删除不符合规则的字段
        let vectorDataClone = JSON.parse(JSON.stringify(vectorData));
        if (vectorDataClone) {
            vectorDataClone?.features.forEach(feature => {
                if (feature.name === 'AD_Lane') {
                    feature.features.forEach(item => {
                        if (item?.properties?.RS_VALUE !== undefined) {
                            delete item.properties.RS_VALUE;
                        }
                        if (item?.properties?.SPEED !== undefined) {
                            delete item.properties.SPEED;
                        }
                    });
                }
            });
        }

        let relData = yield getAllRelData(true);
        let attrData = yield getAllAttrData(true);
        const allData = [...vectorDataClone.features, ...relData.features, ...attrData.features];
        console.log(allData)
        let isAllData = [];
        allData.forEach(item => {
            if (item.features.length > 0) {
                if (isAllData[item.name] === undefined) {
                    isAllData[item.name] = true;
                    const link = document.createElement("a");
                    link.style.display = "none";
                    link.setAttribute("download", item.name);
                    document.body.appendChild(link);
                    let blob = new Blob([JSON.stringify(item)], { type: 'text/plain' });
                    link.href = URL.createObjectURL(blob);
                    link.download = item.name + '.geojson';
                    link.click();
                    link.remove();
                }

            }
        });



        // e || e.target || e.target.blur(); //在click事件中主动去掉button的焦点，回车就不会触发click
        // const { appStore } = this.props;
        // const { loginUser } = appStore;
        // if (loginUser.roleCode === 'quality') {
        //     return this.showQualityComfirm();
        // } else {
        //     return this.submitJob(this.submitOption);
        // }
    });
    //获取当前所有图层名，合并到文件列表中，合成新的文件列表
    getFileNameList = (vectorData, relData, attrData) => {
        const allData = [...vectorData.features, ...relData.features, ...attrData.features];
        const newFileNameList = allData.map(item => item.name + '.geojson');
        const allFileNameList = [...newFileNameList, ...this.taskFileNames];
        const fileNameList = [...new Set(allFileNameList)];
        return fileNameList;
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
