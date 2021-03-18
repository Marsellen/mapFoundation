import React from 'react';
import { Menu } from 'antd';
import CheckButton from 'src/components/CheckButton';
import { inject, observer } from 'mobx-react';
import Ranging from './Ranging';
// import ReadCoordinate from './ReadCoordinate';
import RoadSet from './RoadSet';
import BufferRender from './BufferRender';

const EDIT_TYPES = ['meature_distance', 'read_coordinate', 'select_road_plane', 'buffer_render'];

const TOOLS_NO_NEED_POINTCLOUD = ['ceju', 'bufferxuanran'];
@inject('DataLayerStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@observer
class ToolBox extends React.Component {
    render() {
        const {
            TaskStore: { activeTaskId }
        } = this.props;
        return (
            <CheckButton
                key={activeTaskId}
                defaultOption={{
                    key: 'ceju1',
                    title: '测距',
                    actionid: 'ceju-btn'
                }}
                disabled={this.disabled()}
                contentTitle="常用工具"
                renderContent={this.renderContent}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
            />
        );
    }

    disabled = key => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;
        if (!key || TOOLS_NO_NEED_POINTCLOUD.includes(key)) {
            return !activeTaskId;
        } else {
            return !activeTaskId || !pointCloudChecked;
        }
    };

    renderContent = selectedKey => {
        return (
            <Menu onClick={this.action} selectedKeys={[selectedKey]}>
                <Menu.Item
                    key="ceju1"
                    title="测距"
                    actionid="ceju-btn"
                    disabled={this.disabled('ceju')}
                >
                    <Ranging disabled={this.disabled('ceju')} />
                </Menu.Item>
                {/* <Menu.Item
                    key="zuobiaoshiqu1"
                    title="坐标拾取"
                    actionid="read-coordinate-btn"
                    disabled={this.disabled('zuobiaoshiqu')}>
                    <ReadCoordinate disabled={this.disabled('zuobiaoshiqu')} />
                </Menu.Item> */}
                <Menu.Item
                    name="BUFFER"
                    key="yaosulunkuobuffer"
                    title="要素轮廓buffer渲染"
                    actionid="buffer-btn"
                    disabled={this.disabled('bufferxuanran')}
                >
                    <BufferRender disabled={this.disabled('bufferxuanran')} />
                </Menu.Item>
                <Menu.Item
                    key="lumianshezhi"
                    title="路面设置"
                    actionid="road-set-btn"
                    disabled={this.disabled('lumianshezhi')}
                >
                    <RoadSet disabled={this.disabled('lumianshezhi')} />
                </Menu.Item>
            </Menu>
        );
    };

    action = e => {
        this.checkButton &&
            this.checkButton.togglePopover(false, {
                icon: e.key,
                ...e.item.props
            });
    };

    getActive = () => {
        const { DataLayerStore } = this.props;
        return EDIT_TYPES.includes(DataLayerStore.editType);
    };
}

export default ToolBox;
