import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('OperateHistoryStore')
@observer
class Save extends React.Component {
    render() {
        return (
            <ToolIcon
                icon="save"
                title="保存"
                disabled={true}
                action={this.action}
            />
        );
    }

    action = () => {};
}

export default Save;
