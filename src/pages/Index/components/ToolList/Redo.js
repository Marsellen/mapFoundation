import React from 'react';
import ToolIcon from 'src/components/ToolIcon';

class Redo extends React.Component {
    render() {
        return <ToolIcon icon="redo" title="取消撤销" action={this.action} />;
    }

    action = () => {};
}

export default Redo;
