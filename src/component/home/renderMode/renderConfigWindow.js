import React from 'react';
import 'src/asset/less/define-mode.less';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd';
import TextConfig from 'src/component/home/renderMode/textConfig';
import VectorConfig from 'src/component/home/renderMode/vectorConfig';

const { TabPane } = Tabs;
const SUPPORT_VECTOR_CONFIG_MODE = ['common', 'selfCheck', 'check', 'define', 'update'];

@inject('RenderModeStore')
@observer
class RenderConfigWindow extends React.Component {
    state = { tabKey: '' };

    handleChange = tabKey => {
        this.setState({ tabKey });
    };

    render() {
        const { tabKey } = this.state;
        const { RenderModeStore: { activeMode } = {} } = this.props;
        const isSupportVectorConfig = SUPPORT_VECTOR_CONFIG_MODE.includes(activeMode);
        const defaultTabKey = isSupportVectorConfig ? 'icon' : 'text';
        const currentTabKey = tabKey || defaultTabKey;
        return (
            <div className={`define-mode-wrap ${currentTabKey}-width`}>
                <Tabs animated={false} onChange={this.handleChange}>
                    {isSupportVectorConfig && (
                        <TabPane tab="符号设置" key="icon">
                            <VectorConfig />
                        </TabPane>
                    )}
                    <TabPane tab="注记设置" key="text">
                        <TextConfig />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default RenderConfigWindow;
