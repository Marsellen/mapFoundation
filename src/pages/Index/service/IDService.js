import resource from 'src/utils/resource';

export default (function() {
    let service = resource(
        '/api/id_service/imppublic/api/idgenerate',
        {},
        {}
    );

    return service;
})();
