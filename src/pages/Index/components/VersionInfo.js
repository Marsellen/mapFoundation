import React from 'react';
import CONFIG from 'src/config';
import { Modal, Tooltip } from 'antd';
import IconFont from 'src/components/IconFont';

class VersionInfo extends React.Component {
    render() {
        return (
            <div className="ad-sider-bottom-item" onClick={this.about}>
                <Tooltip title="版本信息" placement="right">
                    <IconFont type="icon-banbenxinxi" />
                </Tooltip>
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
