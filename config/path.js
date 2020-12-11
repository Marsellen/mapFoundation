//本地环境接口根路径
const LOCAL_PATH = 'http://10.43.75.55:30000/mock/20';
//开发环境接口根路径
const DEV_PATH = 'http://10.43.75.150:43303';
//测试环境接口根路径
const DOME_PATH = 'http://10.43.75.150:43304';

//转发各服务根路径映射
module.exports = PROXY_MAP = {
    local: {
        gateway: LOCAL_PATH,
        task: LOCAL_PATH,
        id: LOCAL_PATH,
        manualBuild: LOCAL_PATH,
        store: LOCAL_PATH,
        querydb: LOCAL_PATH,
        edit: LOCAL_PATH,
        check: LOCAL_PATH,
        checkMarker: LOCAL_PATH,
        repair: LOCAL_PATH
    },
    dev: {
        gateway: DEV_PATH,
        task: DEV_PATH,
        id: DEV_PATH,
        manualBuild: DEV_PATH,
        store: DEV_PATH,
        querydb: DEV_PATH,
        edit: DEV_PATH,
        check: DEV_PATH,
        checkMarker: DEV_PATH,
        repair: DEV_PATH
    },
    demo: {
        gateway: DOME_PATH,
        task: DOME_PATH,
        id: DOME_PATH,
        manualBuild: DOME_PATH,
        store: DOME_PATH,
        querydb: DOME_PATH,
        edit: DOME_PATH,
        check: DOME_PATH,
        checkMarker: DOME_PATH,
        repair: DOME_PATH
    },
    prod: {
        gateway: PROD_PATH,
        task: PROD_PATH,
        id: PROD_PATH,
        manualBuild: PROD_PATH,
        store: PROD_PATH,
        querydb: PROD_PATH,
        edit: PROD_PATH,
        check: PROD_PATH,
        checkMarker: PROD_PATH,
        repair: PROD_PATH
    }
};
