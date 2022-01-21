import service from 'src/service';
import { BuriedPointApiPath } from 'src/util/api';

const BuriedPointService = {
    buriedPoint: data => {
        const config = {
            url: BuriedPointApiPath('/add'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default BuriedPointService;
