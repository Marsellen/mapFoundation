// 测距
import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';

@inject('DataLayerStore')
@inject('TaskStore')
@observer
class Ranging extends React.Component {
    render() {
        const { TaskStore, DataLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
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
        let mode = DataLayerStore.getMeasureControlMode();
        if (mode == 71) return;
        DataLayerStore.startMeatureDistance();
    };

    content = () => {
        return <label>开始测距，按esc退出</label>;
    };
}

export default Ranging;
