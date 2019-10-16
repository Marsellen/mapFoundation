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
            <div
                title="快捷键列表"
                onClick={this.toggle}
                style={{
                    width: '60px',
                    height: '45px',
                    color: '#abc',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '30px'
                }}>
                <ToolIcon icon="kuaijiejian" />
                <Modal
                    title={
                        <span style={{ fontSize: 20, fontWeight: 600 }}>
                            快捷键列表
                        </span>
                    }
                    visible={this.state.visible}
                    width={780}
                    bodyStyle={{ padding: '10px 30px' }}
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
                            <div key={`${index}-child-${j}`}>
                                <p
                                    style={{ marginLeft: '30px' }}
                                    >
                                    <span className="hotkey-label">
                                        {item.label}
                                    </span>
                                    <span>{item.value}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
        return data;
    };

    toggle = () => {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
        } else {
            this.setState({
                visible: true
            });
        }
    };
}

export default HotKey;
