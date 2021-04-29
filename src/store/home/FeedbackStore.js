import { observable, flow, configure } from 'mobx';
import FeedbackService from 'src/service/feedbackService';

configure({ enforceActions: 'always' });
class FeedbackStore {
    @observable feedbackData = {};
    feedback = flow(function* (option) {
        try {
            const result = yield FeedbackService.feedback(option);
            return result;
        } catch (e) {
            console.log(e);
        }
    });
}

export default new FeedbackStore();
