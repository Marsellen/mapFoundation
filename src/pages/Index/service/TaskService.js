import resource from 'src/utils/resource';

export default (function() {
    let service = resource(
        'http://10.43.16.17:7002/projects/:id',
        {},
        {
            saveFile: {
                url: '/nas_service/api/savefile',
                method: 'post'
            },
            creatCircle: {
                url: '/nas_service/api/creatcircle',
                method: 'post'
            }
        }
    );

    service.exportShp = params => {
        let link = document.createElement('a');
        let searchParams = Object.keys(params).reduce((str, key) => {
            return str + key + '=' + params[key];
        }, '?');
        let url = '/shp_service/api/v1/geoio/json2Shp' + searchParams;
        link.style.display = 'none';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return service;
})();
