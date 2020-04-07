import { observable, flow, configure } from 'mobx';
import FeedbackService from 'src/services/FeedbackService';

configure({ enforceActions: 'always' });
class FeedbackStore {
    @observable feedbackData = {};
    feedback = flow(function* (option) {
        try {
            const result = yield FeedbackService.feedback(option);
            this.feedbackData = result.data;
        } catch (e) {
            message.warning('反馈失败：' + e.message, 3);
        }
    });
}

export default new FeedbackStore();
