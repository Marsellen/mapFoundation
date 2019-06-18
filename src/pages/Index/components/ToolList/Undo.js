import React from 'react';
import ToolIcon from 'src/components/ToolIcon';

class Undo extends React.Component {
    render() {
        return <ToolIcon icon="undo" title="撤销" action={this.action} />;
    }

    action = () => {};
}

export default Undo;
