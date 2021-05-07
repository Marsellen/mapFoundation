import React from 'react';
import Avatar from './avatar';
import ToolCtrl from './toolCtrl';
import ToolList from './ToolList';
import JobStatus from './jobStatus';
import { inject, observer } from 'mobx-react';

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
