// 测距
import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('taskStore')
@observer
class Ranging extends React.Component {
    render() {
        const { taskStore, DataLayerStore } = this.props;
        const { activeTaskId } = taskStore;
        let visible = DataLayerStore.editType == 'meature_distance';
        return (
            <span>
                <ToolIcon
                    icon="ceju"
                    title="测距"
                    action={this.action}
                    disabled={!activeTaskId}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'meature_distance') return;
        DataLayerStore.startMeatureDistance();
    };

    content = () => {
        return <label>请选择一个点开始测距</label>;
    };
}

export default Ranging;
