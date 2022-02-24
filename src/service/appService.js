import service from 'src/service';
import { ApiPath } from 'src/util/api';

const AppService = {
    login: data => {
        const config = {
            url: ApiPath('/login'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default AppService;