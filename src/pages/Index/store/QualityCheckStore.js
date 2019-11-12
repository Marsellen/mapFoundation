import { observable, configure, action, flow, computed } from 'mobx';
import QualityCheckService from 'src/pages/Index/service/QualityCheck';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';

configure({ enforceActions: 'always' });
class QualityCheckStore {
    @observable reportListInit = [];
    @observable reportList = [];
    @observable checkIdArr = [];
    @observable layerNameTextArr = [];
    @observable checkReportIsVisited = {};
    @observable checkReportVisible = false;

    @computed get isAllVisited() {
        return this.reportListInit.every(item => item.visited);
    }
    @computed get hasChecked() {
        return this.reportListInit.some(item => item.checked);
    }
    @computed get isAllChecked() {
        return this.reportListInit.every(item => item.checked);
    }
    @computed get reportListL() {
        return this.reportList.length;
    }

    @action openCheckReport = () => {
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.checkReportVisible = false;
    };

    @action clearCheckReport = () => {
        this.reportListInit = [];
        this.reportList = [];
        this.checkIdArr = [];
        this.layerNameTextArr = [];
        this.checkReportIsVisited = {};
    };

    //作业员质检
    producerCheck = flow(function*(option) {
        try {
            const { code, data, message } = yield QualityCheckService.check(
                option
            );
            if (code === 1) {
                return data;
            } else {
                message.warning(`${code} : ${message}`);
                return false;
            }
        } catch (e) {
            message.error(`请求失败 ${e}`);
        }
    }).bind(this);

    @action handleProducerCheck = flow(function*(option) {
        const data = yield this.producerCheck(option);
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
                try {
                    QualityCheckService.getReport(option)
                        .then(res => {
                            const { code, data, message } = res;
                            switch (code) {
                                case 1:
                                    this.handleReportRes(data, option.task_id);
                                    resolve && resolve(data);
                                    break;
                                case 201:
                                    this.pollingGetReport(option);
                                    break;
                                case 509:
                                    // message.warning(`${code} : 没有质检结果`);
                                    break;
                                default:
                                    message.warning(`${code} : ${message}`);
                                    resolve && resolve(false);
                                    break;
                            }
                        })
                        .catch(e => {
                            message.error(`请求失败 ${e}`);
                        });
                } catch (e) {
                    message.error(`请求失败 ${e}`);
                }
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
            const { checkId, layerName, misrepId } = item;
            const layerNameText =
                DATA_LAYER_MAP[layerName] && DATA_LAYER_MAP[layerName].label;
            checkIdObj[checkId] = checkId;
            layerNameObj[layerName] = layerNameText;
            item.index = index;
            item.visited = checkReport[index];
            item.layerNameText = layerNameText;
            item.ellipsis = true;
            // item.checked = misrepId ? true : false;
            return item;
        });

        this.reportListInit = data;
        this.reportList = data.concat();
        this.checkIdArr = Object.values(checkIdObj);
        this.layerNameTextArr = Object.values(layerNameObj);
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
        try {
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
        } catch (e) {
            message.error(`请求失败 ${e}`);
        }
    }).bind(this);

    //作业员删除一条误报
    @action producerDeleteMisreport = flow(function*(record, index, checked) {
        try {
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
        } catch (e) {
            message.error(`请求失败 ${e}`);
        }
    }).bind(this);

    @action handleQualityGetMisreport = flow(function*(option) {
        const data = yield this.qualityGetMisreport(option);
        this.handleReportRes(data, option.taskId);
    }).bind(this);

    //质检员查询误报
    qualityGetMisreport = flow(function*(option) {
        try {
            const { code, data } = yield QualityCheckService.getMisreport(
                option
            );
            if (code === 1) {
                return data;
            } else {
                message.warn('获取质检结果失败，请稍后重试');
            }
        } catch (e) {
            message.error(`请求失败 ${e}`);
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
        try {
            const { code } = yield QualityCheckService.updateMisreport(option);
            if (code === 1) {
                this.handleReportChecked(index, checked);
            } else {
                message.warning('请求失败，请稍后重试');
            }
        } catch (e) {
            message.error(`请求失败 ${e}`);
        }
    }).bind(this);
}

export default new QualityCheckStore();
