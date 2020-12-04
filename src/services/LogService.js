import service from 'src/services';
import { EditApiPath } from 'src/utils/Api';

const LogService = {
    logList: params => {
        const config = {
            url: EditApiPath('/snapshot/datas'),
            method: 'get',
            params
        };
        return service({ config });
    },
    logDetail: params => {
        const config = {
            url: EditApiPath(`/snapshot/logSnapshot/${params.dataType}`),
            method: 'get',
            params
        };
        return service({ config });
    }
};

export default LogService;
