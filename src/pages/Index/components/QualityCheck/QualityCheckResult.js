import React from 'react';
import { Tabs, Icon } from 'antd';
import SeniorModal from 'src/components/SeniorModal';
import 'src/assets/less/components/quality-check.less';
import QualityCheckResultTable from 'src/pages/Index/components/QualityCheck/QualityCheckResultTable';
import QCMarkerListTable from 'src/pages/Index/components/QualityMarker/QCMarkerListTable';
import { inject, observer } from 'mobx-react';
import ToolIcon from 'src/components/ToolIcon';

const { TabPane } = Tabs;

@inject('appStore')
@inject('TaskStore')
@inject('QualityCheckStore')
@inject('QCMarkerStore')
@observer
class QualityCheckResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeKey: '' };
    }

    dragCallback = (transformStr, tx, ty) => {
        const { QualityCheckStore } = this.props;
        QualityCheckStore.getResizeStyle(tx, ty);
    };

    handleCheckClick = () => {
        const {
            TaskStore: { activeTaskId },
            QualityCheckStore: { checkReportVisible },
            QCMarkerStore: { visibleList }
        } = this.props;
        if (!activeTaskId) return;
        if (checkReportVisible) {
            this.handleCheckClose();
            this.setState({
                activeKey: visibleList ? 'marker' : ''
            });
        } else {
            this.handleCheckOpen();
            this.setState({
                activeKey: 'check'
            });
        }
    };

    handleCheckOpen = () => {
        const { appStore, QualityCheckStore, TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const { handleQualityGetMisreport, getReport, openCheckReport } = QualityCheckStore;

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

    handleCheckClose = () => {
        const { QualityCheckStore: { closeCheckReport } = {} } = this.props;
        closeCheckReport();
    };

    handleMarkerClick = () => {
        const {
            TaskStore: { activeTaskId },
            QCMarkerStore: { visibleList, showList, hideList },
            QualityCheckStore: { checkReportVisible }
        } = this.props;
        if (!activeTaskId) return;

        if (visibleList) {
            hideList();
            this.setState({
                activeKey: checkReportVisible ? 'check' : ''
            });
        } else {
            showList();
            this.setState({
                activeKey: 'marker'
            });
        }
    };

    handleTabsChange = activeKey => {
        this.setState({
            activeKey
        });
    };

    handleAllClose = () => {
        const {
            QualityCheckStore: { closeCheckReport },
            QCMarkerStore: { hideList }
        } = this.props;
        closeCheckReport();
        hideList();
        this.setState({
            activeKey: ''
        });
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
        const { activeKey } = this.state;
        const {
            QualityCheckStore: { reportList, checkReportVisible },
            QCMarkerStore: { visibleList, updateKey }
        } = this.props;
        const checkKey = checkReportVisible && 'check';
        const markerKey = visibleList && 'marker';

        return (
            <Tabs
                animated={false}
                activeKey={activeKey || checkKey || markerKey || ''}
                onChange={this.handleTabsChange}
                tabBarExtraContent={this._closeIcon()}
            >
                {checkReportVisible && (
                    <TabPane tab="检查结果" key="check">
                        <QualityCheckResultTable reportList={reportList} />
                    </TabPane>
                )}
                {visibleList && (
                    <TabPane tab="质检标注" key="marker">
                        <QCMarkerListTable key={updateKey} />
                    </TabPane>
                )}
            </Tabs>
        );
    };

    render() {
        const {
            QualityCheckStore: { checkReportVisible },
            TaskStore: { activeTaskId, isQCTask, isRefixStatus },
            QCMarkerStore: { visibleList }
        } = this.props;
        const isMarkerTask = isQCTask || isRefixStatus;
        return (
            <div>
                <div className="ad-sider-item">
                    <ToolIcon
                        id="check-result-btn"
                        icon="jianchajieguo"
                        title="检查结果"
                        placement="right"
                        className="ad-menu-icon"
                        visible={checkReportVisible}
                        disabled={!activeTaskId}
                        action={this.handleCheckClick}
                    />
                </div>
                {/* 如果当前任务是返工、返修、质检任务，显示质检标主列表按钮 */}
                {activeTaskId && isMarkerTask && (
                    <div className="ad-sider-item">
                        <ToolIcon
                            id="marker-list-btn"
                            icon="zhijianbiaozhuliebiao"
                            title="质检标注"
                            placement="right"
                            className="ad-menu-icon"
                            visible={visibleList}
                            disabled={!activeTaskId}
                            action={this.handleMarkerClick}
                        />
                    </div>
                )}
                <SeniorModal
                    dragDom={this._dragDom()}
                    visible={checkReportVisible || visibleList}
                    footer={null}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    closable={false}
                    width={'100%'}
                    bodyStyle={{ padding: 0 }}
                    onCancel={this.handleAllClose}
                    dragCallback={this.dragCallback}
                    className="quality-check-result-modal"
                    wrapClassName="quality-check-result-modal-wrap"
                >
                    {this._renderContent()}
                </SeniorModal>
            </div>
        );
    }
}

export default QualityCheckResult;
