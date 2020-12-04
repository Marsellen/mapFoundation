import { createContext } from 'react';

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
