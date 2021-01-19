import service from 'src/services';
import { EditApiPath } from 'src/utils/Api';

const FeedbackService = {
    feedback: data => {
        const config = {
            url: EditApiPath('/feedback/data_sign'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default FeedbackService;
