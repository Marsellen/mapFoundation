import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@observer
class AddOutsideRectangle extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'new_vertical_matrix';
        return (
            <span>
                <ToolIcon
                    icon="renyiwaijiejuxing"
                    title="任意外接立面矩形"
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'new_vertical_matrix') return;
        DataLayerStore.newVerticalMatrix();
    };

    content = () => {
        return <label>添加外接立面矩形</label>;
    };
}

export default AddOutsideRectangle;
