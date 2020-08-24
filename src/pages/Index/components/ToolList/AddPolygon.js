import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddPolygon extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_polygon';
        return (
            <div id="add-polygon-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="xiankuang1" />
                <div>绘制面要素</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_polygon') return;
        AttributeStore.hide();
        AttributeStore.hideRelFeatures();
        DataLayerStore.newPolygon();
    };

    content = () => {
        return <label>绘制面要素</label>;
    };
}

export default AddPolygon;
