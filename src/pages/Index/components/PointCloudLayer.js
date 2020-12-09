import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/point-cloud.less';
import AdTree from 'src/components/AdTree';
import ToolIcon from 'src/components/ToolIcon';

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
                        icon="renwuguanli"
                        title="同开同关"
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
