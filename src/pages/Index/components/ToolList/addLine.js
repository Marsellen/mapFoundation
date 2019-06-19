import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddLine extends React.Component {
    render() {
        return <ToolIcon icon="line" title="添加线要素" action={this.action} />;
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newLine();
    };
}

export default AddLine;
