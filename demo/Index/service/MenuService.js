import resource from 'src/utils/resource';

export default (function() {
    let service = resource('/mock/demo-menu.json', {}, {});

    return service;
})();
