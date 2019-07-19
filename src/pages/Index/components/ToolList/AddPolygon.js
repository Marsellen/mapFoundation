import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddPolygon extends React.Component {
    render() {
        return (
            <ToolIcon icon="xiankuang1" title="添加面要素" action={this.action} />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newPolygon();
    };
}

export default AddPolygon;
