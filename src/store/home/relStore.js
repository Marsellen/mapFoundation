import { flow, configure } from 'mobx';
import Relevance from 'src/util/relevance';
import relFactory from 'src/util/relCtrl/relFactory';
import axios from 'axios';

configure({ enforceActions: 'always' });
class RelStore {
    addRecords = flow(function* (urls, dataType, data = null) {
        let response = null;
        if (data) {
            response = data;
        }
        else {
            // console.log('6加载关系数据开始：', new Date);
            response = yield Promise.all(urls.map(axios.get));
        }
        // console.log('6加载关系数据结束：', new Date);
        // console.log('7缓存关系数据开始：', new Date);
        const records = relFactory.relDataToTable(response, dataType);
        yield Relevance.store.batchAdd(records);
        // console.log('7缓存关系数据结束：', new Date);
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
