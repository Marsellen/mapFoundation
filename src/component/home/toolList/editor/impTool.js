import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import AdMessage from 'src/component/common/adMessage';
import 'less/tool-icon.less';
import 'src/asset/less/add-rel.less';

@inject('DataLayerStore')
@observer
class EditorMode extends React.Component {
    constructor() {
        super();
    }
    render() {
        let visible = false;
        return (
            <span>
                <ToolIcon
                    id="add-rel-btn"
                    icon="xinzengguanxi"
                    title="切换编辑模式"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                />
                <AdMessage visible={visible} content={this.content()} />
            </span>
        );
    }

    action = () => {
        const { DataLayerStore } = this.props;
        DataLayerStore.editor.setEditorMode(!DataLayerStore.editor.isEditorMode);
    };

    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} /> 切换编辑模式
            </label>
        );
    };
}

export default EditorMode;
