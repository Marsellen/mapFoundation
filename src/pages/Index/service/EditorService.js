import resource from 'src/utils/resource';
import { EditorApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '',
        {},
        {
            breakLines: {
                url: EditorApiPath('/adcommon/batchcut'),
                method: 'post'
            },
            mergeLines: {
                url: EditorApiPath('/adcommon/join'),
                method: 'post'
            }
        }
    );

    return service;
})();
