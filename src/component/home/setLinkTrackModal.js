import React from 'react';
import { inject, observer } from 'mobx-react';
import { message, Modal, Radio } from 'antd';
import ToolIcon from 'src/component/common/toolIcon';

@observer
@inject('TaskStore')
@inject('ResourceLayerStore')
class SetLinkTrackModal extends React.Component {
    constructor(props) {
        super(props);
        const { ResourceLayerStore } = this.props;
        this.state = {
            modalVisible: false,
            currentProjectName: ResourceLayerStore.activeProjectName || ''
        };
    }

    //打开“点云与轨迹联动设置”弹窗
    showModal = () => {
        this.setState({ modalVisible: true });
    };

    //切换轨迹radio onchange 事件
    handleChange = e => {
        this.setState({
            currentProjectName: e.target.value
        });
    };

    //“点云与轨迹联动设置”弹窗 确认事件
    handleOk = () => {
        const { currentProjectName } = this.state;
        const { ResourceLayerStore } = this.props;
        ResourceLayerStore.selectLinkTrack(currentProjectName);
        this.handleCancel();
        message.success('联动轨迹设置成功!');
    };

    //“点云与轨迹联动设置”弹窗 取消事件
    handleCancel = () => {
        this.setState({
            modalVisible: false
        });
    };

    render() {
        const { modalVisible, currentProjectName } = this.state;
        const { ResourceLayerStore, TaskStore } = this.props;
        const { activeProjectName } = ResourceLayerStore;
        const { projectNameArr } = TaskStore;

        return (
            <>
                <div className="img-window-top">
                    <ToolIcon
                        icon="guanlian"
                        title="设置"
                        placement="left"
                        className="img-window-top-icon"
                        disabled={projectNameArr.length <= 1}
                        action={this.showModal}
                    />
                </div>
                <Modal
                    title="点云与轨迹联动设置"
                    maskClosable={false}
                    width={'max-content'}
                    okText="确定"
                    cancelText="取消"
                    visible={modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{
                        disabled: currentProjectName === activeProjectName
                    }}
                    className="select-track-modal"
                    maskStyle={{ background: 'rgba(0, 0, 0, 0)' }}
                >
                    <p className="select-track-modal-title">联动轨迹选择：</p>
                    <Radio.Group value={currentProjectName} onChange={this.handleChange}>
                        {projectNameArr.map((projectName, index) => {
                            return (
                                <div key={`track_${index}`}>
                                    <Radio value={projectName}>
                                        工程{index + 1}：{projectName}
                                    </Radio>
                                </div>
                            );
                        })}
                    </Radio.Group>
                </Modal>
            </>
        );
    }
}

export default SetLinkTrackModal;
