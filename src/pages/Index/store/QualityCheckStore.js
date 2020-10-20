import { observable, configure, action, flow, computed } from 'mobx';
import CheckService from 'src/services/CheckService';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { REPORT_COLUMNS } from 'src/config/CheckTableConfig';
import Resize from 'src/utils/resize';
import _ from 'lodash';
import { getQualityChecked } from 'src/utils/permissionCtrl';
import sysProperties from 'src/models/sysProperties';
import { updateData } from 'src/utils/map/viewCtrl';
import TaskStore from 'src/pages/Index/store/TaskStore';

configure({ enforceActions: 'always' });
class QualityCheckStore {
    resize = new Resize();
    reportColumns;
    reportFilterKeys;
    pollingLimit; //轮询时间上限
    pollingInterval; //轮询间隔时间
    pollingStartTime; //轮询开始时间
    pollingStatus = true; //轮询状态

    @observable reportList = [];
    @observable filters = {};
    @observable checkReportIsVisited = {};
    @observable checkReportVisible = false;
    @observable tableHeight = 0;
    @observable activeKey = 'check';

    @computed get reportListL() {
        return this.reportList ? this.reportList.length : 0;
    }

    @action setActiveKey = activeKey => {
        this.activeKey = activeKey;
    };

    @action openCheckReport = () => {
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.checkReportVisible = false;
    };

    @action clearCheckReport = () => {
        this.reportList = [];
        this.checkReportIsVisited = {};
        this.filters = {};
    };

    initReportConfig = () => {
        const { taskProcessName = 'imp_recognition' } = TaskStore;
        this.reportColumns = REPORT_COLUMNS[taskProcessName];
        this.reportFilterKeys = this.reportColumns.flatMap(item => {
            return item.isFilter ? [item] : [];
        });
    };

    //作业员质检
    producerCheck = flow(function* (option) {
        try {
            const { data } = yield CheckService.check(option);
            return data;
        } catch (e) {
            console.error('请求失败');
            message.warning('质量检查失败：' + e.message, 3);
        }
    }).bind(this);

    @action handleProducerCheck = flow(function* (option) {
        const data = yield this.producerCheck(option);
        this.clearCheckReportStorage(option.task_id);
        return data;
    }).bind(this);

    @action handleProducerGetReport = option => {
        const { configs: { pollingLimit = 180, pollingInterval = 2 } = {} } = sysProperties || {};
        const currentTime = new Date();
        this.pollingLimit = pollingLimit * 1000;
        this.pollingInterval = pollingInterval * 1000;
        this.pollingStartTime = currentTime.getTime();
        this.pollingStatus = true;
        return new Promise(resolve => this.pollingGetReport(option, resolve));
    };

    //清除质检访问状态的缓存
    clearCheckReportStorage = activeTaskId => {
        AdLocalStorage.setTaskInfosStorage({
            taskId: activeTaskId,
            checkReport: {}
        });
    };

    //查询质检结果
    @action getReport = flow(function* (option) {
        try {
            const { data } = yield CheckService.getReport(option);
            this.handleReportList(data);
        } catch (e) {
            const errorMsg = e.message || '';
            console.error('获取报表失败 ' + errorMsg);
            errorMsg && message.warning('获取报表失败：' + errorMsg, 3);
        }
    }).bind(this);

    //取消轮询
    @action cancelPolling = () => {
        this.pollingStatus = false;
    };

    //检查轮询状态，pollingStatus=false表示取消轮询
    checkPollingStatus = resolve => {
        if (this.pollingStatus) return;
        resolve(false);
        return true;
    };

    //检查轮询用时，超过限制时间，则停止轮询
    checkPollingTime = resolve => {
        const currentTime = new Date();
        const pollingEndTime = currentTime.getTime();
        const pollingTotalTime = pollingEndTime - this.pollingStartTime;
        if (pollingTotalTime < this.pollingLimit) return;
        message.error('请求超时');
        resolve(false);
        return true;
    };

    //轮询质检结果
    @action pollingGetReport = (option, resolve) => {
        if (this.checkPollingStatus(resolve)) return;
        if (this.checkPollingTime(resolve)) return;
        setTimeout(
            () => {
                CheckService.getReport(
                    option,
                    async res => {
                        const { code, data, message: resMessage } = res;
                        switch (code) {
                            case 1:
                                this.handleReportList(data);
                                //人工构建任务且执行过自动修正的才会更新任务数据
                                if (TaskStore.taskProcessName === 'imp_manbuild') {
                                    const repairList = data.filter(item => item.repairStatus === 1);
                                    repairList.length > 0 && (await updateData());
                                }
                                resolve && resolve(data);
                                break;
                            case 201:
                            case 203:
                                this.pollingGetReport(option, resolve);
                                break;
                            default:
                                message.warning(`${code} : ${resMessage}`);
                                resolve && resolve(false);
                                break;
                        }
                    },
                    e => {
                        const errorMsg = e.message || '';
                        console.error('获取报表失败 ' + errorMsg);
                        errorMsg && message.warning('获取报表失败：' + errorMsg, 3);
                        resolve && resolve(false);
                    }
                );
            },
            this.pollingInterval //轮询间隔时间
        );
    };

