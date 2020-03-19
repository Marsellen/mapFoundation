import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import CheckButton from 'src/components/CheckButton';
import LineFeaturesSnapToStopLine from './LineFeaturesSnapToStopLine';
import AssignLineNoInBatch from './AssignLineNoInBatch';

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
@inject('ToolCtrlStore')
@observer
class BatchToolBox extends React.Component {
    render() {
        return (
            <CheckButton
                defaultOption={this.getDefaultOption()}
                // disabled={this.disabled()}
                contentTitle="批处理工具"
                renderContent={this.renderContent}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
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
        const menus = [
            <Menu.Item
                name="LINE_FEATURES_SNAP_TO_STOP_LINE"
                key="xianyaosuduiqidaotingzhixian"
                title="线要素对齐到停止线"
                actionid="line-snap-stop-btn">
                <LineFeaturesSnapToStopLine />
            </Menu.Item>,
            <Menu.Item
                name="ASSIGN_LINE_NO_IN_BATCH"
                key="piliangfuchedaofenzubianhao"
                title="批量赋车道分组编号"
                actionid="assign-line-batch-btn">
                <AssignLineNoInBatch />
            </Menu.Item>
        ];
        return menus;
    };
}

export default BatchToolBox;
