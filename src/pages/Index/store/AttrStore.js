import { flow, configure } from 'mobx';
import attrFactory from 'src/utils/attrCtrl/attrFactory';
import axios from 'axios';
import Attr from 'src/models/attr';
import { message } from 'antd';

configure({ enforceActions: 'always' });
class AttrStore {
    addRecords = flow(function* (url, dataType) {
        try {
            let response = yield axios.get(url);
            let records = attrFactory.attrDataToTable(response.data, dataType);
            yield Attr.store.batchAdd(records);
        } catch (e) {
            if (dataType === 'boundary') message.warning('没有周边底图数据关联属性');
            throw e;
        }
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
