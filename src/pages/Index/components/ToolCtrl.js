import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('ToolCtrlStore')
@observer
class ToolCtrl extends React.Component {
    componentDidMount() {
        const { ToolCtrlStore } = this.props;
        ToolCtrlStore.init();
    }

    render() {
        const { ToolCtrlStore } = this.props;
        const { tools } = ToolCtrlStore;
        return (
            <div className="flex-1 header-toolheight">
                {React.Children.map(this.props.children, child => {
                    if (tools && !tools[child.key]) return;
                    return child;
                })}
            </div>
        );
    }
}

export default ToolCtrl;
