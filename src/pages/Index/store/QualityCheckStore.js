import { observable, configure, action, flow, computed } from 'mobx';
import QualityCheckService from 'src/pages/Index/service/QualityCheck';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';

configure({ enforceActions: 'always' });
class QualityCheckStore {
    @observable reportListInit = [];
    @observable reportList = [];
    @observable batchId;
    @observable checkIdArr = [];
    @observable layerNameArr = [];
    @observable checkReportIsVisited = {};
    @observable checkReportVisible = false;
    @computed get isAllVisited() {
        return this.reportListInit.every(item => item.visited);
    }
    @computed get hasChecked() {
        return this.reportListInit.some(item => item.checked);
    }

    @action openCheckReport = () => {
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.checkReportVisible = false;
    };

    //作业员质检
    producerCheck = flow(function*(option) {
        const { code, data, message } = yield QualityCheckService.check(option);
        if (code === 1) {
            return data;
        } else {
            message.warning(`${code} : ${message}`);
            return false;
        }
    }).bind(this);

    @action handleProducerCheck = flow(function*(option) {
        const data = yield this.producerCheck(option);
        this.batchId = data.batch_id;
        this.clearCheckReportStorage(option.task_id);
        return data;
    }).bind(this);

    @action handleProducerGetReport = option => {
        return new Promise(resolve => this.pollingGetReport(option, resolve));
    };

    //清除质检访问状态的缓存
    clearCheckReportStorage = activeTaskId => {
        AdLocalStorage.setTaskInfosStorage({
            taskId: activeTaskId,
            checkReport: {}
        });
    };

    //轮询质检结果
    @action pollingGetReport = (option, resolve) => {
        return setTimeout(
            (() => {
                QualityCheckService.getReport(option).then(res => {
                    const { code, data, message } = res;
                    switch (code) {
                        case 1:
                            this.handleReportRes(data, option.task_id);
                            resolve && resolve(data);
                            break;
                        case 201:
                            this.pollingGetReport(option);
                            break;
                        default:
                            message.warning(`${code} : ${message}`);
                            resolve && resolve(false);
                            break;
                    }
                });
            }).bind(this),
            1000
        );
    };

    //筛选质检结果数据
    @action checkFilter = (dataIndex, checkedList) => {
        this.reportList = this.reportListInit.filter(item => {
            if (checkedList.includes(item[dataIndex])) return true;
        });
    };

    //全选筛选质检结果数据
    @action checkAllFilter = checked => {
        this.reportList = checked ? this.reportListInit.concat() : [];
    };

    //处理质检结果数据
    @action handleReportRes = (data, activeTaskId) => {
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(
            activeTaskId
        );
        const checkIdObj = {};
        const layerNameObj = {};

        data.map((item, index) => {
            const { checkId, layerName } = item;
            checkIdObj[checkId] = checkId;
            layerNameObj[layerName] = layerName;
            item.index = index;
            item.visited = checkReport[index];
            return item;
        });

        this.reportListInit = data;
        this.reportList = data.concat();
        this.checkIdArr = Object.values(checkIdObj);
        this.layerNameArr = Object.values(layerNameObj);
    };

    //记录访问状态
    @action visitedReport = (index, activeTaskId) => {
        this.reportList[index] = {
            ...this.reportList[index],
            visited: true
        };
        this.reportListInit[index] = {
            ...this.reportListInit[index],
            visited: true
        };
        this.checkReportIsVisited[index] = {
            visited: true
        };
        //访问状态记录在缓存中
        const { checkReport } = AdLocalStorage.getTaskInfosStorage(
            activeTaskId
        );
        AdLocalStorage.setTaskInfosStorage({
            taskId: activeTaskId,
            checkReport: { ...checkReport, ...this.checkReportIsVisited }
        });
    };

    //作业员新增一条误报
    @action producerInsertMisreport = flow(function*(record, index, checked) {
        const { code, data } = yield QualityCheckService.insertMisreport(
            record
        );
        if (code === 1) {
            this.reportListInit[index] = {
                ...this.reportListInit[index],
                ...data
            };
            this.reportList = this.reportListInit.concat();
            this.handleReportChecked(index, checked);
        } else {
            message.warning('请求失败，请稍后重试');
        }
    }).bind(this);

    //作业员删除一条误报
    @action producerDeleteMisreport = flow(function*(record, index, checked) {
        const { code } = yield QualityCheckService.deleteMisreport(record);
        if (code === 1) {
            this.reportListInit[index] = {
                ...this.reportListInit[index],
                misrepId: null
            };
            this.reportList = this.reportListInit.concat();
            this.handleReportChecked(index, checked);
        } else {
            message.warning('请求失败，请稍后重试');
        }
    }).bind(this);

    @action handleQualityGetMisreport = flow(function*(option) {
        const data = yield this.qualityGetMisreport(option);
        this.handleReportRes(data, option.taskId);
    }).bind(this);

    //质检员查询误报
    qualityGetMisreport = flow(function*(option) {
        const { code, data } = yield QualityCheckService.getMisreport(option);
        if (code === 1) {
            return data;
        } else {
            message.warn('获取质检结果失败，请稍后重试');
        }
    });

    handleReportChecked = (index, checked) => {
        this.reportListInit[index] = {
            ...this.reportListInit[index],
            checked: checked
        };
        this.reportList = this.reportListInit.concat();
    };

    //质检员更新单条误报
    @action qualityUpdateMisreport = flow(function*(option, index, checked) {
        const { code } = yield QualityCheckService.updateMisreport(option);
        if (code === 1) {
            this.handleReportChecked(index, checked);
        } else {
            message.warning('请求失败，请稍后重试');
        }
    }).bind(this);
}

export default new QualityCheckStore();
