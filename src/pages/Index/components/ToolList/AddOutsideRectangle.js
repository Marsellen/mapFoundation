import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddOutsideRectangle extends React.Component {
    render() {
        return (
            <ToolIcon
                icon="renyiwaijiejuxing"
                title="任意外接立面矩形"
                action={this.action}
            />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newVerticalMatrix();
    };
}

export default AddOutsideRectangle;
