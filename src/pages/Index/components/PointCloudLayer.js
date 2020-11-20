import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/point-cloud.less';
import AdTree from 'src/components/AdTree';

@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    handleChange = (e, key) => {
        const { PointCloudStore, DataLayerStore } = this.props;
        const { checked } = e.target;
        DataLayerStore.exitReadCoordinate();
        PointCloudStore.toggleChecked(key, checked);
    };

    render() {
        const { pointCloudMap, toggleStretch, updateKey } = this.props.PointCloudStore;

        return (
            <div className="point-cloud-layer">
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
