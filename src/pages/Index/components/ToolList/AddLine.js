import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddLine extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_line';
        return (
            <span>
                <ToolIcon
                    icon="icon-line-graph"
                    title="添加线要素"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_line') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newLine();
    };

    content = () => {
        return <label>添加线要素</label>;
    };
}

export default AddLine;
