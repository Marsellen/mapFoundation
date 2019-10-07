import resource from 'src/utils/resource';
import { EditApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '',
        {},
        {
            breakLines: {
                url: EditApiPath('/adcommon/batchcut'),
                method: 'post'
            },
            mergeLines: {
                url: EditApiPath('/adcommon/join'),
                method: 'post'
            }
        }
    );

    return service;
})();
