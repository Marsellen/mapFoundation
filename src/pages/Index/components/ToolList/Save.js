import React from 'react';
import ToolIcon from 'src/components/ToolIcon';

class Save extends React.Component {
    render() {
        return <ToolIcon icon="save" title="保存" action={this.action} />;
    }

    action = () => {};
}

export default Save;
