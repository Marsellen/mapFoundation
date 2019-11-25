import { observable, configure, action, flow, computed } from 'mobx';
import QualityCheckService from 'src/pages/Index/service/QualityCheck';
import { message } from 'antd';
import AdLocalStorage from 'src/utils/AdLocalStorage';
import { DATA_LAYER_MAP } from 'src/config/DataLayerConfig';
import { COLUMNS_CONFIG } from 'src/config/CheckTableConfig';
import Resize from 'src/Utils/resize';

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
        return this.reportList.length;
    }

    @action openCheckReport = () => {
        this.checkReportVisible = true;
    };

    @action closeCheckReport = () => {
        this.checkReportVisible = false;
    };

    @action cancelPolling = () => {
        this.pollingCount = 100;
    };

    @action clearCheckReport = () => {
        this.reportListInit = [];
        this.reportList = [];
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
            message.error(`错误提示 ${e.message || e}`);
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
                                        resolve && resolve(false);
                                        this.pollingCount = 0;
                                    }
                                    break;
                                case 509:
                                    this.pollingCount = 0;
                                    // message.warning(`${code} : 没有质检结果`);
                                    break;
                                default:
                                    this.pollingCount = 0;
                                    message.warning(`${code} : ${message}`);
                                    resolve && resolve(false);
                                    break;
                            }
                        })
                        .catch(e => {
                            message.error(`错误提示 ${e.message || e}`);
                            resolve && resolve(false);
                        });
                } catch (e) {
                    message.error(`错误提示 ${e.message || e}`);
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
        if (data.length <= 0) {
            this.reportListInit = [];
            this.reportList = [];
            this.resize.addResizeEvent('quality-check-result-modal-wrap');
            this.getResizeStyle();
            return;
        }
        const { checkReport = {} } = AdLocalStorage.getTaskInfosStorage(
            activeTaskId
        );
        const filterOption = {};

        data.map((item, index) => {
            const { layerName, misrepId, repId } = item;
            const layerNameText =
                DATA_LAYER_MAP[layerName] && DATA_LAYER_MAP[layerName].label;
            item.index = index;
            item.visited = checkReport[repId] ? checkReport[repId] : false;
            item.visitedText = item.visited ? '已查看' : '未查看';
            item.layerNameText = layerNameText;
            item.ellipsis = true;
            item.checked = misrepId ? true : false;

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
        this.reportList = data.concat();
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
            message.error(`错误提示 ${e.message || e}`);
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
            message.error(`错误提示 ${e.message || e}`);
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
            message.error(`错误提示 ${e.message || e}`);
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
            message.error(`错误提示 ${e.message || e}`);
        }
    }).bind(this);
}

export default new QualityCheckStore();
