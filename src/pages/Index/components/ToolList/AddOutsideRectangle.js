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
        let visible = DataLayerStore.editType == 'new_vertical_matrix';
        return (
            <div id="add-outside-rectangle-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="renyiwaijiejuxing" />
                <div>绘制任意外接立面矩形</div>
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_vertical_matrix') return;
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        DataLayerStore.newVerticalMatrix();
    };

    content = () => {
        return <label>绘制外接立面矩形，选择至少三个点绘制</label>;
    };
}

export default AddOutsideRectangle;
