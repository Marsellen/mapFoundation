import React from 'react';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';

@inject('TaskStore')
@inject('DataLayerStore')
@observer
class TopView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconActive: false
        };
    }
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { iconActive } = this.state;
        return activeTaskId ? (
            <div placement="bottom" title="俯视图模式" className="zoom-scale">
                <IconFont
                    type="icon-fushitu"
                    className={!iconActive ? "ad-icon" : 'ad-icon-active-topview'}
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
        const { DataLayerStore } = this.props;
        const iconActive = this.state.iconActive;

        this.setState({
            iconActive: !iconActive
        });
        DataLayerStore.topViewMode(iconActive);
        map.setCurrentView('U');
    };
}

export default TopView;
