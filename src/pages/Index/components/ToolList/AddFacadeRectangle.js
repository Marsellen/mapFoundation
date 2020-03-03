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
            <div
                id="add-facade-rectangle-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="limianjuxing" />
                <div>添加立面矩形</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_facade_rectangle') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newFacadeRectangle();
    };

    content = () => {
        return <label>添加两点立面矩形，选择两个点绘制</label>;
    };
}

export default AddFacadeRectangle;
