import resource from 'src/utils/resource';

export default (function() {
    let service = resource(
        '/id_service/imppublic/api/idgenerate',
        {},
        {}
    );

    return service;
})();
