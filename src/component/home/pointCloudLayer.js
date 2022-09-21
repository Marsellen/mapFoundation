import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/point-cloud.less';
import AdTree from 'src/component/common/adTree';
import ToolIcon from 'src/component/common/toolIcon';

import { Button } from 'antd';

@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    handleChange = (e, key) => {
        alert(111)
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

                <Button type="primary" onClick={() => this.handleClick('lod')} >关闭/打开LOD</Button>
                <Button type="primary" onClick={() => this.handleClick('controls')}>切换左右键操作方式</Button>
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
    handleClick = (e) => {
        if (e === 'lod') {
            window.map.isLevel = !window.map.isLevel;
        }
        else if (e === 'controls') {
            if (window.map._scene.view.navigationMode.name === 'EarthControls') {
                window.map.viewer.setControls("OrbitControls");
            }
            else {
                window.map.viewer.setControls("EarthControls");
            }
        }
    };

}

export default PointCloudLayer;
