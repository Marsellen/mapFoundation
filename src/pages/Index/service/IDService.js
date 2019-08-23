import resource from 'src/utils/resource';
import { IdApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        IdApiPath('/imppublic/api/idgenerate'),
        {},
        {}
    );

    return service;
})();
