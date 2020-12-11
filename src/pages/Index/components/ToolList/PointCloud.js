import React from 'react';
import { inject, observer } from 'mobx-react';
import PointStratification from './PointStratification';
import PointBright from './PointBright';
import Contrast from './Contrast';
import Gamma from './Gamma';
import AdjustPointSize from './AdjustPointSize';
import 'src/assets/less/components/point-cloud.less';
import ToolIcon from 'src/components/ToolIcon';

@inject('TaskStore')
@inject('ResourceLayerStore')
@inject('PointCloudStore')
@observer
class PointCloud extends React.Component {
    state = {
        clicked: false
    };

    //获取点云高层
    getPointCloudHeightRange = () => {
        const { PointCloudStore } = this.props;
        const range = pointCloudLayer.getElevationRange();
        PointCloudStore.initHeightRange(range);
    };

    handleClickChange = visible => {
        if (this.isDisabled()) return;
        visible && this.getPointCloudHeightRange();
        this.setState({
            clicked: visible
        });
    };

    isDisabled = () => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;

        return !activeTaskId || !pointCloudChecked;
    };

    _renderContent = () => {
        const { TaskStore } = this.props;
        const { activeTaskId } = TaskStore;
        return (
            <div className="point-cloud">
                <div className="point-cloud-right">
                    <div className="point-cloud-right-content-top">
                        <span>亮度</span>
                        <PointBright activeTaskId={activeTaskId} />
                        <span>对比度</span>
                        <Contrast activeTaskId={activeTaskId} />
                        <span>Gamma</span>
                        <Gamma activeTaskId={activeTaskId} />
                    </div>
                    <div className="point-cloud-right-content">
                        <span>点云大小</span>
                        <AdjustPointSize activeTaskId={activeTaskId} />
                    </div>
                </div>
                <div className="point-cloud-left">
                    <span>点云分高程显示</span>
                    <PointStratification />
                </div>
            </div>
        );
    };

    render() {
        return (
            <ToolIcon
                icon="dianyunshezhi"
                title="点云设置"
                visible={this.state.clicked}
                disabled={this.isDisabled()}
                popover={{
                    title: '点云设置',
                    placement: 'bottom',
                    visible: this.state.clicked,
                    onVisibleChange: this.handleClickChange,
                    content: this._renderContent(),
                    trigger: 'click'
                }}
            />
        );
    }
}

export default PointCloud;
