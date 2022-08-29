import { flow, configure } from 'mobx';
import AdLineService from 'src/service/adLineService';
import axios from 'axios';

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

    buildLane = flow(function* (data) {
        try {
            const result = yield AdLineService.buildLane(data);
            return result;
        } catch (e) {
            console.log('路段中心线构建失败' + e.message || e || '');
            throw e;
        }
    });

    buildRoad = flow(function* (data) {
        try {
            const result = yield AdLineService.buildRoad(data);
            return result;
        } catch (e) {
            console.log('路口中心线+参考线构建失败' + e.message || e || '');
            throw e;
        }
    });

    buildLink = flow(function* (data) {
        try {
            const result = yield AdLineService.buildLink(data);
            return result;
        } catch (e) {
            console.log('参考线/中心线关系构建失败' + e.message || e || '');
            throw e;
        }
    });

    buildReback = flow(function* (data) {
        try {
            const result = yield AdLineService.buildReback(data);
            return result;
        } catch (e) {
            console.log('回退失败' + e.message || e || '');
            throw e;
        }
    });

    getLayers = flow(function* (urls, layerNames) {
        try {
            const result = yield Promise.all(urls.map(axios.get));
            let newObj = {};
            result.forEach(item => {
                newObj[item?.data.name] = item?.data;
            });
            return newObj;
        } catch (e) {
            console.log('逻辑构建结果获取失败' + e.message || e || '');
            throw e;
        }
    });
}

export default new ManualBuildStore();
