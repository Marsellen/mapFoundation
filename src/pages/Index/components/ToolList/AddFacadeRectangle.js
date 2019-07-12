import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddFacadeRectangle extends React.Component {
    render() {
        return (
            <ToolIcon icon="juxing" title="添加立面矩形" action={this.action} />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newFacadeRectangle();
    };
}

export default AddFacadeRectangle;
