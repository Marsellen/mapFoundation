import { flow, configure } from 'mobx';
import attrFactory from 'src/util/attrFactory';
import axios from 'axios';
import Attr from 'src/util/attr';
import { collectCustomHooksForSignature } from 'react-refresh';

configure({ enforceActions: 'always' });
class AttrStore {
    addRecords = flow(function* (urls, dataType) {
        // console.log('4加载属性数据开始：', new Date);
        const response = yield Promise.all(urls.map(axios.get));
        // console.log('4加载属性数据结束：', new Date); 
        const records = attrFactory.attrDataToTable(response, dataType);
        // console.log('5缓存属性数据开始：', new Date);
        yield Attr.store.batchAdd(records);
        // console.log('5缓存属性数据结束：', new Date);
    });

    // 针对周边数据，做去重操作
    addRecordsBoundary = flow(function* (urls, dataType) {
        // console.log('4加载属性数据开始：', new Date);
        const response = yield Promise.all(urls.map(axios.get));
        // console.log('4加载属性数据结束：', new Date); 
        const records = attrFactory.attrDataToTable(response, dataType);
        let recordsBoundary = [];
        let attrs = yield Attr.store.getAll();
        if (attrs || attrs.length > 0) {
            records.forEach((att, i) => {
                if (att?.key !== undefined) {
                    let boundary = attrs.find((a) => a.key == att.key);
                    if (boundary === undefined) {
                        recordsBoundary.push(att)
                    }
                }

            })
        }
        // console.log('5缓存属性数据开始：', new Date);
        yield Attr.store.batchAdd(recordsBoundary);
        // console.log('5缓存属性数据结束：', new Date);
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
