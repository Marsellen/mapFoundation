import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { getLayersByNames } from 'src/utils/vectorUtils';

@inject('TaskStore')
@inject('DataLayerStore')
@inject('AttributeStore')
@inject('ToolCtrlStore')
@observer
class UnionBreak extends React.Component {
    render() {
        const {
            TaskStore: { isEditableTask },
            DataLayerStore: { updateKey, isUnionBreak }
        } = this.props;
        return (
            <ToolIcon
                key={updateKey}
                id="union-break"
                icon="lianhedaduan"
                title="联合打断"
                action={this.action}
                disabled={!isEditableTask}
                className="ad-tool-icon"
                focusClassName="ad-tool-icon-active"
                visible={isUnionBreak}
            />
        );
    }

    action = () => {
        const {
            ToolCtrlStore: { updateByEditLayer },
            AttributeStore: { hide, hideRelFeatures },
            DataLayerStore: {
                isTopView,
                isUnionBreak,
                setEditStatus,
                activeEditor,
                enableRegionSelect
            }
        } = this.props;

        if (isUnionBreak) {
            //退出联合打断模式，进入普通模式
            setEditStatus('nomal');
            //如果是俯视图模式，则设置框选可选图层为当前编辑图层
            isTopView && enableRegionSelect();
            message.info({
                content: '退出联合打断状态',
                key: 'union-break',
                duration: 1
            });
        } else {
            //退出当前编辑图层
            activeEditor();
            //更新编辑图层顶部工具栏
            updateByEditLayer();
            //进入联合打断模式，退出普通模式
            setEditStatus('union-break');
            //如果是俯视图模式，则设置框选可选图层为车道线和隔离带、护栏
            const layerNames = ['AD_LaneDivider', 'AD_RS_Barrier'];
            const layers = getLayersByNames(layerNames);
            isTopView && enableRegionSelect(layers);
            message.info({
                content: '进入联合打断状态，可选“车道线”+“隔离带、护栏”进行打断；不可进行其他编辑',
                key: 'union-break',
                duration: 0
            });
        }
        //隐藏属性窗口
        hide();
        //取消关联要素高亮
        hideRelFeatures();
    };
}

export default UnionBreak;
