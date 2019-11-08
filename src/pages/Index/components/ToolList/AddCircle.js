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
            <span className={visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="add-circle-btn"
                    icon="sandianhuayuan"
                    title="三点绘制圆"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_circle') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newCircle();
    };

    content = () => {
        return <label>添加立面三点圆形，选择三个点绘制</label>;
    };
}

export default AddCircle;
