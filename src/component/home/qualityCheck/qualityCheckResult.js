import React from 'react';
import { Tabs, Icon } from 'antd';
import SeniorModal from 'src/component/common/seniorModal';
import 'src/asset/less/quality-check.less';
import QualityCheckResultTable from 'src/component/home/qualityCheck/qualityCheckResultTable';
import QCMarkerListTable from 'src/component/home/qualityMarker/qcMarkerListTable';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/component/common/toolIcon';

const { TabPane } = Tabs;

@inject('appStore')
@inject('TaskStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QualityCheckResult extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCheckClick = () => {
        const {
            TaskStore: { activeTaskId },
            QualityCheckStore: { checkReportVisible, setActiveKey },
            QCMarkerStore: { visibleList }
        } = this.props;
        if (!activeTaskId) return;
        if (checkReportVisible) {
            this.handleCheckClose();
            visibleList && setActiveKey('marker');
        } else {
            this.handleCheckOpen();
            setActiveKey('check');
        }
    };

    handleCheckOpen = async () => {
        const {
            appStore: { roleCode },
            TaskStore: { activeTaskId },
            QualityCheckStore: { handleQualityGetMisreport, getReport, openCheckReport }
        } = this.props;
        switch (roleCode) {
            case 'producer':
                await getReport({
                    task_id: activeTaskId,
                    isEdit: 1
                });
                break;
            case 'quality':
                await handleQualityGetMisreport({
                    taskId: activeTaskId,
                    status: '1,2,4'
                });
                break;
            default:
                break;
        }
        openCheckReport();
    };

    handleCheckClose = () => {
        const { QualityCheckStore: { closeCheckReport } = {} } = this.props;
        closeCheckReport();
    };

    handleMarkerClick = () => {
        const {
            TaskStore: { activeTaskId },
            QCMarkerStore: { visibleList, showList, hideList },
            QualityCheckStore: { checkReportVisible, setActiveKey }
        } = this.props;
        if (!activeTaskId) return;

        if (visibleList) {
            hideList();
            checkReportVisible && setActiveKey('check');
        } else {
            showList();
            setActiveKey('marker');
        }
    };

    handleTabsChange = activeKey => {
        const {
            QualityCheckStore: { setActiveKey }
        } = this.props;
        setActiveKey(activeKey);
    };

    handleAllClose = () => {
        const {
            QualityCheckStore: { closeCheckReport },
            QCMarkerStore: { hideList }
        } = this.props;
        closeCheckReport();
        hideList();
    };

    _dragDom = () => <div className="drag-dom"></div>;

    _closeIcon = () => (
        <Icon
            type="close"
            className="close-icon"
            onClick={this.handleAllClose}
            id="check-result-close-btn"
        />
    );

    _renderContent = () => {
        const {
            QualityCheckStore: { checkReportVisible, activeKey },
            QCMarkerStore: { visibleList }
        } = this.props;

        return (
            <Tabs
                animated={false}
                activeKey={activeKey}
                onChange={this.handleTabsChange}
                tabBarExtraContent={this._closeIcon()}
            >
                {checkReportVisible && (
                    <TabPane
                        tab="检查结果"
                        key="check"
                        style={{ height: activeKey === 'check' ? '100%' : 0 }}
                    >
                        <QualityCheckResultTable />
                    </TabPane>
                )}
                {visibleList && (
                    <TabPane
                        tab="质检标注"
                        key="marker"
                        style={{ height: activeKey === 'marker' ? '100%' : 0 }}
                    >
                        <QCMarkerListTable />
                    </TabPane>
                )}
            </Tabs>
        );
    };

    render() {
        const {
            QualityCheckStore: { checkReportVisible, resizeCallback },
            TaskStore: { isLocalTask, isEditableTask, isMsTask, isFixStatus },
            QCMarkerStore: { visibleList },
            appStore: { isQuality }
        } = this.props;
        return (
            <div>
                {/* 浏览任务，检查结果置灰 */}
                <div className="ad-sider-item">
                    <ToolIcon
                        id="check-result-btn"
                        icon="jianchajieguo"
                        title="检查结果"
                        placement="right"
                        className="ad-menu-icon"
                        visible={checkReportVisible}
                        disabled={!isEditableTask || (isLocalTask && isQuality)}
                        action={this.handleCheckClick}
                    />
                </div>
                {/* 浏览任务或人工识别【已领取/进行中】任务，质检标注置灰 */}
                <div className="ad-sider-item">
                    <ToolIcon
                        id="marker-list-btn"
                        icon="zhijianbiaozhuliebiao"
                        title="质检标注"
                        placement="right"
                        className="ad-menu-icon"
                        visible={visibleList}
                        disabled={!isEditableTask || (isMsTask && isFixStatus) || isLocalTask}
                        action={this.handleMarkerClick}
                    />
                </div>
                <SeniorModal
                    dragDom={this._dragDom()}
                    visible={checkReportVisible || visibleList}
                    footer={null}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    closable={false}
                    width={'100%'}
                    height={'100%'}
                    bodyStyle={{ padding: 0 }}
                    onCancel={this.handleAllClose}
                    className="quality-check-result-modal"
                    wrapClassName="quality-check-result-modal-wrap"
                    resizeCallback={resizeCallback}
                >
                    {this._renderContent()}
                </SeniorModal>
            </div>
        );
    }
}

export default QualityCheckResult;