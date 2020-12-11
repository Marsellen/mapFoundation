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
@observer
class PointCloud extends React.Component {
    state = {
        visible: false
    };

    handleClickChange = checked => {
        if (this.isDisabled()) return;
        this.setState({
            visible: checked
        });
    };

    isDisabled = () => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;

        return !activeTaskId || !pointCloudChecked;
    };

    _renderContent = () => {
        return (
            <div className="point-cloud">
                <div className="point-cloud-right">
                    <div className="point-cloud-right-content-top">
                        <span>亮度</span>
                        <PointBright />
                        <span>对比度</span>
                        <Contrast />
                        <span>Gamma</span>
                        <Gamma />
                    </div>
                    <div className="point-cloud-right-content">
                        <span>点云大小</span>
                        <AdjustPointSize />
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
        const { visible } = this.state;
        return (
            <ToolIcon
                key={visible}
                icon="dianyunshezhi"
                title="点云设置"
                visible={visible}
                disabled={this.isDisabled()}
                popover={{
                    title: '点云设置',
                    placement: 'bottom',
                    visible: visible,
                    onVisibleChange: this.handleClickChange,
                    content: this._renderContent(),
                    trigger: 'click'
                }}
            />
        );
    }
}

export default PointCloud;
