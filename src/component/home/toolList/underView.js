import React from 'react';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';

@inject('TaskStore')
@observer
class UnderView extends React.Component {
    render() {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <div>
                <ToolIcon
                    id="under-view-btn"
                    icon="compass"
                    title="视角还原"
                    placement="left"
                    className="ad-icon-topview"
                    action={this.action}
                />
            </div>
        );
    }

    action = () => {
        if (!window.vectorLayer) return;
        const region = window.vectorLayer.getAllFeatures()[0];
        const regionGeometry = region.data.geometry;
        const regionExtent = map.getExtent(regionGeometry);
        map.setExtent(regionExtent);
    };
}

export default UnderView;
