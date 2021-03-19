import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import { editLock } from 'src/utils/decorator';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddFacadeRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_facade_rectangle';
        return (
            <div id="add-facade-rectangle-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="limianjuxing" />
                <div>绘制两点立面矩形</div>
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
            </div>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_facade_rectangle') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newFacadeRectangle();
    };

    content = () => {
        return <label>绘制两点立面矩形，选择两个点绘制</label>;
    };
}

export default AddFacadeRectangle;
