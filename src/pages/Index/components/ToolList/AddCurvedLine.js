import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddCurvedLine extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_curved_line';
        return (
            <div
                id="add-curved-line-btn"
                className="flex-1"
                onClick={this.action}>
                <ToolIcon icon="huizhiquxian" />
                <div>绘制曲线</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_curved_line') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newCurvedLine();
    };

    content = () => {
        return <label>绘制曲线</label>;
    };
}

export default AddCurvedLine;
