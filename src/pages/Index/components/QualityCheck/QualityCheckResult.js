import React from 'react';
import { Tabs, Icon } from 'antd';
import SeniorModal from 'src/components/SeniorModal';
import 'src/assets/less/components/quality-check.less';
import QualityCheckResultTable from 'src/pages/Index/components/QualityCheck/QualityCheckResultTable';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

const { TabPane } = Tabs;

@inject('appStore')
@inject('TaskStore')
@inject('QualityCheckStore')
@observer
class QualityCheckResult extends React.Component {
    render() {
        const { QualityCheckStore, TaskStore } = this.props;
        const { checkReportVisible } = QualityCheckStore;
        const { activeTaskId } = TaskStore;

        return (
            <div>
                <ToolIcon
                    id="check-result-btn"
                    icon="jianchajieguo"
                    title="检查结果"
                    placement="right"
                    className="ad-menu-icon"
                    visible={checkReportVisible}
                    disabled={!activeTaskId}
                    action={this.handleClick}
                />
                <SeniorModal
                    dragDom={this._dragDom()}
                    visible={checkReportVisible}
                    footer={null}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    closable={false}
                    width={'100%'}
                    bodyStyle={{ padding: 0 }}
                    onCancel={this.handleClose}
                    dragCallback={this.dragCallback}
                    className="quality-check-result-modal"
                    wrapClassName="quality-check-result-modal-wrap"
                >
                    {this._renderContent()}
                </SeniorModal>
            </div>
        );
    }

    _dragDom = () => <div className="drag-dom"></div>;

    _renderContent = () => {
        const { QualityCheckStore } = this.props;
        const { reportList } = QualityCheckStore;
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={this.handleTabsChange}
                tabBarExtraContent={this._closeIcon()}
            >
                <TabPane tab="检查结果" key="1">
                    <QualityCheckResultTable reportList={reportList} />
                </TabPane>
            </Tabs>
        );
    };

    _closeIcon = () => (
        <Icon
            type="close"
            className="close-icon"
            onClick={this.handleClose}
            id="check-result-close-btn"
        />
    );

    dragCallback = (transformStr, tx, ty) => {
        const { QualityCheckStore } = this.props;
        QualityCheckStore.getResizeStyle(tx, ty);
    };

    handleClick = () => {
        const { TaskStore, QualityCheckStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { checkReportVisible } = QualityCheckStore;
        if (!activeTaskId) return;

        checkReportVisible ? this.handleClose() : this.handleOpen();
    };

    handleOpen = () => {
        const { appStore, QualityCheckStore, TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const {
            handleQualityGetMisreport,
            getReport,
            openCheckReport
        } = QualityCheckStore;

        openCheckReport();

        switch (roleCode) {
            case 'producer':
                getReport({
                    task_id: activeTaskId
                });
                break;
            case 'quality':
                handleQualityGetMisreport({
                    taskId: activeTaskId,
                    status: '1,2,4'
                });
                break;
            default:
                break;
        }
    };

    handleClose = () => {
        const { QualityCheckStore } = this.props;
        const { closeCheckReport, clearCheckReport } = QualityCheckStore;
        closeCheckReport();
        clearCheckReport();
    };

    handleTabsChange = () => {};
}

export default QualityCheckResult;
