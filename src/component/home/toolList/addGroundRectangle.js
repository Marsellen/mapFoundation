import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/component/common/adMessage';
import { editLock } from 'src/util/decorator';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddGroundRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_ground_rectangle';
        return (
            <div id="add-ground-rectangle-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="dimianjuxing" />
                <div>绘制地面矩形</div>
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
            </div>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_ground_rectangle') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newGroundRectangle();
    };

    content = () => {
        return <label>绘制地面矩形，选择四个点进行绘制</label>;
    };
}

export default AddGroundRectangle;