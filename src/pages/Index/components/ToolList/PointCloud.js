import React from 'react';
import { Popover, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import IconFont from 'src/components/IconFont';
import PointStratification from './PointStratification';
import Intensity from './Intensity';
import AdjustPointSize from './AdjustPointSize';
import 'src/assets/less/components/point-cloud.less';

@inject('TaskStore')
@inject('ResourceLayerStore')
@observer
class PointCloud extends React.Component {
    state = {
        clicked: false,
        hovered: false,
        updateKey: 0
    };

    hide = () => {
        this.setState({
            clicked: false,
            hovered: false
        });
    };

    handleHoverChange = visible => {
        if (!this.state.clicked) {
            this.setState({
                hovered: visible
            });
        }
    };

    handleClickChange = visible => {
        if (this.isDisabled()) return;
        this.setState({
            clicked: visible,
            hovered: false
        });
    };
    render() {
        return (
            <Popover
                placement="bottom"
                content={this._renderContent()}
                trigger="click"
                visible={this.state.clicked}
                onVisibleChange={this.handleClickChange}>
                <Tooltip
                    placement="bottom"
                    title="点云设置"
                    visible={this.state.hovered}
                    onVisibleChange={this.handleHoverChange}>
                    <IconFont
                        type="icon-dianyunshezhi"
                        className={`ad-icon ${this.isDisabled() &&
                            'ad-disabled-icon'}`}
                    />
                </Tooltip>
            </Popover>
        );
    }

    isDisabled = () => {
        const { TaskStore, ResourceLayerStore } = this.props;
        const { activeTaskId } = TaskStore;
        const { pointCloudChecked } = ResourceLayerStore;

        return !activeTaskId || !pointCloudChecked;
    };

    _renderContent = () => {
        const { clicked } = this.state;
        return (
            <div className="point-cloud">
                <div className="point-cloud-left">
                    <span>点云分高程显示</span>
                    <PointStratification />
                </div>
                <div className="point-cloud-right">
                    <div className="point-cloud-right-content">
                        <span>点云反射率</span>
                        <Intensity clicked={clicked} />
                    </div>
                    <div className="point-cloud-right-content">
                        <span>点云大小</span>
                        <AdjustPointSize clicked={clicked} />
                    </div>
                </div>
            </div>
        );
    };
}

export default PointCloud;
