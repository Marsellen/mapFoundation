import VisiteHistory from 'src/util/visiteHistory/visiteHistory';

class LoginVisitedHistory extends VisiteHistory {
    constructor() {
        super();
        this.key = 'loginVisiteHistory';
    }

    enterPage = () => {
        this.addVisitedHistory();
        this.pollingVisiteHistory();
        this.LinkToBlank();
    };

    leavePage = () => {
        this.removeVisitedHistory();
    };
}

export default new LoginVisitedHistory();
