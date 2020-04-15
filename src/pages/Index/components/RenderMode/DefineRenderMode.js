import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Tabs } from 'antd';
import DefineTextVectorConfig from 'src/pages/Index/components/RenderMode/DefineTextVectorConfig';
import DefineVectorConfig from 'src/pages/Index/components/RenderMode/DefineVectorConfig';

const { TabPane } = Tabs;

class DefineRenderMode extends React.Component {
    render() {
        return (
            <div className="define-mode-wrap">
                <Tabs defaultActiveKey="text" animated={false}>
                    <TabPane tab="符号设置" key="icon" disabled>
                        <DefineVectorConfig />
                    </TabPane>
                    <TabPane tab="注记设置" key="text">
                        <DefineTextVectorConfig />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default DefineRenderMode;
