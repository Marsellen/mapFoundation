import { flow, configure } from 'mobx';
import Relevance from 'src/models/relevance';
import relFactory from 'src/utils/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    init = flow(function*(url) {
        try {
            this.destroy();
            // console.time('getData');
            let response = yield axios.get(url);
            // console.timeLog('getData');
            // console.time('relDataToTable');
            let records = relFactory.relDataToTable(response.data);
            // console.timeLog('relDataToTable');
            // console.time('batch add');
            yield Relevance.store.batchAdd(records);
            // console.timeLog('batch add');
        } catch (e) {
            console.log(e);
        }
    });

    destroy = flow(function*() {
        try {
            yield Relevance.store.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new RelStore();
