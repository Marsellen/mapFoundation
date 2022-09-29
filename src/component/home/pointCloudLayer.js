import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/asset/less/point-cloud.less';
import AdTree from 'src/component/common/adTree';
import ToolIcon from 'src/component/common/toolIcon';

import { Button, Switch, Col, Row, Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import mapStore from 'src/store/home/mapStore';
const { TreeNode } = Tree;

@inject('fileStore')
@inject('DataLayerStore')
@inject('PointCloudStore')
@observer
class PointCloudLayer extends React.Component {
    constructor() {
        super();
        this.state = {
            expandedKeys: ['0-0'],
            autoExpandParent: true,
            checkedKeys: ['0-0'],
            selectedKeys: []
        };
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        this.setState({
            expandedKeys,
            autoExpandParent: false
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
        let layers = null;
        if (info.node.props.eventKey === '0-0') {
            const { treeData } = this.props.fileStore;
            if (treeData.length > 0) {
                treeData[0].children.forEach(item => {
                    layers = mapStore.getLayersByName(item.key);
                    layers.forEach(layer => {
                        info.checked ? layer.layer.show() : layer.layer.hide();
                    });
                });
            }
        } else {
            layers = mapStore.getLayersByName(info.node.props.eventKey);
            layers.forEach(layer => {
                info.checked ? layer.layer.show() : layer.layer.hide();
            });
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

    setTreeData = data => {
        const { fileStore } = this.props;
        fileStore.setTreeData(2);
    };

    render() {
        const { PointCloudStore, fileStore } = this.props;
        const { pointCloudMap, toggleStretch, updateKey, same, toggleSame } = PointCloudStore;
        const { treeData } = fileStore;

        return (
            <div className="point-cloud-layer">
                <div className="layer-control">
                    <span className="layer-control-name">图层控制</span>
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
