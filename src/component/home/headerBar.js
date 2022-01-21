import React from 'react';
import { inject, observer } from 'mobx-react';
import Avatar from 'src/component/home/avatar';
import ToolCtrl from 'src/component/home/toolCtrl';
import ToolList from 'src/component/home/toolList';
import JobStatus from 'src/component/home/jobStatus';

@inject('appStore')
@observer
class HeaderBar extends React.Component {
    render() {
        return (
            <div className="flex tool-container">
                <ToolCtrl>{ToolList}</ToolCtrl>
                <JobStatus />
                <Avatar />
            </div>
        );
    }
}

export default HeaderBar;
