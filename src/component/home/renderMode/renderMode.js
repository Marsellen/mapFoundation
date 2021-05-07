import React from 'react';
import { Modal, Button } from 'antd';
import 'src/asset/less/render-mode.less';
import { observer, inject } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';
import { RENDER_MODE_MAP } from 'src/config/renderModeConfig';

@inject('DefineModeStore')
@inject('TextStore')
@inject('AttributeStore')
@inject('DataLayerStore')
@inject('TaskStore')
@inject('RenderModeStore')
@observer
class RenderMode extends React.Component {
    state = {
        visible: false,
        mode: 'common'
    };

    //打开渲染模式弹窗
    handleClick = () => {
        const { RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        this.setState({
            visible: true,
            mode: activeMode
        });
    };

    //关闭渲染模式弹窗
    handleClose = () => {
        this.setState({
            visible: false
        });
    };

    //渲染弹窗内按钮点击事件
    chooseMode = item => {
        const { mode } = item;
        this.setState({
            mode
        });
    };

    //应用渲染模式
    handleOk = () => {
        Modal.confirm({
            title: '切换渲染模式，此前的渲染配置都清空，是否继续？',
            okText: '确定',
            cancelText: '取消',
            zIndex: 99999,
            onOk: () => {
                const {
                    DataLayerStore,
                    RenderModeStore,
                    AttributeStore,
                    TextStore,
                    TaskStore: { taskProcessName }
                } = this.props;
                const { mode } = this.state;
                //设置渲染模式
                RenderModeStore.setMode(mode);
                //关闭渲染模式弹窗
                this.setState({
                    visible: false
                });
                //清除要素选中效果
                DataLayerStore.clearPick();
                //隐藏属性窗口
                AttributeStore.hide('other_close');
                //初始化文字注记配置
                TextStore.initTextConfig(mode, taskProcessName);
                //关闭文字注记弹窗
                TextStore.hide();
                //重设画布渲染样式
                this.resetStyleConfig(mode);
            }
        });
    };

    resetStyleConfig = mode => {
        const {
            TaskStore: { taskProcessName },
            RenderModeStore,
            DefineModeStore
        } = this.props;
        const { setRels } = RenderModeStore;
        const { initVectorConfig } = DefineModeStore;

        switch (mode) {
            case 'common':
            case 'check':
            case 'define':
            case 'selfCheck':
                initVectorConfig(mode, taskProcessName);
                break;
            case 'relation':
                initVectorConfig(mode, taskProcessName);
                //将有关联关系的要素，按专题图进行分组
                setRels();
                break;
            default:
                break;
        }
    };

    render() {
        const { visible, mode } = this.state;
        const { TaskStore, RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        const { activeTaskId } = TaskStore;
        const disabled = activeMode === mode;
        return (
            <div>
                <ToolIcon
                    icon="xuanranmoshi"
                    title="渲染模式"
                    placement="right"
                    className="ad-menu-icon"
                    visible={visible}
                    disabled={!activeTaskId}
                    action={this.handleClick}
                />

                <Modal
                    className="render-mode"
                    title="渲染模式"
                    visible={visible}
                    footer={null}
                    onCancel={this.handleClose}
                    width={840}
                    maskClosable={false}
                    zIndex={9999}
                >
                    <div className="modal-body">
                        <ul>
                            {RENDER_MODE_MAP.map((item, index) => (
                                <li
                                    className={item.mode === mode ? 'on' : ''}
                                    key={`mode-${index}`}
                                    onClick={() => this.chooseMode(item)}
                                >
                                    <div className="checkbox"></div>
                                    <div>
                                        <img src={item.icon} />
                                        <p className="bold">{item.title}</p>
                                        <div className="desc">{item.desc}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="button-wrap">
                            <Button
                                type="primary"
                                onClick={this.handleOk}
                                style={{ width: 100 }}
                                disabled={disabled}
                            >
                                应用
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default RenderMode;
