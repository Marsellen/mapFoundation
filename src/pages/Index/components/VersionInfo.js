import React from 'react';
import CONFIG from 'src/config';
import { Modal } from 'antd';
import ToolIcon from 'src/components/ToolIcon';

class VersionInfo extends React.Component {
    state = { visible: false };

    render() {
        return (
            <ToolIcon
                icon="banbenxinxi"
                title="版本信息"
                placement="right"
                className="ad-sider-bottom-item"
                visible={this.state.visible}
                action={this.about}
            />
        );
    }

    about = () => {
        this.setState({ visible: true });
        Modal.info({
            title: '版本号',
            content: CONFIG.version,
            okText: '确定',
            onOk: () => {
                this.setState({ visible: false });
            }
        });
    };
}

export default VersionInfo;
