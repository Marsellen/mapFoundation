import service from 'src/service';
import { EditApiPath } from 'src/tool/api';

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
