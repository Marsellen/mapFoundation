import service from 'src/services';
import { EditApiPath } from 'src/utils/Api';

const EditorService = {
    breakLines: data => {
        const config = {
            url: EditApiPath('/adcommon/batchcut'),
            method: 'post',
            data
        };
        return service({ config });
    },
    mergeLines: data => {
        const config = {
            url: EditApiPath('/adcommon/join'),
            method: 'post',
            data
        };
        return service({ config });
    },
    locatePicture: (data, errorCallback) => {
        const config = {
            url: EditApiPath('/api/getbestfitjpg'),
            method: 'post',
            data
        };
        return service({ config, errorCallback });
    },
    breakLinesByLine: data => {
        const config = {
            url: EditApiPath('/adcommon/linecuts'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default EditorService;
