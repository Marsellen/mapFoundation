import service from 'src/services';
import { ManualBuildApiPath } from 'src/utils/Api';

const AdlineService = {
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
    }
};

export default AdlineService;
