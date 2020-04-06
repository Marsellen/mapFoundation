import { flow, configure } from 'mobx';
import FeedbackService from 'src/services/FeedbackService';

configure({ enforceActions: 'always' });
class FeedbackStore {
    feedback = flow(function* (option) {
        try {
            const result = yield FeedbackService.feedback(option);
            return result.data;
        } catch (e) {
            message.warning('反馈失败：' + e.message, 3);
        }
    });
}

export default new FeedbackStore();
