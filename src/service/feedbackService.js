import service from 'src/service';
import { EditApiPath } from 'src/tool/api';

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
