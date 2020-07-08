import service from 'src/services';
import { MarkerApiPath } from 'src/utils/Api';

const QCMarkerService = {
    insertMarker: data => {
        const config = {
            url: MarkerApiPath('/marker/insertMarker'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateMarker: data => {
        const config = {
            url: MarkerApiPath('/marker/updateMarker'),
            method: 'post',
            data
        };
        return service({ config });
    },
    deleteMarker: params => {
        const config = {
            url: MarkerApiPath('/marker/deleteByPrimaryKey'),
            method: 'get',
            params
        };
        return service({ config });
    },
    getMarkerList: data => {
        const config = {
            url: MarkerApiPath('/marker/getMarkerList'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateMarkerStatus: params => {
        const config = {
            url: MarkerApiPath('/marker/updateMarkerStatusByTaskId'),
            method: 'get',
            params
        };
        return service({ config });
    }
};

export default QCMarkerService;
