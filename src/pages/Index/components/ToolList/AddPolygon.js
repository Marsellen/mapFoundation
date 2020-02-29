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
            <span>
                <ToolIcon
                    id="add-polygon-btn"
                    icon="xiankuang1"
                    title="添加面要素"
                    className="ad-tool-icon"
                    focusBg={true}
                    visible={visible}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_polygon') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newPolygon();
    };

    content = () => {
        return <label>添加面要素</label>;
    };
}

export default AddPolygon;
