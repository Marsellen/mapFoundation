import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return activeTaskId ? (
            // <Tooltip placement="bottom" title="视角还原">
            <div placement="bottom" title="视角还原">
                <IconFont
                    type="icon-compass"
                    className="ad-icon"
                    onClick={this.action}
                />
            </div>
        ) : (
            // </Tooltip>
            <span />
        );
    }

    action = () => {
        map.setView('U');
    };
}

export default UnderView;
