import resource from 'src/utils/resource';
import { ApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '',
        {},
        {
            login: {
                url: ApiPath('/auth/login'),
                method: 'post'
            }
        }
    );

    return service;
})();
