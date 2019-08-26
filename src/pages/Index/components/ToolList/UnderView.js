import React from 'react';
import { Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('taskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { taskStore } = this.props;
        const { activeTaskId } = taskStore;
        return activeTaskId ? (
            <Tooltip placement="bottom" title="视角还原">
                <IconFont
                    type="icon-compass"
                    className="ad-icon"
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
