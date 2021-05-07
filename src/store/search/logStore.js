import { createContext } from 'react';
import { message } from 'antd';
import LogService from 'src/service/logService';

export const getLogList = async option => {
    try {
        const result = await LogService.logList(option);
        return result.data;
    } catch (e) {
        message.warning('日志查询列表获取失败：' + e.message, 3);
    }
};

export const getLogDetail = async option => {
    try {
        const result = await LogService.logDetail(option);
        return result.data;
    } catch (e) {
        message.warning('快照详情获取失败：' + e.message, 3);
    }
};

export const LogStore = createContext();
export const logState = {
    logDetailData: [],
    logListData: []
};
export const LogReducer = (state, action) => {
    switch (action.type) {
        case 'setLogList':
            return { ...state, logListData: action.logListData };
        case 'setLogDetail':
            return { ...state, logDetailData: action.logDetailData };
        default:
            throw new Error();
    }
};
