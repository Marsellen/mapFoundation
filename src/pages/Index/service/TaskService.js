import resource from 'src/utils/resource';

export default (function() {
    let service = resource('', {}, {
        getTasks: {
            url: '/projects',
            baseURL: 'http://10.43.16.17:7001/'
        }
    });

    return service;
})();
