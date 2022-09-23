import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/point-cloud.less';
import AdTree from 'src/component/common/adTree';
import ToolIcon from 'src/component/common/toolIcon';

import { Button, Switch, Col, Row } from 'antd';

import DataLayerStore from 'src/store/home/dataLayerStore';

@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    handleChange = (e, key) => {
        alert(111);
        const { PointCloudStore, DataLayerStore } = this.props;
        const { checked } = e.target;
        DataLayerStore.exitReadCoordinate();
        PointCloudStore.toggleChecked(key, checked, 'checked');
    };

    render() {
        const { pointCloudMap, toggleStretch, updateKey, same, toggleSame } =
            this.props.PointCloudStore;
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
                <Row >
                    <Col >   操作器切换<Switch checkedChildren="地图" unCheckedChildren="轨道" defaultChecked onChange={(e) => this.onChange(e, 'control')} /></Col>
                    <Col> LOD控制<Switch checkedChildren="打开" unCheckedChildren="关闭" onChange={(e) => this.onChange(e, 'lod')} /></Col>
                    <Col> 编辑模式切换<Switch checkedChildren="打开" unCheckedChildren="关闭" defaultChecked onChange={(e) => this.onChange(e, 'mode')} />
                    </Col>
                </Row>
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
    onChange = (checked, key) => {
        if (key === 'control') {
            if (!checked) {
                window.map.viewer.setControls('OrbitControls');
            } else {
                window.map.viewer.setControls('EarthControls');
            }
        }
        else if (key === 'lod') {
            window.map.isLevel = checked;
        }
        else if (key === 'mode') {
            DataLayerStore.editor.setEditorMode(checked);
        }

    };
}

export default PointCloudLayer;
