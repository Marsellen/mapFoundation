import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddCircle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_circle';
        return (
            <div id="add-circle-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="sandianhuayuan" />
                <div>绘制三点圆形</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_circle') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newCircle();
    };

    content = () => {
        return <label>绘制三点圆形，选择三个点绘制</label>;
    };
}

export default AddCircle;
