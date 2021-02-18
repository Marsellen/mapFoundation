// 测距
import React from 'react';
import IconFont from 'src/components/IconFont';
import { inject, observer } from 'mobx-react';
import AdMessage from 'src/components/AdMessage';
import { editLock } from 'src/utils/decorator';

import 'less/components/tool-icon.less';

@inject('DataLayerStore')
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

    @editLock
    action = () => {
        if (this.props.disabled) return;
        const { editType, startMeatureDistance_1 } = this.props.DataLayerStore;
        if (editType == 'meature_distance') return;
        startMeatureDistance_1();
    };

    content = () => {
        return <label>开始测距，按esc退出</label>;
    };
}

export default Ranging;
