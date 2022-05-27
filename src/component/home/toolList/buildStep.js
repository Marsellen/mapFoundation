import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/set-step-size.less';
import ToolIcon from 'src/component/common/toolIcon';
import StepSize from './stepSize';

@inject('TaskStore')
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
                hh
            </div>
        );
    };

    render() {
        return (
            <ToolIcon
                icon="yichaisantubiao"
                title="逻辑构建"
                visible={this.state.clicked}
                disabled={this.isDisabled()}
                popover={{
                    title: '逻辑构建',
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
