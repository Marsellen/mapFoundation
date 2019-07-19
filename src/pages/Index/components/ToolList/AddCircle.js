import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';

@inject('DataLayerStore')
@observer
class AddCircle extends React.Component {
    render() {
        return <ToolIcon icon="sandianhuayuan" title="三点绘制圆" action={this.action} />;
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.newCircle();
    };
}

export default AddCircle;
