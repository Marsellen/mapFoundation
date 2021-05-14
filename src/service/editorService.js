import service from 'src/service';
import { EditApiPath } from 'src/tool/api';

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
    batchMergeLines: data => {
        const config = {
            url: EditApiPath('/adcommon/batch_join'),
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
    },
    versionInfo: data => {
        const config = {
            url: EditApiPath('/adcommon/getVersion'),
            method: 'get',
            data
        };
        return service({ config });
    },
    getFileList: data => {
        const config = {
            url: EditApiPath('/file_query/file_list'),
            method: 'post',
            data
        };
        return service({ config });
    },
    setQcMarkerConfig: data => {
        const config = {
            url: EditApiPath('/quality_inspection_label/save_config'),
            method: 'post',
            data
        };
        return service({ config });
    },
    getQcMarkerConfig: () => {
        const config = {
            url: EditApiPath('/quality_inspection_label/query_config'),
            method: 'get'
        };
        return service({ config });
    },
    batchBuild: data => {
        const config = {
            url: EditApiPath('/batch_create/laneLine'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default EditorService;
