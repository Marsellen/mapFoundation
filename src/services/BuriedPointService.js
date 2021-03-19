import service from 'src/services';
import { BuriedPointApiPath } from 'src/utils/Api';

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
