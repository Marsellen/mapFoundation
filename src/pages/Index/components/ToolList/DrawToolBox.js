import React from 'react';
import { Menu, Empty } from 'antd';
import CheckButton from 'src/components/CheckButton';
import { inject, observer } from 'mobx-react';
import AddLine from './AddLine';
import AddCircle from './AddCircle';
import AddPoint from './AddPoint';
import AddPolygon from './AddPolygon';
import AddFacadeRectangle from './AddFacadeRectangle';
import AddGroundRectangle from './AddGroundRectangle';
import AddOutsideRectangle from './AddOutsideRectangle';
import DividerToAutoCreate from './HalfAutoTools/DividerToAutoCreate';
import NewStraightLine from './HalfAutoTools/NewStraightLine';
import NewTurnLine from './HalfAutoTools/NewTurnLine';
import NewUTurnLine from './HalfAutoTools/NewUTurnLine';

const EDIT_TYPES = [
    'new_point',
    'new_line',
    'new_polygon',
    'new_facade_rectangle',
    'new_vertical_matrix',
    'new_circle',
    'new_ground_rectangle',
    'new_around_line',
    'new_straight_line',
    'new_turn_line',
    'new_Uturn_line'
];

const OPTIONS = {
    POINT: {
        key: 'yuandianzhong',
        title: '绘制点要素',
        actionid: 'add-point-btn'
    },
    LINE: {
        key: 'icon-line-graph',
        title: '绘制线要素',
        actionid: 'add-line-btn'
    },
    POLYGON: {
        key: 'xiankuang1',
        title: '绘制面要素',
        actionid: 'add-polygon-btn'
    }
};

@inject('DataLayerStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@inject('ToolCtrlStore')
@observer
class DrawToolBox extends React.Component {
    render() {
        return (
            <CheckButton
                defaultOption={this.getDefaultOption()}
                disabled={this.disabled()}
                contentTitle="绘制工具"
                renderContent={this.renderContent}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
            />
        );
    }

    getDefaultOption = () => {
        const { ToolCtrlStore, DataLayerStore } = this.props;
        let { drawTools } = ToolCtrlStore;
        let firstTool = drawTools[0];
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
        if (!key || key == 'yuandianzhong') {
            return !activeTaskId;
        } else {
            return !activeTaskId || !pointCloudChecked;
        }
    };

    renderContent = selectedKey => {
        const { ToolCtrlStore } = this.props;
        let { drawTools } = ToolCtrlStore;
        let menus = this.getMenus();
        return (
            <Menu
                onClick={this.action}
                selectedKeys={[selectedKey]}
                style={{ width: 227 }}>
                {menus.filter(menu => drawTools.includes(menu.props.name))}
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
        let layer = DataLayerStore.getEditLayer();
        let layerName = layer ? layer.layerName : '';
        const menus = [
            <Menu.Item
                name="POINT"
                key="yuandianzhong"
                title="绘制点要素"
                actionid="add-point-btn">
                <AddPoint />
            </Menu.Item>,
            <Menu.Item
                name="LINE"
                key="icon-line-graph"
                title="绘制线要素"
                actionid="add-line-btn">
                <AddLine />
            </Menu.Item>,
            <Menu.Item
                name="POLYGON"
                key="xiankuang1"
                title="绘制面要素"
                actionid="add-polygon-btn">
                <AddPolygon />
            </Menu.Item>,
            <Menu.Item
                name="ADD_FACADE_RECTANGLE"
                key="limianjuxing"
                title="绘制两点立面矩形"
                actionid="add-facade-rectangle-btn">
                <AddFacadeRectangle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_OUTSIDE_RECTANGLE"
                key="renyiwaijiejuxing"
                title="绘制任意外接立面矩形"
                actionid="add-outside-rectangle-btn">
                <AddOutsideRectangle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_CIRCLE"
                key="sandianhuayuan"
                title="绘制三点圆形"
                actionid="add-circle-btn">
                <AddCircle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_GROUND_RECTANGLE"
                key="dimianjuxing"
                title="绘制地面矩形"
                actionid="add-ground-rectangle-btn">
                <AddGroundRectangle />
            </Menu.Item>,
            <Menu.Divider name="DIVIDER" key="divider" />,
            <Menu.Item
                name="DIVIDER_TO_AUTO_CREATE"
                key={
                    layerName == 'AD_Lane'
                        ? 'zuoyouchedaoxianshengchengzhongxinxian'
                        : 'luduanzhongcankaoxian'
                }
                title={
                    layerName == 'AD_Lane'
                        ? '左右车道线生成中心线'
                        : '路段中参考线生成'
                }
                actionid="divider-to-auto-create">
                <DividerToAutoCreate />
            </Menu.Item>,
            <Menu.Item
                name="NEW_STRAIGHT_LINE"
                key="zhixing1"
                title={
                    layerName == 'AD_Lane'
                        ? '路口内直行中心线生成'
                        : '路口内直行参考线生成'
                }
                actionid="new-straight-line">
                <NewStraightLine />
            </Menu.Item>,
            <Menu.Item
                name="NEW_TURN_LINE"
                key="zhuanwan"
                title={
                    layerName == 'AD_Lane'
                        ? '路口内转弯中心线生成'
                        : '路口内转弯参考线生成'
                }
                actionid="new-turn-line">
                <NewTurnLine />
            </Menu.Item>,
            <Menu.Item
                name="NEW_UTURN_LINE"
                key="diaotou"
                title={
                    layerName == 'AD_Lane' ? '掉头中心线生成' : '掉头参考线生成'
                }
                actionid="new-uturn-line">
                <NewUTurnLine />
            </Menu.Item>
        ];

        return menus;
    };
}

export default DrawToolBox;
