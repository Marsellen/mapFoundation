import service from 'src/services';

const ResourceService = {
    getTrack: url => {
        const config = {
            url,
            method: 'get'
        };
        return service({ config });
    },
    getTaskInfo: url => {
        const config = {
            url,
            method: 'get'
        };
        return service({ config });
    }
};

export default ResourceService;
