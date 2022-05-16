import service from 'src/service';
import { ManualBuildApiPath } from 'src/util/api';

const AdLineService = {
    aroundLines: data => {
        //左右车道线生成车道中心线
        const config = {
            url: ManualBuildApiPath('/lane/computeLaneByTwoDivs'),
            method: 'post',
            data
        };
        return service({ config });
    },
    straightLines: data => {
        //车道中心线直行，转弯，掉头
        const config = {
            url: ManualBuildApiPath('/lane/computeLaneByTwoLanes'),
            method: 'post',
            data
        };
        return service({ config });
    },
    adRoadLines: data => {
        //参考线选择一条车道线
        const config = {
            url: ManualBuildApiPath('/road/computeRoadByDiv'),
            method: 'post',
            data
        };
        return service({ config });
    },
    adTwoRoadLines: data => {
        //参考线直行，转弯，掉头
        const config = {
            url: ManualBuildApiPath('/road/computeRoadByTwoRoads'),
            method: 'post',
            data
        };
        return service({ config });
    },
    dashedCreate: data => {
        const config = {
            url: ManualBuildApiPath('/divider/computeDivBound'),
            method: 'post',
            data
        };
        return service({ config });
    },
    batchBreak: data => {
        //交互式构建 批量属性打断赋值
        const config = {
            url: ManualBuildApiPath('/ml/divSplit'),
            method: 'post',
            data
        };
        return service({ config });
    },
    municipalBarrierDown: data => {
        //交互式构建 市政护栏下压
        const config = {
            url: ManualBuildApiPath('/ml/dropBarrier'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default AdLineService;
