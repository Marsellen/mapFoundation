import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Tabs } from 'antd';
import DefineTextVectorConfig from 'src/pages/Index/components/RenderMode/DefineTextVectorConfig';
import DefineVectorConfig from 'src/pages/Index/components/RenderMode/DefineVectorConfig';
import { inject, observer } from 'mobx-react';

const { TabPane } = Tabs;

@inject('RenderModeStore')
@observer
class DefineRenderMode extends React.Component {
    render() {
        const { RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        const isDefineMode = activeMode === 'define';
        return (
            <div className="define-mode-wrap">
                <Tabs animated={false}>
                    {isDefineMode && (
                        <TabPane tab="符号设置" key="icon">
                            <DefineVectorConfig />
                        </TabPane>
                    )}
                    <TabPane tab="注记设置" key="text">
                        <DefineTextVectorConfig />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default DefineRenderMode;
