import service from 'src/service';
import { IdApiPath } from 'src/util/api';

const IDService = {
    initID: data => {
        let userName = localStorage.getItem('userName');
        if (userName) {
            const config = {
                url: IdApiPath('/api/idgenerate'),
                method: 'post',
                data
            };
            return service({ config });
        }
        else {
            let d = new Date();
            let n = d.getTime();
            return { "code": 1, "message": "成功", "data": [{ "min": n, "max": n }] };

        }
    }
};

export default IDService;
