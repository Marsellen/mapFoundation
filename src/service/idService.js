import service from 'src/service';
import { IdApiPath } from 'src/util/api';

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
