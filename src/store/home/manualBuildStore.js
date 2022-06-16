import { flow, configure } from 'mobx';
import AdLineService from 'src/service/adLineService';

configure({ enforceActions: 'always' });
class ManualBuildStore {
    batchBreak = flow(function* (data) {
        try {
            const result = yield AdLineService.batchBreak(data);
            return result;
        } catch (e) {
            console.log('批量线要素打断赋值失败' + e.message || e || '');
            throw e;
        }
    });

    municipalBarrierDown = flow(function* (data) {
        try {
            const result = yield AdLineService.municipalBarrierDown(data);
            return result;
        } catch (e) {
            console.log('市政护栏下压失败' + e.message || e || '');
            throw e;
        }
    });
}

export default new ManualBuildStore();
