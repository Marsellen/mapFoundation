import resource from 'src/utils/resource';

export default (function() {
    let service = resource('/config/menu.json', {}, {});

    return service;
})();
