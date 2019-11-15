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
    state = {
        dragDomStyle: null
    };

    render() {
        const { QualityCheckStore, TaskStore } = this.props;
        const { checkReportVisible } = QualityCheckStore;
        const { activeTaskId } = TaskStore;

        return (
            <div>
                <ToolIcon
                    placement="right"
                    id="check-result-btn"
                    title="检查结果"
                    placement="right"
                    icon="jianchajieguoliebiao"
                    disabled={false}
                    className="ad-menu-icon"
                    action={this.handleClick}
                />
                <SeniorModal
                    dragDom={this._dragDom()}
                    visible={checkReportVisible}
                    footer={null}
                    mask={false}
                    zIndex={999}
                    maskClosable={false}
                    destroyOnClose={true}
                    closable={false}
                    width={1000}
                    bodyStyle={{ padding: 0 }}
                    onCancel={this.handleClose}
                    className="quality-check-result-modal"
                    wrapClassName="quality-check-result-modal-wrap view-attribute-modal">
                    {this._renderContent()}
                </SeniorModal>
            </div>
        );
    }

    _dragDom = () => (
        <div className="drag-dom" style={this.state.dragDomStyle}></div>
    );

    _renderContent = () => {
        const { QualityCheckStore } = this.props;
        const { reportList } = QualityCheckStore;
        return (
            <Tabs
                defaultActiveKey="1"
                onChange={this.handleTabsChange}
                tabBarExtraContent={this._closeIcon()}>
                <TabPane tab="质检结果" key="1">
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

    setDragDomStyle = async () => {
        const tabsNav = await new Promise(this.getTabsNavDom);
        const tabsNavWidth = tabsNav.offsetWidth;
        const tabsNavHeight = 45;
        const dragDomStyle = {
            left: tabsNavWidth,
            width: `calc(100% - ${tabsNavWidth}px - ${tabsNavHeight}px)`,
            height: tabsNavHeight
        };
        this.setState({
            dragDomStyle
        });
    };

    getTabsNavDom = resolve => {
        setTimeout(() => {
            const tabsNav = document.querySelector('.ant-tabs-nav');
            tabsNav ? resolve(tabsNav) : this.getTabsNavDom();
        }, 1000);
    };

    handleClick = () => {
        const { TaskStore, QualityCheckStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { checkReportVisible } = QualityCheckStore;
        if (!activeTaskId) return;

        checkReportVisible ? this.handleClose() : this.handleOpen();
    };

    handleOpen = () => {
        const { dragDomStyle } = this.state;
        const { appStore, QualityCheckStore, TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { loginUser } = appStore;
        const { roleCode } = loginUser;
        const {
            handleQualityGetMisreport,
            handleProducerGetReport,
            openCheckReport
        } = QualityCheckStore;

        openCheckReport();
        !dragDomStyle && this.setDragDomStyle();

        switch (roleCode) {
            case 'producer':
                handleProducerGetReport({
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
        const { closeCheckReport } = QualityCheckStore;
        closeCheckReport();
    };

    handleTabsChange = () => {};
}

export default QualityCheckResult;
