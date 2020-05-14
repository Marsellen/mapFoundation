import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import CheckButton from 'src/components/CheckButton';
import BatchSnapLineToStopLine from './BatchHandleTools/BatchSnapLineToStopLine';
import BatchAssignLaneNo from './BatchHandleTools/BatchAssignLaneNo';

const EDIT_TYPES = ['line_snap_stop', 'assign_line_batch'];

const OPTIONS = {
    LINE_FEATURES_SNAP_TO_STOP_LINE: {
        key: 'xianyaosuduiqidaotingzhixian',
        title: '线要素对齐到停止线',
        actionid: 'line-snap-stop-btn'
    },
    ASSIGN_LINE_NO_IN_BATCH: {
        key: 'piliangfuchedaofenzubianhao',
        title: '批量赋车道分组编号',
        actionid: 'assign-line-batch-btn'
    }
};

@inject('DataLayerStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@inject('ToolCtrlStore')
@observer
class BatchToolBox extends React.Component {
    render() {
        const { ToolCtrlStore } = this.props;
        let batchTools = ToolCtrlStore.batchTools;
        return (
            <CheckButton
                defaultOption={this.getDefaultOption()}
                disabled={this.disabled()}
                contentTitle="批处理工具"
                renderContent={this.renderContent}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
                hideDropdown={batchTools.length < 2}
            />
        );
    }

    getDefaultOption = () => {
        const { ToolCtrlStore, DataLayerStore } = this.props;

        let batchTools = ToolCtrlStore.batchTools;
        let firstTool = batchTools[0];
        let layer = DataLayerStore.getEditLayer();
        let layerName = layer ? layer.layerName : '';

        return firstTool
            ? {
                  id: layerName,
                  ...OPTIONS[firstTool]
              }
            : {};
    };

    disabled = key => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;
        if (!key || key == 'xianyaosuduiqidaotingzhixian') {
            return !activeTaskId;
        } else {
            return !activeTaskId || !pointCloudChecked;
        }
    };

    renderContent = selectedKey => {
        const { ToolCtrlStore } = this.props;
        let batchTools = ToolCtrlStore.batchTools;
        let menus = this.getMenus();
        return (
            <Menu
                onClick={this.action}
                selectedKeys={[selectedKey]}
                style={{ width: 227 }}>
                {menus.filter(menu => batchTools.includes(menu.props.name))}
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

    getMenus = () => {
        const { DataLayerStore } = this.props;
        const editLayer = DataLayerStore.getEditLayer();
        let layerName = editLayer && editLayer.layerName;
        let startNumber = layerName === 'AD_Lane' ? '1' : '0';
        const menus = [
            <Menu.Item
                name="LINE_FEATURES_SNAP_TO_STOP_LINE"
                key="xianyaosuduiqidaotingzhixian"
                title="线要素对齐到停止线"
                actionid="line-snap-stop-btn">
                <BatchSnapLineToStopLine />
            </Menu.Item>,
            <Menu.Item
                name="ASSIGN_LINE_NO_IN_BATCH"
                key="piliangfuchedaofenzubianhao"
                title="批量赋车道分组编号"
                actionid="assign-line-batch-btn">
                <BatchAssignLaneNo
                    layerName={layerName}
                    startNumber={startNumber}
                />
            </Menu.Item>
        ];
        return menus;
    };
}

export default BatchToolBox;
