import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddGroundRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_ground_rectangle';
        return (
            <div
                id="add-ground-rectangle-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="dimianjuxing" />
                <div>添加地面矩形</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_ground_rectangle') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newGroundRectangle();
    };

    content = () => {
        return <label>添加地面矩形，选择四个点进行绘制</label>;
    };
}

export default AddGroundRectangle;
