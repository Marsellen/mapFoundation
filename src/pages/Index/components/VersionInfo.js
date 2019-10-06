import React from 'react';
import CONFIG from 'src/config';
import { Modal } from 'antd';
import ToolIcon from 'src/components/ToolIcon';

class VersionInfo extends React.Component {
    render() {
        return (
            <div
                title="版本信息"
                onClick={this.about}
                style={{
                    width: '60px',
                    height: '45px',
                    color: '#abc',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '0px'
                }}>
                <ToolIcon icon="yuandianzhong" />
            </div>
        );
    }

    about = () => {
        Modal.info({
            title: '版本号',
            content: CONFIG.version,
            okText: '确定'
        });
    };
}

export default VersionInfo;
