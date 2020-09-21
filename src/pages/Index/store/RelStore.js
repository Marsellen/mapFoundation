import { flow, configure } from 'mobx';
import Relevance from 'src/models/relevance';
import relFactory from 'src/utils/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    addRecords = flow(function* (url, dataType) {
        let response = yield axios.get(url);
        let records = relFactory.relDataToTable(response.data, dataType);
        yield Relevance.store.batchAdd(records);
    });

    destroy = flow(function* () {
        try {
            yield Relevance.store.clear();
        } catch (e) {
            console.log(e);
        }
    });

    fetchRecords = flow(function* (url, dataType) {
        let response = yield axios.get(url);
        let records = relFactory.relDataToTable(response.data, dataType);
        let oldRels = yield Relevance.store.getAll([dataType], 'DATA_TYPE');
        yield Promise.all(
            oldRels.map(async rel => {
                await Relevance.store.deleteById(rel.id);
            })
        );
        yield Relevance.store.batchAdd(records);
    });
}

export default new RelStore();
