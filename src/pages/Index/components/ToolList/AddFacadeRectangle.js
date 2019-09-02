import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddFacadeRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_facade_rectangle';
        return (
            <span>
                <ToolIcon
                    icon="limianjuxing"
                    title="添加立面矩形"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_facade_rectangle') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newFacadeRectangle();
    };

    content = () => {
        return <label>添加立面矩形</label>;
    };
}

export default AddFacadeRectangle;
