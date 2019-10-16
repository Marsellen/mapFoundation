import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('AttributeStore')
@observer
class AddPoint extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_point';
        return (
            <span className={visible ? 'ad-icon-active' : ''}>
                <ToolIcon
                    id="add-point-btn"
                    icon="yuandianzhong"
                    title="添加点要素"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore, AttributeStore } = this.props;
        if (DataLayerStore.editType == 'new_point') return;
        AttributeStore.hideRelFeatures();
        DataLayerStore.newPoint();
    };

    content = () => {
        return <label>添加点要素</label>;
    };
}

export default AddPoint;
