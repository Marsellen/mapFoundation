import React from 'react';
import { Tooltip, Icon } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('taskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return activeTaskId ? (
            <Tooltip placement="bottom" title="视角还原">
                <Icon
                    type="compass"
                    className="ad-icon"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 48,
                        zIndex: 1000,
                        fontSize: 30
                    }}
                    onClick={this.action}
                />
            </Tooltip>
        ) : (
            <span />
        );
    }

    action = () => {
        map.setView('U');
    };
}

export default UnderView;
