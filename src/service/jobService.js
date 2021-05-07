import service from 'src/service';
import { TaskApiPath } from 'src/tool/api';

const JobService = {
    submitTask: params => {
        const config = {
            url: TaskApiPath('/outside/task/submit'),
            method: 'post',
            params
        };
        return service({ config });
    },
    listTask: (params, errorCallback) => {
        const config = {
            url: TaskApiPath('/outside/task/list'),
            method: 'get',
            params
        };
        return service({ config, errorCallback });
    },
    updateTask: params => {
        const config = {
            url: TaskApiPath('/outside/task/update'),
            method: 'post',
            params
        };
        return service({ config });
    }
};

export default JobService;
