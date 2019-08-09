import resource from 'src/utils/resource';
import { FileApiPath, ShpApiPath } from 'src/utils/Api';

export default (function() {
    let service = resource(
        'http://10.43.16.17:7002/projects/:id',
        {},
        {
            saveFile: {
                url: FileApiPath('/api/savefile'),
                method: 'post'
            },
            creatCircle: {
                url: FileApiPath('/api/creatcircle'),
                method: 'post'
            }
        }
    );

    service.exportShp = params => {
        // let link = document.createElement('a');
        let searchParams = Object.keys(params).reduce((str, key) => {
            return str + key + '=' + params[key];
        }, '?');
        let url = ShpApiPath('/api/v1/geoio/json2Shp' + searchParams);
        // link.style.display = 'none';
        // link.href = url;
        window.open(url);
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };

    return service;
})();
