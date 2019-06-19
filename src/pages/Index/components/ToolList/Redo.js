import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('OperateHistoryStore')
@observer
class Redo extends React.Component {
    render() {
        return <ToolIcon icon="redo" title="取消撤销" action={this.action} />;
    }

    action = () => {};
}

export default Redo;
