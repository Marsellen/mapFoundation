import { flow, configure } from 'mobx';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import axios from 'axios';
import Attr from 'src/models/attr';

configure({ enforceActions: 'always' });
class AttrStore {
    addRecords = flow(function* (urls, dataType) {
        const response = yield Promise.all(urls.map(axios.get));
        const records = attrFactory.attrDataToTable(response, dataType);
        yield Attr.store.batchAdd(records);
    });

    destroy = flow(function* () {
        try {
            yield Attr.store.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttrStore();
