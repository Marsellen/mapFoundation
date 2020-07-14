import service from 'src/services';
import { ApiPath } from 'src/utils/Api';

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
