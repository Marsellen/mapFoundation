import resource from 'src/utils/resource';
// import { TaskApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        '/mock/sendTask.json',
        {},
        {
            // submitTask: {
            //     url: TaskApiPath('/outside/task/submit'),
            //     payload: 'params',
            //     method: 'post'
            // },
            // listTask: {
            //     url: TaskApiPath('/outside/task/list'),
            //     method: 'get'
            // }
        }
    );

    return service;
})();
