import { observable, configure, action, flow, computed } from 'mobx';
import CheckService from 'src/services/CheckService';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import Resize from 'src/utils/resize';
import _ from 'lodash';
import { getQualityChecked } from 'src/utils/permissionCtrl';

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
    pollingCount = 0;

    @observable reportListInit = null;
    @observable reportList = null;
    @observable filterOption = {};
    @observable checkReportIsVisited = {};
    @observable checkReportVisible = false;
    @observable tableHeight = 0;

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
        return this.reportList ? this.reportList.length : 0;
    }

    @action openCheckReport = () => {
        this.filterOption.isUpdate = true;
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.filterOption.isUpdate = false;
        this.checkReportVisible = false;
    };

    @action cancelPolling = () => {
        this.pollingCount = 100;
    };

    @action clearCheckReport = () => {
        this.reportListInit = [];
        this.reportList = [];
        this.checkReportIsVisited = {};
        this.filterOption = {};
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
            console.error(e.message);
            message.warning('获取报表失败：' + e.message, 3);
        }
    }).bind(this);

    //轮询质检结果
    @action pollingGetReport = (option, resolve) => {
        return setTimeout(
            (() => {
                try {
                    CheckService.getReport(
                        option,
                        res => {
                            const { code, data, message: resMessage } = res;
                            switch (code) {
                                case 1:
                                    this.pollingCount = 0;
                                    this.handleReportRes(data, option.task_id);
                                    resolve && resolve(data);
                                    break;
                                case 201:
                                    this.pollingCount += 1;
                                    if (this.pollingCount < 10) {
                                        this.pollingGetReport(option, resolve);
                                    } else {
                                        this.pollingCount < 100 &&
                                            message.error(`请求超时`);

                                        this.pollingCount = 0;
                                        resolve && resolve(false);
                                    }
                                    break;
                                default:
                                    this.pollingCount = 0;
                                    message.warning(`${code} : ${resMessage}`);
                                    resolve && resolve(false);
                                    break;
                            }
                        },
                        error => {
                            message.warning(
                                '获取报表失败：' + error.message || '请求失败'
                            );
                            console.error(error.message || '请求失败');
                            resolve && resolve(false);
                        }
                    );
                } catch (e) {
                    console.error('获取报表失败');
                }
            }).bind(this),
            1000
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
            return;
        }
        const { checkReport = {} } =
            AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
        const filterOption = {};

        data.map((item, index) => {
            const { layerName, repId } = item;
            const layerNameText =
                DATA_LAYER_MAP[layerName] && DATA_LAYER_MAP[layerName].label;
            item.index = index;
            item.visited = checkReport[repId] ? checkReport[repId] : false;
            item.visitedText = item.visited ? '已查看' : '未查看';
            item.layerNameText = layerNameText;
            item.ellipsis = true;
            item.checked = getQualityChecked(item);

            needFilterColumns.map(column => {
                filterOption[`${column}Obj`] =
                    filterOption[`${column}Obj`] || {};
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
        const { checkReport = {} } =
            AdLocalStorage.getTaskInfosStorage(activeTaskId) || {};
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
    };

    //质检员更新单条误报
    @action qualityUpdateMisreport = flow(function* (option, index) {
        try {
            yield CheckService.updateMisreport(option);
            this.reportListInit[index].status = option.status;
            this.reportList = _.cloneDeep(this.reportListInit);
            this.handleReportChecked(index, true);
        } catch (e) {
            console.error('请求失败');
            message.warning('更新报表请求失败：' + e.message, 3);
        }
    }).bind(this);
}

export default new QualityCheckStore();
