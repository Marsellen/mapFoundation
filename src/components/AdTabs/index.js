import React from 'react';
import { Tabs } from 'antd';

class AdTabs extends React.Component {
    render() {
        /** tabs [{label: '基础属性'， ...props}] */
        const { tabs, updateKey } = this.props;
        return (
            <div className="card-container">
                <Tabs type="card">
                    {tabs.map((tab, index) => (
                        <Tabs.TabPane tab={tab.label} key={index}>
                            <div key={updateKey}>
                                {React.Children.map(this.props.children, child => {
                                    if (child.key != tab.key) return;
                                    return child;
                                })}
                            </div>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default AdTabs;
