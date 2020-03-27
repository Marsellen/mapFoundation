import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Tabs, Checkbox, Icon, Select } from 'antd';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdNodeSelect from 'src/components/Form/AdNodeSelect';
import AdColorSelect from 'src/components/Form/AdColorSelect';
import AdInputNumber from 'src/components/Form/AdInputNumber';

const { Option } = Select;
const { TabPane } = Tabs;

class DefineRenderMode extends React.Component {
    state = {
        isClassSet: false
    };

    toggle = () => {
        this.setState({
            isClassSet: !this.state.isClassSet
        });
    };

    handleChange = value => {
        console.log(`selected`, value);
    };

    handleColorChange = color => {
        console.log('color', color);
    };

    _setNode = () => {
        return (
            <div className="config-content config-content-1">
                <div className="flex-center">
                    <label>颜色:</label>
                    <AdColorInput
                        size={28}
                        icon="xianyaosu"
                        onClick={this.handleColorClick}
                        onChange={this.handleColorChange}
                    />
                </div>
                <div className="flex-center">
                    <label>样式:</label>
                    <AdNodeSelect
                        width={76}
                        options={[
                            { key: 0, icon: 'dianzhixian' },
                            { key: 1, icon: 'dianxuxian' },
                            { key: 2, icon: 'zhixian' },
                            { key: 3, icon: 'xuxian' }
                        ]}
                    />
                </div>
                <div className="flex-center">
                    <label>尺寸:</label>
                    <AdInputNumber
                        min={1}
                        max={10}
                        width={76}
                        defaultValue={3}
                        onChange={() => {}}
                    />
                </div>
            </div>
        );
    };

    _classSetNode = () => {
        return (
            <div className="config-content config-content-2">
                <div className="flex-between input-wrap">
                    <label>分类字段</label>
                    <Select defaultValue={0} style={{ width: 190 }}>
                        <Option value={0}>车道类型</Option>
                        <Option value={1}>车道通行方向</Option>
                        <Option value={2}>车道通行状态</Option>
                        <Option value={3}>车道最高行驶速度数据来源</Option>
                        <Option value={4}>车道最低行驶速度数据来源</Option>
                    </Select>
                </div>
                <div className="flex-between input-wrap">
                    <label>颜色</label>
                    <AdColorSelect
                        width={190}
                        options={[
                            { key: 0, color: 'yellow' },
                            { key: 1, color: 'blue' },
                            { key: 2, color: 'green' },
                            { key: 3, color: 'red' }
                        ]}
                    />
                </div>
                <div className="flex-between input-wrap">
                    <label>颜色设置</label>
                    <div className="flex-between input-box">
                        <AdColorInput
                            size={28}
                            icon="dianyaosu"
                            onClick={this.handleColorClick}
                            onChange={this.handleColorChange}
                        />
                        <AdNodeSelect
                            width={155}
                            options={[
                                { key: 0, icon: 'dianzhixian' },
                                { key: 1, icon: 'dianxuxian' },
                                { key: 2, icon: 'zhixian' },
                                { key: 3, icon: 'xuxian' }
                            ]}
                        />
                    </div>
                </div>
                <div className="flex-between input-wrap">
                    <label>普通机动车信号灯</label>
                    <div className="flex-between input-box">
                        <AdColorInput
                            size={28}
                            icon="mianyaosu"
                            onClick={this.handleColorClick}
                            onChange={this.handleColorChange}
                        />
                        <AdNodeSelect
                            width={155}
                            options={[
                                { key: 0, icon: 'zhixiankuang' },
                                { key: 1, icon: 'xuxiankuang' }
                            ]}
                        />
                    </div>
                </div>
                <div className="flex-between input-wrap">
                    <label>普通机动车信号灯</label>
                    <div className="flex-between input-box">
                        <AdColorInput
                            size={28}
                            icon="mianyaosu"
                            onClick={this.handleColorClick}
                            onChange={this.handleColorChange}
                        />
                        <AdNodeSelect
                            width={155}
                            size={18}
                            options={[
                                { key: 0, icon: 'dianyaosu' },
                                { key: 1, icon: 'dianfuhao' },
                                { key: 2, icon: 'dianfuhao1' },
                                { key: 3, icon: 'dianfuhao2' },
                                { key: 4, icon: 'dianfuhao3' },
                                { key: 5, icon: 'dianfuhao4' },
                                { key: 6, icon: 'dianfuhao5' },
                                { key: 7, icon: 'dianfuhao6' },
                                { key: 8, icon: 'dianfuhao7' },
                                { key: 9, icon: 'dianfuhao8' }
                            ]}
                        />
                    </div>
                </div>
                <div className="flex-between input-wrap">
                    <label>方向指示信号灯</label>
                    <div className="flex-between input-box">
                        <AdColorInput
                            size={28}
                            icon="xianyaosu"
                            onClick={this.handleColorClick}
                            onChange={this.handleColorChange}
                        />
                        <AdNodeSelect
                            width={76}
                            options={[
                                { key: 0, icon: 'jiantou' },
                                { key: 1, icon: 'wujiantou' }
                            ]}
                        />
                        <AdNodeSelect
                            width={76}
                            size={18}
                            options={[
                                { key: 0, icon: 'dianyaosu' },
                                { key: 1, icon: 'dianfuhao' },
                                { key: 2, icon: 'dianfuhao1' },
                                { key: 3, icon: 'dianfuhao2' },
                                { key: 4, icon: 'dianfuhao3' },
                                { key: 5, icon: 'dianfuhao4' },
                                { key: 6, icon: 'dianfuhao5' },
                                { key: 7, icon: 'dianfuhao6' },
                                { key: 8, icon: 'dianfuhao7' },
                                { key: 9, icon: 'dianfuhao8' }
                            ]}
                        />
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { isClassSet } = this.state;
        return (
            <div className="define-mode-wrap">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="符号设置" key="1">
                        <div className="config-title">
                            <div>
                                <Icon
                                    type={
                                        isClassSet ? 'caret-up' : 'caret-right'
                                    }
                                    className={isClassSet ? 'blue' : ''}
                                />
                                <span>车道中心线</span>
                            </div>
                            <Checkbox onChange={this.toggle}>分类设色</Checkbox>
                        </div>
                        {!isClassSet && this._setNode()}
                        {isClassSet && this._classSetNode()}
                    </TabPane>
                    <TabPane tab="注记设置" key="2" disabled>
                        注记设置
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default DefineRenderMode;
