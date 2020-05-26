import { flow, configure } from 'mobx';
import Relevance from 'src/models/relevance';
import relFactory from 'src/utils/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    addRecords = flow(function* (url, dataType) {
        try {
            let response = yield axios.get(url);
            let records = relFactory.relDataToTable(response.data, dataType);
            yield Relevance.store.batchAdd(records);
        } catch (e) {
            console.log(e);
        }
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
