import React from 'react';
import { inject, observer } from 'mobx-react';
import PointStratification from './pointStratification';
import PointBright from './pointBright';
import Contrast from './contrast';
import Gamma from './gamma';
import AdjustPointSize from './adjustPointSize';
import ReflexRange from './reflexRange';
import 'src/asset/less/point-cloud.less';
import ToolIcon from 'src/component/common/toolIcon';

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
                <div className="point-cloud-left">
                    <div className="point-cloud-left-content">
                        <PointBright />
                        <Contrast />
                        <Gamma />
                        <ReflexRange />
                    </div>
                    <div className="point-cloud-left-content">
                        <AdjustPointSize />
                    </div>
                </div>
                <div className="point-cloud-right">
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
