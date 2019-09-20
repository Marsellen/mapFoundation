import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@observer
class TopView extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return activeTaskId ? (
            <div placement="bottom" title="俯视图模式" className="zoom-scale">
                <IconFont
                    type="icon-compass"
                    className="ad-icon"
                    onClick={this.action}
                />
            </div>
        ) : (
            <span />
        );
    }

    action = () => {
        // map.setView('U');
        map.setCurrentView('U');
    }
}

export default TopView;
