import { observable, flow, configure } from 'mobx';
import FeedbackService from 'src/services/FeedbackService';

configure({ enforceActions: 'always' });
class FeedbackStore {
    @observable feedbackData = {};
    feedback = flow(function* (option) {
        const result = yield FeedbackService.feedback(option);
        this.feedbackData = result.data;
    });
}

export default new FeedbackStore();
