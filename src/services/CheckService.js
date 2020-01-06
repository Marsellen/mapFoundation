import service from 'src/services';
import { CheckApiPath } from 'src/utils/Api';

const CheckService = {
    // 作业员质检接口
    check: data => {
        const config = {
            url: CheckApiPath('/addata/check'),
            method: 'post',
            data
        };
        return service({ config });
    },
    getReport: (data, successCallback, errorCallback) => {
        const config = {
            url: CheckApiPath('/addata/get_report'),
            method: 'post',
            data
        };
        return service({ config, successCallback, errorCallback });
    },
    insertMisreport: data => {
        const config = {
            url: CheckApiPath('/addata/insert_misreport'),
            method: 'post',
            data
        };
        return service({ config });
    },
    deleteMisreport: data => {
        const config = {
            url: CheckApiPath('/addata/delete_misreport'),
            method: 'post',
            data
        };
        return service({ config });
    },
    //质检员质检接口
    getMisreport: data => {
        const config = {
            url: CheckApiPath('/addata/get_mis_report'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateMisreport: data => {
        const config = {
            url: CheckApiPath('/addata/update_misreport'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default CheckService;
