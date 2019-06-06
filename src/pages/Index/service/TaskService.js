import resource from 'src/utils/resource';

export default (function() {
    let service = resource('http://10.43.16.17:7002/projects/:id', {}, {});

    return service;
})();
