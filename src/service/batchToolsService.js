import service from 'src/service';
import { EditApiPath } from 'src/util/api';

const BatchToolsService = {
    lineToStop: data => {
        const config = {
            url: EditApiPath('/batch_opt/line_to_stop'),
            method: 'post',
            data
        };
        return service({ config });
    },
    batchAssignment: data => {
        const config = {
            url: EditApiPath('/assignment_opt/batch_assignment'),
            method: 'post',
            data
        };
        return service({ config });
    }
};

export default BatchToolsService;
