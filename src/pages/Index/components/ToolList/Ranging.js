// 测距
import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import 'less/components/tool-icon.less';

@inject('DataLayerStore')
@inject('RightMenuStore')
@observer
class Ranging extends React.Component {
    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'meature_distance';
        return (
            <div id="ceju-btn" className="flex-1" onClick={this.action}>
                <IconFont type="icon-ceju1" />
                <div>测距</div>
                <AdMessage visible={visible} content={this.content()} />
            </div>
        );
    }

    action = () => {
        if (this.props.disabled) return;
        const { DataLayerStore, RightMenuStore } = this.props;
        RightMenuStore.hide();
        let mode = DataLayerStore.getMeasureControlMode();
        if (mode == 71) return;
        DataLayerStore.startMeatureDistance();
    };

    content = () => {
        return <label>开始测距，按esc退出</label>;
    };
}

export default Ranging;
