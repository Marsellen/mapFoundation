import service from 'src/service';
import { MarkerApiPath } from 'src/util/api';

const QCMarkerService = {
    insertMarker: data => {
        const config = {
            url: MarkerApiPath('/dataMarker/insertMarker'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateMarker: data => {
        const config = {
            url: MarkerApiPath('/dataMarker/updateMarker'),
            method: 'post',
            data
        };
        return service({ config });
    },
    deleteMarker: params => {
        const config = {
            url: MarkerApiPath('/dataMarker/deleteByPrimaryKey'),
            method: 'get',
            params
        };
        return service({ config });
    },
    getMarkerList: data => {
        const config = {
            url: MarkerApiPath('/dataMarker/getMarkerList'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateMarkerStatus: params => {
        const config = {
            url: MarkerApiPath('/dataMarker/updateMarkerStatusByTaskId'),
            method: 'get',
            params
        };
        return service({ config });
    }
};

export default QCMarkerService;
