import React from 'react';
import { Modal, Button } from 'antd';
import 'src/assets/less/components/render-mode.less';
import { observer, inject } from 'mobx-react';
import VectorsConfig from 'src/config/VectorsConfig';
import OutsideVectorsConfig from 'src/config/OutsideVectorsConfig';
import WhiteVectorsConfig from 'src/config/WhiteVectorsConfig';
import HalfWhiteVectorsConfig from 'src/config/HalfWhiteVectorsConfig';
import RelationRenderMode from './RelationRenderMode';
import ToolIcon from 'src/components/ToolIcon';
import { RENDER_MODE_MAP } from 'src/config/RenderModeConfig';

@inject('DataLayerStore')
@inject('TaskStore')
@inject('VectorsStore')
@inject('RenderModeStore')
@observer
class RenderMode extends React.Component {
    state = {
        visible: false,
        mode: 'common'
    };

    render() {
        const { visible, mode } = this.state;
        const { TaskStore, RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        const { activeTaskId } = TaskStore;
        const disabled = activeMode === mode;
        return (
            <div className="ad-sider-bottom-item">
                <ToolIcon
                    title="渲染模式"
                    placement="right"
                    icon="ditu"
                    disabled={!activeTaskId}
                    action={this.handleClick}
                />

                <Modal
                    className="render-mode"
                    visible={visible}
                    footer={null}
                    onCancel={this.handleClose}
                    bodyStyle={{ padding: 0 }}
                    maskClosable={false}
                >
                    <div className="title-wrap">渲染模式</div>
                    <div className="modal-body">
                        <ul>
                            {RENDER_MODE_MAP.map((item, index) => (
                                <li
                                    className={item.mode === mode ? 'on' : ''}
                                    key={`mode-${index}`}
                                    onClick={() => this.chooseMode(item)}
                                >
                                    <div>
                                        <b>{item.title}</b>
                                        <p className="desc">{item.desc}</p>
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
                {this.renderModeComponent()}
            </div>
        );
    }

    //渲染各模式组件
    renderModeComponent = () => {
        const { RenderModeStore } = this.props;
        const { activeMode } = RenderModeStore;
        switch (activeMode) {
            case 'common':
                return null;
            case 'update':
                return null;
            case 'relation':
                return <RelationRenderMode />;
            case 'define':
                return null;
            default:
                return null;
        }
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

    //应用渲染模式
    handleOk = () => {
        Modal.confirm({
            title: '切换渲染模式，此前的渲染配置都清空，是否继续？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                const { DataLayerStore, RenderModeStore } = this.props;
                const { mode } = this.state;
                RenderModeStore.setMode(mode);
                this.resetStyleConfig(mode);
                this.setState({
                    visible: false
                });
                DataLayerStore.clearPick();
            }
        });
    };

    resetStyleConfig = async mode => {
        if (!window.vectorLayerGroup) return;
        const { RenderModeStore } = this.props;
        switch (mode) {
            case 'common':
                if (window.vectorLayerGroup) {
                    window.vectorLayerGroup.resetStyleConfig(VectorsConfig);
                }
                if (window.boundaryLayerGroup) {
                    window.boundaryLayerGroup.resetStyleConfig(
                        OutsideVectorsConfig
                    );
                }
                break;
            case 'relation':
                if (window.vectorLayerGroup) {
                    window.vectorLayerGroup.resetStyleConfig(
                        WhiteVectorsConfig
                    );
                }
                if (window.boundaryLayerGroup) {
                    window.boundaryLayerGroup.resetStyleConfig(
                        HalfWhiteVectorsConfig
                    );
                }
                RenderModeStore.setRels();
                break;
            default:
                break;
        }
    };

    chooseMode = item => {
        const { mode } = item;
        this.setState({
            mode
        });
    };
}

export default RenderMode;
