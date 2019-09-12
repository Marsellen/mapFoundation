import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('ToolCtrlStore')
@observer
class ToolCtrl extends React.Component {
    componentDidMount() {
        const { ToolCtrlStore, match } = this.props;
        ToolCtrlStore.init();

        //判断是/source路由，即显示资料加载
        if (match.path.includes('source')) {
            ToolCtrlStore.updateEditTool({ RESOURCE_LOADER: true });
        }
    }

    render() {
        const { ToolCtrlStore } = this.props;
        const { tools } = ToolCtrlStore;
        return (
            <div className="flex-1">
                {React.Children.map(this.props.children, child => {
                    if (tools && !tools[child.key]) return;
                    return child;
                })}
            </div>
        );
    }
}

export default ToolCtrl;
