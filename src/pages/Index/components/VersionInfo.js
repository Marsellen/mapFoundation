import React from 'react';
import CONFIG from 'src/config';
import { Modal } from 'antd';
import ToolIcon from 'src/components/ToolIcon';
import EditorService from 'src/services/EditorService';

configure({ enforceActions: 'always' });
class VersionInfo extends React.Component {
    state = {
        visible: false,
        versionData: ''
    };

    componentDidMount() {
        this.backVersion()
    }

    backVersion = async () => {
        try {
            const result = await EditorService.versionInfo();
            this.setState({ versionData: result.data });
        }
        catch (e) {
            this.setState({ versionData: '暂未获取到版本信息' })
        }
    }

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
            content: this.renderVersion(),
            okText: '确定',
            onOk: () => {
                this.setState({ visible: false });
            }
        });
    };

    renderVersion = () => {
        return (
            <div>
                <div>前端：{CONFIG.version}</div>
                <div>后台：{this.state.versionData}</div>
            </div>)
    }
}

export default VersionInfo;
