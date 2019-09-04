import resource from 'src/utils/resource';

export default (function() {
    let service = resource('/mock/referTask.json', {}, {});

    return service;
})();
