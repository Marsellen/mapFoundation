import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/point-cloud.less';
import AdTree from 'src/component/common/adTress';
import ToolIcon from 'src/component/common/toolIcon';

@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    handleChange = (e, key) => {
        const { PointCloudStore, DataLayerStore } = this.props;
        const { checked } = e.target;
        DataLayerStore.exitReadCoordinate();
        PointCloudStore.toggleChecked(key, checked, 'checked');
    };

    render() {
        const {
            pointCloudMap,
            toggleStretch,
            updateKey,
            same,
            toggleSame
        } = this.props.PointCloudStore;
        return (
            <div className="point-cloud-layer">
                <div className="same-box">
                    <ToolIcon
                        icon="lasliandong"
                        title="同名las同开同关"
                        placement="left"
                        className={`same-button ${same ? 'on' : ''}`}
                        action={toggleSame}
                    />
                </div>
                <AdTree
                    key={updateKey}
                    stretch={true}
                    handleStretch={toggleStretch}
                    dataSource={pointCloudMap}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default PointCloudLayer;
