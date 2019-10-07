import { flow, configure } from 'mobx';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import axios from 'axios';
import Attr from 'src/models/attr';

configure({ enforceActions: 'always' });
class AttrStore {
    init = flow(function*(url) {
        try {
            this.destroy();
            // console.time('getData');
            let response = yield axios.get(url);
            // console.timeLog('getData');
            // console.time('relDataToTable');
            let records = attrFactory.attrDataToTable(response.data);
            // console.timeLog('relDataToTable');
            // console.time('batch add');
            yield Attr.store.batchAdd(records);
            // console.timeLog('batch add');
        } catch (e) {
            console.log(e);
        }
    });

    export = flow(function*() {
        try {
            let records = yield Attr.store.getAll();
            let data = attrFactory.attrTableToData(records);
            return data;
        } catch (e) {
            console.log(e);
        }
    });

    destroy = flow(function*() {
        try {
            yield Attr.store.clear();
        } catch (e) {
            console.log(e);
        }
    });
}

export default new AttrStore();
