import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@inject('DataLayerStore')
@inject('ToolCtrlStore')
@inject('AttributeStore')
@inject('RightMenuStore')
@observer
class TopView extends React.Component {
    render() {
        const { TaskStore, DataLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { isTopView } = DataLayerStore;
        return activeTaskId ? (
            <div placement="bottom" title="俯视图模式" className="zoom-scale">
                <IconFont
                    id="top-view-btn"
                    type="icon-fushitu"
                    className={
                        !isTopView ? 'ad-icon' : 'ad-icon-active-topview'
                    }
                    onClick={this.action}
                />
            </div>
        ) : (
            <span />
        );
    }

    action = () => {
        // map.setView('U');
        // 按钮选中状态
        const {
            DataLayerStore,
            ToolCtrlStore,
            AttributeStore,
            RightMenuStore
        } = this.props;
        const { isTopView } = DataLayerStore;

        DataLayerStore.topViewMode(!isTopView);

        if (!isTopView) {
            window.map.setCurrentView('U');
            window.map.disableRotate();
            ToolCtrlStore.updateByEditLayer();
            DataLayerStore.enableRegionSelect();
            DataLayerStore.activeEditor();
            AttributeStore.hide();
            RightMenuStore.hide();
        } else {
            window.map.enableRotate();
            DataLayerStore.disableRegionSelect();
        }
    };
}

export default TopView;
