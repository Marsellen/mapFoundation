import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddPoint extends React.Component {
    render() {
        return (
            <ToolIcon
                icon="yuandianzhong"
                title="添加点要素"
                action={this.action}
            />
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newPoint();
    };
}

export default AddPoint;
