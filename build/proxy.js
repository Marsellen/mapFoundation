//本地环境接口根路径
const LOCAL_PATH = 'http://10.43.40.144:3011/mock/1121';
//开发环境接口根路径
const DEV_PATH = 'http://10.43.75.150:43303';
//测试环境接口根路径
const DOME_PATH = 'http://10.43.75.150:43304';

//转发各服务根路径映射
module.exports = PROXY_MAP = {
    local: {
        auth: LOCAL_PATH,
        task: LOCAL_PATH,
        imppublic: LOCAL_PATH,
        manualBuild: LOCAL_PATH,
        store: LOCAL_PATH,
        querydb_new: LOCAL_PATH,
        edit: LOCAL_PATH,
        data_prepare: LOCAL_PATH,
        'check-web': LOCAL_PATH,
        check: LOCAL_PATH,
        correct: LOCAL_PATH,
        collect: LOCAL_PATH,
        build: LOCAL_PATH
    },
    dev: {
        auth: DEV_PATH,
        task: DEV_PATH,
        imppublic: DEV_PATH,
        manualBuild: DEV_PATH,
        store: DEV_PATH,
        querydb_new: DEV_PATH,
        edit: DEV_PATH,
        data_prepare: DEV_PATH,
        'check-web': DEV_PATH,
        check: DEV_PATH,
        correct: DEV_PATH,
        collect: DEV_PATH,
        build: DEV_PATH
    },
    demo: {
        auth: DOME_PATH,
        task: DOME_PATH,
        imppublic: DOME_PATH,
        manualBuild: DOME_PATH,
        store: DOME_PATH,
        querydb_new: DOME_PATH,
        edit: DOME_PATH,
        data_prepare: DOME_PATH,
        'check-web': DOME_PATH,
        check: DOME_PATH,
        correct: DOME_PATH,
        collect: DOME_PATH,
        build: DOME_PATH
    }
};
