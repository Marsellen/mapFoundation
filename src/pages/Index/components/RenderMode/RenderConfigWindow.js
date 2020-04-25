import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Tabs } from 'antd';
import TextConfig from 'src/pages/Index/components/RenderMode/TextConfig';
import VectorConfig from 'src/pages/Index/components/RenderMode/VectorConfig';
import { inject, observer } from 'mobx-react';

const { TabPane } = Tabs;

@inject('RenderModeStore')
@observer
class RenderConfigWindow extends React.Component {
    render() {
        const { RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        const isDefineMode = activeMode === 'define';
        return (
            <div className="define-mode-wrap">
                <Tabs animated={false}>
                    {isDefineMode && (
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
