import service from 'src/services';

const ReferService = {
    referTask: data => {
        const config = {
            url: '/mock/referTask.json',
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default ReferService;
