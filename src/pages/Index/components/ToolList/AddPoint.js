import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage'; 
@inject('DataLayerStore')
@observer
class AddPoint extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_point';
        return (
            <span>
                <ToolIcon
                    icon="yuandianzhong"
                    title="添加点要素"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'new_point') return;
        DataLayerStore.newPoint();
    };

    content = () => {
        return <label>添加点要素</label>;
    };
}

export default AddPoint;
