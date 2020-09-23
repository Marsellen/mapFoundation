import { observable, configure, action, flow, computed } from 'mobx';
import CheckService from 'src/services/CheckService';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import Resize from 'src/utils/resize';
import _ from 'lodash';
import { getQualityChecked } from 'src/utils/permissionCtrl';
import sysProperties from 'src/models/sysProperties';
import { updateData } from 'src/utils/map/viewCtrl';
import TaskStore from 'src/pages/Index/store/TaskStore';

const needFilterColumns = (() => {
    const columns = [];
    COLUMNS_CONFIG.forEach(item => {
        item.isFilter && columns.push(item.dataIndex);
    });
    return columns;
})();

configure({ enforceActions: 'always' });
class QualityCheckStore {
    resize = new Resize();
    pollingLimit; //轮询时间上限
    pollingInterval; //轮询间隔时间
    pollingStartTime; //轮询开始时间
    pollingStatus = true; //轮询状态

    @observable updateKey;
    @observable reportListInit = null;
    @observable reportList = null;
    @observable filterOption = {};
    @observable checkReportIsVisited = {};
    @observable checkReportVisible = false;
    @observable tableHeight = 0;
    @observable activeKey = 'check';

    @computed get hasChecked() {
        return this.reportListInit.some(item => item.checked);
    }
    @computed get reportListL() {
        return this.reportList ? this.reportList.length : 0;
    }

    @action setActiveKey = activeKey => {
        this.activeKey = activeKey;
    };

    @action openCheckReport = () => {
        this.filterOption.isUpdate = true;
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.filterOption.isUpdate = false;
        this.checkReportVisible = false;
    };

    @action clearCheckReport = () => {
        this.reportListInit = [];
        this.reportList = [];
        this.checkReportIsVisited = {};
        this.filterOption = {};
        this.updateKey = Math.random();
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
            this.handleReportRes(data, option.task_id);
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
                                this.handleReportRes(data, option.task_id);
                                const { taskProcessName } = TaskStore;
                                if (taskProcessName === 'imp_manbuild') await updateData();
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
        this.tableHeight = result && result.height - 135;
    };

    @action toResizeDom = () => {
        this.resize.addResizeEvent('quality-check-result-modal-wrap');
        this.resize.registerCallback(this.resizeCallback);
        this.getResizeStyle();
    };

    //处理质检结果数据
    @action handleReportRes = (data, activeTaskId) => {
        if (!data) return;
        if (data.length <= 0) {
            this.reportListInit = [];
            this.reportList = [];
            this.resize.addResizeEvent('quality-check-result-modal-wrap');
            this.getResizeStyle();
            this.filterOption = this.filterOption || {};
            this.filterOption.isUpdate = true;
            this.updateKey = Math.random();
            return;
        }
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        const filterOption = {};

        data.map((item, index) => {
            const { layerName, repId } = item;
            const layerNameText = DATA_LAYER_MAP[layerName] && DATA_LAYER_MAP[layerName].label;
            item.index = index;
            item.visited = checkReport[repId] ? checkReport[repId] : false;
            item.visitedText = item.visited ? '已查看' : '未查看';
            item.layerNameText = layerNameText;
            item.ellipsis = true;
            item.checked = getQualityChecked(item);

            needFilterColumns.map(column => {
                filterOption[`${column}Obj`] = filterOption[`${column}Obj`] || {};
                if (item[column]) {
                    filterOption[`${column}Obj`][item[column]] = item[column];
                }
            });

            return item;
        });

        needFilterColumns.map(column => {
            filterOption[`${column}Arr`] = filterOption[`${column}Arr`] || [];
            filterOption[`${column}Arr`] = Object.values(
                filterOption[`${column}Obj`]
            ).map(filterItem => ({ text: filterItem, value: filterItem }));
        });

        filterOption.visitedTextArr = [
            { text: '未查看', value: '未查看' },
            { text: '已查看', value: '已查看' }
        ];
        filterOption.isUpdate = true;
        this.filterOption = { ...filterOption };
        this.reportListInit = data;
        this.reportList = _.cloneDeep(data);
        this.updateKey = Math.random();
    };

    //记录访问状态
    @action visitedReport = (record, activeTaskId) => {
        const { index, repId } = record;
        this.reportList[index] = {
            ...this.reportList[index],
            visited: true,
            visitedText: '已查看'
        };
        this.reportListInit[index] = {
            ...this.reportListInit[index],
            visited: true,
            visitedText: '已查看'
        };
        this.checkReportIsVisited[repId] = true;
        //访问状态记录在缓存中
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        AdLocalStorage.setTaskInfosStorage({
            taskId: activeTaskId,
            checkReport: { ...checkReport, ...this.checkReportIsVisited }
        });
    };

    //作业员新增一条误报
    @action producerInsertMisreport = flow(function* (record, index) {
        try {
            const { data } = yield CheckService.insertMisreport(record);
            this.reportListInit[index] = {
                ...this.reportListInit[index],
                ...data
            };
            this.reportList = _.cloneDeep(this.reportListInit);
            this.handleReportChecked(index, true);
            this.updateKey = Math.random();
        } catch (e) {
            console.error('请求失败');
            message.warning('新增误报请求失败：' + e.message, 3);
        }
    }).bind(this);

    //作业员删除一条误报
    @action producerDeleteMisreport = flow(function* (record, index) {
        try {
            yield CheckService.deleteMisreport(record);
            this.reportListInit[index].misrepId = null;
            this.reportList = _.cloneDeep(this.reportListInit);
            this.handleReportChecked(index, false);
            this.updateKey = Math.random();
        } catch (e) {
            console.error('请求失败');
            message.warning('删除误报请求失败：' + e.message, 3);
        }
    }).bind(this);

    @action handleQualityGetMisreport = flow(function* (option) {
        const data = yield this.qualityGetMisreport(option);
        this.handleReportRes(data, option.taskId);
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

    handleReportChecked = (index, checked) => {
        this.reportListInit[index].checked = checked;
        this.reportList = _.cloneDeep(this.reportListInit);
        this.updateKey = Math.random();
    };

    //质检员更新单条误报
    @action qualityUpdateMisreport = flow(function* (option, index) {
        try {
            yield CheckService.updateMisreport(option);
            this.reportListInit[index].status = option.status;
            this.reportList = _.cloneDeep(this.reportListInit);
            this.handleReportChecked(index, true);
            this.updateKey = Math.random();
        } catch (e) {
            console.error('请求失败');
            message.warning('更新报表请求失败：' + e.message, 3);
        }
    }).bind(this);
}

export default new QualityCheckStore();
