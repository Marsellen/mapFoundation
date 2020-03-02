import React from 'react';
import { Menu } from 'antd';
import CheckButton from 'src/components/CheckButton';
import { inject, observer } from 'mobx-react';
import Ranging from './Ranging';
import ReadCoordinate from './ReadCoordinate';
import RoadSet from './RoadSet';

const EDIT_TYPES = ['meature_distance', 'read_coordinate', 'select_road_plane'];

@inject('DataLayerStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@observer
class ToolBox extends React.Component {
    render() {
        return (
            <CheckButton
                defaultOption={{
                    key: 'ceju',
                    title: '测距',
                    actionid: 'ceju-btn'
                }}
                disabled={this.disabled()}
                icon="chexiao"
                contentTitle="常用工具"
                content={this.renderContent()}
                action={this.action}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
            />
        );
    }

    disabled = key => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;
        if (!key || key == 'ceju') {
            return !activeTaskId;
        } else {
            return !activeTaskId || !pointCloudChecked;
        }
    };

    renderContent = () => {
        return (
            <Menu onClick={this.action}>
                <Menu.Item
                    key="ceju"
                    title="测距"
                    actionid="ceju-btn"
                    disabled={this.disabled('ceju')}>
                    <Ranging disabled={this.disabled('ceju')} />
                </Menu.Item>
                <Menu.Item
                    key="zuobiaoshiqu"
                    title="坐标拾取"
                    actionid="read-coordinate-btn1"
                    disabled={this.disabled('zuobiaoshiqu')}>
                    <ReadCoordinate disabled={this.disabled('zuobiaoshiqu')} />
                </Menu.Item>
                <Menu.Item
                    key="lumianshezhi"
                    title="路面设置"
                    actionid="road-set-btn"
                    disabled={this.disabled('lumianshezhi')}>
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
