import VisiteHistory from 'src/util/visiteHistory/visiteHistory';
import { deleteDatabase } from 'src/util/indexedDB';

class HomeVisiteHistory extends VisiteHistory {
    constructor() {
        super();
        this.key = 'homeVisiteHistory';
        this.viz = document.getElementById('viz');
    }

    enterPage = () => {
        this.addVisitedHistory();
        this.pollingVisiteHistory();
        let jump = this.LinkToBlank();
        if (jump) {
            this.viz.style.display = 'none';
        } else {
            deleteDatabase('attributes');
            deleteDatabase('editLogs');
            deleteDatabase('adEditor');
            deleteDatabase('relationships');
            this.viz.style.display = 'block';
        }
    };

    leavePage = () => {
        this.removeVisitedHistory();
        this.viz.style.display = 'none';
    };
}

export default new HomeVisiteHistory();
