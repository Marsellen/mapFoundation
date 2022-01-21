import { flow, configure } from 'mobx';
import Relevance from 'src/util/relevance';
import relFactory from 'src/util/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    addRecords = flow(function* (urls, dataType) {
        const response = yield Promise.all(urls.map(axios.get));
        const records = relFactory.relDataToTable(response, dataType);
        yield Relevance.store.batchAdd(records);
    });

    destroy = flow(function* () {
        try {
            yield Relevance.store.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new RelStore();
