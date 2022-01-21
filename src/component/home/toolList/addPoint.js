import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/component/common/adMessage';
import { editLock } from 'src/util/decorator';

import 'less/tool-icon.less';

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
