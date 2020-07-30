import service from 'src/services';
import { EditApiPath, updateBoundaryApiPath, TaskApiPath } from 'src/utils/Api';
import { getAuthentication } from 'src/utils/Session';

const TaskService = {
    saveFile: data => {
        const config = {
            url: EditApiPath('/api/single_file_save'),
            method: 'post',
            data
        };
        return service({ config });
    },
    creatCircle: (data, errorCallback) => {
        const config = {
            url: EditApiPath('/api/creatcircle'),
            method: 'post',
            data
        };
        return service({ config, errorCallback });
    },
    writeEditLog: data => {
        const config = {
            url: EditApiPath('/snapshot/logSnapshot'),
            method: 'post',
            data
        };
        return service({ config });
    },
    updateTaskBoundaryFile: data => {
        const config = {
            url: updateBoundaryApiPath('/queryforoutside'),
            method: 'post',
            data
        };
        return service({ config });
    },
    exportShp: params => {
        // let link = document.createElement('a');
        let userInfo = getAuthentication();
        let Authentication = userInfo ? userInfo.token : '';
        params = {
            ...params,
            Authentication
        };
        let searchParams = Object.keys(params).reduce((str, key) => {
            return str + key + '=' + params[key] + '&';
        }, '?');

        let url = EditApiPath('/api/v1/geoio/json2Shp' + searchParams);

        window.open(url);
    },
    statisticsTime: params => {
        const config = {
            url: TaskApiPath('/outside/task/tag'),
            method: 'post',
            params
        };
        return service({ config });
    }
};

export default TaskService;
