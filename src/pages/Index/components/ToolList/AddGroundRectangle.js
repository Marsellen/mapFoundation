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
        const { isTopView } = DataLayerStore;

        let visible = DataLayerStore.editType == 'new_ground_rectangle';
        return (
            <span className={visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="add-ground-rectangle-btn"
                    icon="dimianjuxing"
                    title="添加地面矩形"
                    disabled={isTopView}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
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
