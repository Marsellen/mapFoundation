import resource from 'src/utils/resource';
import { ManualBuildApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '/mock/addUTurnLine.json',
        {},
        {
            aroundLines: {
                //左右车道线生成车道中心线
                url: ManualBuildApiPath('/lane/computeLaneByTwoDivs'),
                method: 'post'
            },
            straightLines: {
                //车道中心线直行，转弯，掉头
                url: ManualBuildApiPath('/lane/computeLaneByTwoLanes'),
                // payload: 'params',
                method: 'post'
            },
            adRoadLines: {
                //参考线选择一条车道线
                url: ManualBuildApiPath('/road/computeRoadByDiv'),
                method: 'post'
            },
            adTwoRoadLines: {
                //参考线直行，转弯，掉头
                url: ManualBuildApiPath('/road/computeRoadByTwoRoads'),
                method: 'post'
            }
        }
    );

    return service;
})();
