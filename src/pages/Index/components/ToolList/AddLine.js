import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddLine extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_line';
        return (
            <div id="add-line-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="icon-line-graph" />
                <div>绘制线要素</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_line') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newLine();
    };

    content = () => {
        return <label>绘制线要素</label>;
    };
}

export default AddLine;