    @action getResizeStyle = (tx, ty) => {
        this.resize.getStyle(tx, ty);
    };

    @action resizeCallback = result => {
        this.tableHeight = result && result.height - 155;
    };

    @action toResizeDom = () => {
        this.resize.addResizeEvent('quality-check-result-modal-wrap');
        this.resize.registerCallback(this.resizeCallback);
        this.getResizeStyle();
    };

    @action getFilters = filterMap => {
        const filters = {};
        Object.keys(filterMap).forEach(key => {
            filters[key] = filters[key] || [];
            filters[key] = Object.values(filterMap[key]);
        });
        this.filters = filters;
    };

    //处理质检结果数据
    @action handleReportList = list => {
        if (!list) return;
        if (list.length <= 0) {
            this.reportList = [];
            this.resize.addResizeEvent('quality-check-result-modal-wrap');
            this.getResizeStyle();
            this.filters = this.filters || {};
            return;
        }
        const { activeTaskId } = TaskStore;
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        const filterMap = {};
        list.map((item, index) => {
            const { repId } = item;
            if (!item.index) {
                item.index = index;
                item.visited = checkReport[repId] ? checkReport[repId] : false;
                item.ellipsis = true;
                item.checked = getQualityChecked(item);
            }
            item.misrepStatus = item.misrepId ? true : false;
            this.reportFilterKeys.map(column => {
                const { key, describe } = column;
                const currentVal = item[key];
                if (describe) {
                    const { data, secondKey, label, value } = describe;
                    const secondKeyStr = item[secondKey];
                    const descArr = secondKey ? data[secondKeyStr] : data;
                    const describeObj = descArr.find(desc => desc[value] === currentVal);
                    filterMap[key] = filterMap[key] || {};
                    filterMap[key][currentVal] = {
                        value: currentVal,
                        text: describeObj?.[label] ?? currentVal
                    };
                } else {
                    filterMap[key] = filterMap[key] || {};
                    filterMap[key][currentVal] = {
                        value: currentVal,
                        text: currentVal
                    };
                }
            });
            return item;
        });
        this.getFilters(filterMap);
        this.reportList = _.cloneDeep(list);
    };

    //记录访问状态
    @action visitedReport = (record, activeTaskId) => {
        const { index, repId } = record;
        this.reportList[index].visited = true;
        //访问状态记录在缓存中
        this.checkReportIsVisited[repId] = true;
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        AdLocalStorage.setTaskInfosStorage({
            taskId: activeTaskId,
            checkReport: { ...checkReport, ...this.checkReportIsVisited }
        });
        this.handleReportList(this.reportList);
    };

    //作业员新增一条误报
    @action producerInsertMisreport = flow(function* (record, index) {
        try {
            const { data } = yield CheckService.insertMisreport(record);
            this.reportList[index] = {
                ...this.reportList[index],
                ...data,
                checked: true
            };
            this.handleReportList(this.reportList);
        } catch (e) {
            console.error('请求失败');
            message.warning('新增误报请求失败：' + e.message, 3);
        }
    }).bind(this);

    //作业员删除一条误报
    @action producerDeleteMisreport = flow(function* (record, index) {
        try {
            yield CheckService.deleteMisreport(record);
            this.reportList[index] = {
                ...this.reportList[index],
                misrepId: null,
                checked: false
            };
            this.handleReportList(this.reportList);
        } catch (e) {
            console.error('请求失败');
            message.warning('删除误报请求失败：' + e.message, 3);
        }
    }).bind(this);

    //撤销一条误报的自动修正
    @action cancelRepairMisreport = flow(function* (option, index) {
        try {
            yield CheckService.cancelRepair(option);
            yield updateData();
            this.reportList[index].repairStatus = 0;
            this.handleReportList(this.reportList);
        } catch (e) {
            console.error('请求失败');
            message.warning('撤销自动修正请求失败：' + e.message, 3);
        }
    }).bind(this);

    @action handleQualityGetMisreport = flow(function* (option) {
        const data = yield this.qualityGetMisreport(option);
        this.handleReportList(data);
    }).bind(this);

    //质检员查询误报
    qualityGetMisreport = flow(function* (option) {
        try {
            const { data } = yield CheckService.getMisreport(option);
            return data;
        } catch (e) {
            console.error('请求失败');
            message.warning('质检员获取报表请求失败：' + e.message, 3);
        }
    });

    //质检员更新单条误报
    @action qualityUpdateMisreport = flow(function* (option, index) {
        try {
            yield CheckService.updateMisreport(option);
            this.reportList[index] = {
                ...this.reportList[index],
                status: option.status,
                checked: true
            };
            this.handleReportList(this.reportList);
        } catch (e) {
            console.error('请求失败');
            message.warning('更新报表请求失败：' + e.message, 3);
        }
    }).bind(this);
}

export default new QualityCheckStore();
