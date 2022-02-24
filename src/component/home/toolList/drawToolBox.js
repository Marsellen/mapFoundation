import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import CheckButton from 'src/component/common/checkButton';
import AddLine from 'src/component/home/toolList/addLine';
import AddCircle from 'src/component/home/toolList/addCircle';
import AddPoint from 'src/component/home/toolList/addPoint';
import AddPolygon from 'src/component/home/toolList/addPolygon';
import AddFacadeRectangle from 'src/component/home/toolList/addFacadeRectangle';
import AddGroundRectangle from 'src/component/home/toolList/addGroundRectangle';
import AddOutsideRectangle from 'src/component/home/toolList/addOutsideRectangle';
import DividerToAutoCreate from 'src/component/home/toolList/halfAutoTools/dividerToAutoCreate';
import NewStraightLine from 'src/component/home/toolList/halfAutoTools/newStraightLine';
import NewTurnLine from 'src/component/home/toolList/halfAutoTools/newTurnLine';
import NewUTurnLine from 'src/component/home/toolList/halfAutoTools/newUTurnLine';
import AddCurvedLine from 'src/component/home/toolList/addCurvedLine';
import DashedPolygonCreate from 'src/component/home/toolList/dashedPolygonCreate';
import TemplateArrow from 'src/component/home/toolList/templateArrow';

const EDIT_TYPES = [
    'new_point',
    'new_line',
    'new_curved_line',
    'new_polygon',
    'new_facade_rectangle',
    'new_vertical_matrix',
    'new_circle',
    'new_ground_rectangle',
    'new_around_line',
    'new_straight_line',
    'new_turn_line',
    'new_Uturn_line',
    'dashed_polygon_create',
    'new_template_arrow'
];

const OPTIONS = {
    POINT: {
        key: 'yuandianzhong',
        title: '绘制点要素',
        actionid: 'add-point-btn'
    },
    LINE: {
        key: 'line-graph',
        title: '绘制折线',
        actionid: 'add-line-btn'
    },
    CURVED_LINE: {
        key: 'huizhiquxian',
        title: '绘制曲线',
        actionid: 'add-curved-line-btn'
    },
    POLYGON: {
        key: 'xiankuang1',
        title: '绘制面要素',
        actionid: 'add-polygon-btn'
    },
    ADD_OUTSIDE_RECTANGLE: {
        key: 'renyiwaijiejuxing',
        title: '绘制任意外接立面矩形',
        actionid: 'add-outside-rectangle-btn'
    },
    ADD_GROUND_RECTANGLE: {
        key: 'dimianjuxing',
        title: '绘制地面矩形',
        actionid: 'add-ground-rectangle-btn'
    },
    ADD_TEMPLATE_ARROW: {
        key: 'huizhimubanjiantou',
        title: '绘制模板箭头',
        actionid: 'add-template-arrow-btn'
    }
};

@inject('DataLayerStore')
@inject('TaskStore')
@inject('ResourceLayerStore')
@inject('ToolCtrlStore')
@observer
class DrawToolBox extends React.Component {
    render() {
        const { ToolCtrlStore } = this.props;
        const drawTools = this.getDrawTools();
        return (
            <CheckButton
                key={ToolCtrlStore.updateKey}
                defaultOption={this.getDefaultOption()}
                disabled={this.disabled()}
                contentTitle="绘制工具"
                renderContent={this.renderContent}
                active={this.getActive()}
                onRef={ref => (this.checkButton = ref)}
                hideDropdown={drawTools.length < 2}
            />
        );
    }

    getDefaultOption = () => {
        const { DataLayerStore } = this.props;
        let drawTools = this.getDrawTools();
        let firstTool = drawTools[0];
        let layer = DataLayerStore.getAdEditLayer();
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
        let drawTools = this.getDrawTools();
        let menus = this.getMenus();
        return (
            <Menu onClick={this.action} selectedKeys={[selectedKey]} style={{ width: 227 }}>
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
        let layer = DataLayerStore.getAdEditLayer();
        let layerName = layer ? layer.layerName : '';
        const menus = [
            <Menu.Item name="POINT" key="yuandianzhong" title="绘制点要素" actionid="add-point-btn">
                <AddPoint />
            </Menu.Item>,
            <Menu.Item name="LINE" key="line-graph" title="绘制折线" actionid="add-line-btn">
                <AddLine />
            </Menu.Item>,
            <Menu.Item
                name="CURVED_LINE"
                key="huizhiquxian"
                title="绘制曲线"
                actionid="add-curved-line-btn"
            >
                <AddCurvedLine />
            </Menu.Item>,
            <Menu.Item
                name="POLYGON"
                key="xiankuang1"
                title="绘制面要素"
                actionid="add-polygon-btn"
            >
                <AddPolygon />
            </Menu.Item>,
            <Menu.Item
                name="ADD_FACADE_RECTANGLE"
                key="limianjuxing"
                title="绘制两点立面矩形"
                actionid="add-facade-rectangle-btn"
            >
                <AddFacadeRectangle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_OUTSIDE_RECTANGLE"
                key="renyiwaijiejuxing"
                title="绘制任意外接立面矩形"
                actionid="add-outside-rectangle-btn"
            >
                <AddOutsideRectangle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_CIRCLE"
                key="sandianhuayuan"
                title="绘制三点圆形"
                actionid="add-circle-btn"
            >
                <AddCircle />
            </Menu.Item>,
            <Menu.Item
                name="ADD_TEMPLATE_ARROW"
                key="huizhimubanjiantou"
                title="绘制模板箭头"
                actionid="add-template-arrow-btn"
            >
                <TemplateArrow />
            </Menu.Item>,
            <Menu.Item
                name="ADD_GROUND_RECTANGLE"
                key="dimianjuxing"
                title="绘制地面矩形"
                actionid="add-ground-rectangle-btn"
            >
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
                title={layerName == 'AD_Lane' ? '左右车道线生成中心线' : '路段中参考线生成'}
                actionid="divider-to-auto-create"
            >
                <DividerToAutoCreate />
            </Menu.Item>,
            <Menu.Item
                name="NEW_STRAIGHT_LINE"
                key="zhixing1"
                title={layerName == 'AD_Lane' ? '路口内直行中心线生成' : '路口内直行参考线生成'}
                actionid="new-straight-line"
            >
                <NewStraightLine />
            </Menu.Item>,
            <Menu.Item
                name="NEW_TURN_LINE"
                key="zhuanwan"
                title={layerName == 'AD_Lane' ? '路口内转弯中心线生成' : '路口内转弯参考线生成'}
                actionid="new-turn-line"
            >
                <NewTurnLine />
            </Menu.Item>,
            <Menu.Item
                name="NEW_UTURN_LINE"
                key="diaotou"
                title={layerName == 'AD_Lane' ? '掉头中心线生成' : '掉头参考线生成'}
                actionid="new-uturn-line"
            >
                <NewUTurnLine />
            </Menu.Item>,
            <Menu.Item
                name="DASHED_POLYGON_CREATE"
                key="xuxianmiangoujian"
                title="虚线面构建"
                actionid="dashed-polygon-create"
            >
                <DashedPolygonCreate />
            </Menu.Item>
        ];

        return menus;
    };

    getDrawTools = () => {
        const { ToolCtrlStore } = this.props;
        return ToolCtrlStore.drawTools || [];
    };
}

export default DrawToolBox;