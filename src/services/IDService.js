import service from 'src/services';
import { IdApiPath } from 'src/utils/Api';

const IDService = {
    initID: (data, errorCallback) => {
        const config = {
            url: IdApiPath('/api/idgenerate'),
            method: 'post',
            data
        };
        return service({ config, errorCallback });
    }
};

export default IDService;
