import service from 'src/services';
import { IdApiPath } from 'src/utils/Api';

const IDService = {
    initID: data => {
        const config = {
            url: IdApiPath('/api/idgenerate'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default IDService;
