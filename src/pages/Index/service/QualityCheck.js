import resource from 'src/utils/resource';
import { CheckApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '/mock/qualityCheck.json',
        {},
        {
            // 作业员质检接口
            check: {
                url: CheckApiPath('/addata/check'),
                method: 'post'
            },
            getReport: {
                url: CheckApiPath('/addata/get_report'),
                method: 'post'
            },
            insertMisreport: {
                url: CheckApiPath('/addata/insert_misreport'),
                method: 'post'
            },
            deleteMisreport: {
                url: CheckApiPath('/addata/delete_misreport'),
                method: 'post'
            },
            //质检员质检接口
            getMisreport: {
                url: CheckApiPath('/addata/get_mis_report'),
                method: 'post'
            },
            updateMisreport: {
                url: CheckApiPath('/addata/update_misreport'),
                method: 'post'
            }
        }
    );

    return service;
})();
