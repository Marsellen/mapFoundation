import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/SetStepSize.less';
import ToolIcon from 'src/components/ToolIcon';
import StepSize from './StepSize';

@inject('TaskStore')
@inject('ResourceLayerStore')
@observer
class SetStepSize extends React.Component {
    state = {
        clicked: false
    };

    handleClickChange = visible => {
        if (this.isDisabled()) return;
        this.setState({
            clicked: visible
        });
    };

    isDisabled = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return !activeTaskId;
    };

    _renderContent = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <div className="SetStepSize">
                <div className="SetStepSize-top">
                    <StepSize activeTaskId={activeTaskId} key={this.state.clicked} />
                </div>
                <div className="SetStepSize-content">
                    <p>相关快捷键：</p>
                    <p>W(前进)、S(后退)</p>
                    <p>A(左移)、D(右移)、E(上移)、Q(下移)</p>
                    <p>←(左旋)、→(右旋)、↑(上旋)、↓(下旋)</p>
                </div>
            </div>
        );
    };

    render() {
        return (
            <ToolIcon
                icon="shijiaobufushezhi"
                title="视角快捷键步幅设置"
                visible={this.state.clicked}
                disabled={this.isDisabled()}
                popover={{
                    title: '视角快捷键步幅设置',
                    placement: 'bottom',
                    visible: this.state.clicked,
                    onVisibleChange: this.handleClickChange,
                    content: this._renderContent(),
                    trigger: 'click'
                }}
            />
        );
    }
}

export default SetStepSize;
