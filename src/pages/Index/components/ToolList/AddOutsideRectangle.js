import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddOutsideRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        const { disable } = DataLayerStore;
        let visible = DataLayerStore.editType == 'new_vertical_matrix';
        return (
            <span>
                <ToolIcon
                    icon="renyiwaijiejuxing"
                    title="任意外接立面矩形"
                    disabled={!disable}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_vertical_matrix') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newVerticalMatrix();
    };

    content = () => {
        return <label>添加外接立面矩形</label>;
    };
}

export default AddOutsideRectangle;
