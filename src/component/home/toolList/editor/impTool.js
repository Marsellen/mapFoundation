import React from 'react';
import ToolIcon from 'src/component/common/toolIcon';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import AdMessage from 'src/component/common/adMessage';
import 'less/tool-icon.less';
import 'src/asset/less/add-rel.less';

@observer
class ImpTool extends React.Component {
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

    };

    content = () => {
        return (
            <label>
                <Icon type="info-circle" onClick={this.renderTips} /> 导入GeoJSON数据
            </label>
        );
    };
}

export default ImpTool;
