import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import { editLock } from 'src/utils/decorator';

import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddPoint extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_point';
        return (
            <div id="add-point-btn" className="flex-1" onClick={this.action}>
                <ToolIcon icon="yuandianzhong" />
                <div>绘制点要素</div>
                <AdMessage visible={visible && DataLayerStore.isMessage} content={this.content()} />
            </div>
        );
    }

    @editLock
    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_point') return;
        AttributeStore.hide('other_close');
        AttributeStore.hideRelFeatures();
        DataLayerStore.newPoint();
    };

    content = () => {
        return <label>绘制点要素</label>;
    };
}

export default AddPoint;
