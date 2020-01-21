import React from 'react';
import { Tooltip, Modal, Icon, Button } from 'antd';
import IconFont from 'src/components/IconFont';
import 'src/assets/less/components/render-mode.less';
import { observer, inject } from 'mobx-react';

const RENDER_MODE_MAP = [
    {
        mode: 'common',
        title: '通用符号模式',
        desc: '用于基础的生产作业'
    },
    {
        mode: 'update',
        title: '更新查看模式',
        desc: '提供系统的更新状态符号策略\n及更新数据查看工具'
    },
    {
        mode: 'relation',
        title: '关联关系查看模式',
        desc: '提供系统的关联关系符号策略\n及关联关系查看工具'
    },
    {
        mode: 'define',
        title: '自定义符号模式',
        desc: '想看啥，自己选'
    }
];

@inject('RenderModeStore')
@observer
class RenderMode extends React.Component {
    state = {
        visible: false,
        mode: 'common'
    };

    render() {
        const { visible, mode } = this.state;
        return (
            <div className="ad-sider-bottom-item">
                <Tooltip
                    title="渲染模式"
                    placement="right"
                    onClick={this.handleClick}>
                    <IconFont type="icon-bangzhu" />
                </Tooltip>
                <Modal
                    className="render-mode"
                    visible={visible}
                    footer={null}
                    closable={false}
                    bodyStyle={{ padding: 0 }}>
                    <div className="title-wrap">
                        <b className="title">渲染模式</b>
                        <span className="close" onClick={this.handleClose}>
                            <Icon type="close" />
                        </span>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {RENDER_MODE_MAP.map((item, index) => (
                                <li
                                    className={item.mode === mode ? 'on' : ''}
                                    key={`mode-${index}`}
                                    onClick={() => this.chooseMode(item)}>
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
                                style={{ width: 100 }}>
                                确定
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    handleClick = () => {
        this.setState({
            visible: true
        });
    };

    handleClose = () => {
        this.setState({
            visible: false
        });
    };

    handleOk = () => {
        const { RenderModeStore } = this.props;
        const { mode } = this.state;
        RenderModeStore.initMode(mode);
        this.setState({
            visible: false
        });
    };

    chooseMode = item => {
        const { mode } = item;
        this.setState({
            mode
        });
    };
}

export default RenderMode;
