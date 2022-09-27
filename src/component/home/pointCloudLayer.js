import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/point-cloud.less';
import AdTree from 'src/component/common/adTree';
import ToolIcon from 'src/component/common/toolIcon';

import { Button, Switch, Col, Row, Tree } from 'antd';
import { DataNode } from 'antd/es/tree';

import DataLayerStore from 'src/store/home/dataLayerStore';
import mapStore from 'src/store/home/mapStore';
const { TreeNode } = Tree;

@inject('fileStore')
@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    state = {
        expandedKeys: ['0-0'],
        autoExpandParent: true,
        checkedKeys: ['0-0'],
        selectedKeys: [],
    };
    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    handleChange = (e, key) => {
        const { PointCloudStore, DataLayerStore } = this.props;
        const { checked } = e.target;
        DataLayerStore.exitReadCoordinate();
        PointCloudStore.toggleChecked(key, checked, 'checked');
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys);
        if (info.node.props.eventKey === '0-0') {
            let layers = window.vectorLayerGroup.layers;
            layers.forEach(layer => {
                info.checked ? layer.layer.show() : layer.layer.hide();
            });
        }
        else {
            let layer = mapStore.getVectorLayer(window.vectorLayerGroup, info.node.props.eventKey);
            info.checked ? layer.show() : layer.hide();
        }
        this.setState({ checkedKeys });
    };
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    render() {
        const { pointCloudMap, toggleStretch, updateKey, same, toggleSame } =
            this.props.PointCloudStore;
        let treeData = this.props.fileStore.treeDataList();
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
                <div>图层控制</div>
                {/* {treeData[0].children.length > 0 ? treeData[0].children[treeData[0].children.length - 1].key : null} */}
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    // onSelect={this.onSelect}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>
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
