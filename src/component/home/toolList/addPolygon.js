import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/component/common/adMessage';
import { editLock } from 'src/util/decorator';

import 'less/tool-icon.less';

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
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
            </div>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_polygon') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newPolygon();
    };

    content = () => {
        return <label>绘制面要素</label>;
    };
}

export default AddPolygon;
