import React from 'react';
import { HOT_KEYS_CONFIG, HOT_KEYS_TITLE } from 'src/config/HotKeysConfig';
import { Modal } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import 'src/assets/less/components/hotkey.less';

class HotKey extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <div title="快捷键列表" className="hotkey-list">
                <ToolIcon icon="kuaijiejian" action={this.toggle} />
                <Modal
                    className="hotkey-modal"
                    title={<span className="modal-title">快捷键列表</span>}
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    width={780}
                    footer={null}>
                    {this.hotkeyList()}
                </Modal>
            </div>
        );
    }

    hotkeyList = () => {
        const data = (
            <div className="hotkey">
                {HOT_KEYS_TITLE.map((elem, index) => (
                    <div key={`${index}-parent`}>
                        <p className="hotkey-title">{elem.title}</p>
                        {HOT_KEYS_CONFIG[elem.dataIndex].map((item, j) => (
                            <p
                                key={`${index}-child-${j}`}
                                className="child-text">
                                <span className="hotkey-label">
                                    {item.label}
                                </span>
                                <span>{item.value}</span>
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        );
        return data;
    };

    toggle = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
}

export default HotKey;
