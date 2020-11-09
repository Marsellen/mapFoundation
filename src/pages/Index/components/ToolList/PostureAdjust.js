import React from 'react';
import ToolIcon from 'src/components/ToolIcon';
import SeniorModal from 'src/components/SeniorModal';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import IconFont from 'src/components/IconFont';
import { logDecorator } from 'src/utils/decorator';
import { modUpdStatGeometry } from 'src/utils/vectorUtils';
import { isManbuildTask } from 'src/utils/taskUtils';
import { DEFAULT_CONFIDENCE_MAP } from 'config/ADMapDataConfig';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/ad-posture-adjust.less';
import { message } from 'antd';
import DataLayerStore from 'src/pages/Index/store/DataLayerStore';
import RightMenuStore from 'src/pages/Index/store/RightMenuStore';

@inject('DataLayerStore')
@inject('TaskStore')
@observer
class PostureAdjust extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            polygonValue: 0.01,
            verticalValue: 0.01,
            editType: 'posture_adjust',
            centerVisible: true
        };
    }

    render() {
        const { DataLayerStore } = this.props;
        let visible = DataLayerStore.editType == 'posture_adjust';
        return (
            <span>
                <ToolIcon
                    id="posture-adjust-btn"
                    icon="weizitiaozheng"
                    title="位姿调整"
                    className="ad-tool-icon"
                    focusClassName="ad-tool-icon-active"
                    visible={visible}
                    action={this.action}
                    disabled={DataLayerStore.brushDisadled}
                />
                <SeniorModal
                    className="posture-modal"
                    wrapClassName="posture-modal-wrap"
                    title="位姿调整"
                    visible={visible}
                    mask={false}
                    closable={false}
                    zIndex={1000}
                    width={240}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="完成"
                    cancelText="取消"
                    maskClosable={false}
                >
                    {this._renderModal()}
                </SeniorModal>
            </span>
        );
    }

    _renderModal = () => {
        const { DataLayerStore } = this.props;
        const { polygonValue, verticalValue, centerVisible } = this.state;
        let visible = DataLayerStore.editType == 'posture_adjust';
        return (
            <span>
                <div className="change-point-label">平移</div>
                <div className="center-point-label">
                    <span className="center-point-span">中心点平移</span>
                    <ToolIcon
                        className="center-point-icon"
                        visible={centerVisible && visible}
                        icon="zhongxindianpingyi"
                        title="中心点平移"
                        action={this.toggle.bind(this, !centerVisible)}
                    />
                </div>
                <div className="polygon-pan">
                    <span className="label">面内平移</span>
                    <div className="box">
                        <div className="row">
                            <IconFont
                                type="icon-shangyi"
                                className="shangyi pingyi"
                                onClick={() => this.changePoint('up', polygonValue)}
                            />
                        </div>
                        <div className="row">
                            <IconFont
                                type="icon-zuoyi"
                                className="zuoyi pingyi"
                                onClick={() => this.changePoint('left', polygonValue)}
                            />
                            <AdInputNumber
                                width={76}
                                min={0.01}
                                max={0.1}
                                step={0.01}
                                value={polygonValue}
                                onChange={val => this.handlePolygonChange(val)}
                            />
                            <IconFont
                                type="icon-youyi"
                                className="youyi pingyi"
                                onClick={() => this.changePoint('right', polygonValue)}
                            />
                        </div>
                        <div className="row">
                            <IconFont
                                type="icon-xiayi"
                                className="xiayi pingyi"
                                onClick={() => this.changePoint('down', polygonValue)}
                            />
                        </div>
                    </div>
                </div>
                <div className="vertical-pan">
                    <span className="label">垂向平移</span>
                    <IconFont
                        type="icon-zuoyi"
                        className="zuoyi pingyi"
                        onClick={() => this.changePoint('front', verticalValue)}
                    />
                    <AdInputNumber
                        width={76}
                        min={0.01}
                        max={0.1}
                        step={0.01}
                        value={verticalValue}
                        onChange={val => this.handleVerticalChange(val)}
                    />
                    <IconFont
                        type="icon-youyi"
                        className="youyi pingyi"
                        onClick={() => this.changePoint('back', verticalValue)}
                    />
                </div>
            </span>
        );
    };

    // 完成
    handleOk = () => {
        try {
            let data = DataLayerStore.finishChangeFeaturePos();
            //特殊情况，中心点平移要素点在范围内，但该要素处于范围外的状况判断，需单独把日志处理逻辑分开存放，放一起会导致退出位姿调整状态
            if (data.desc) {
                message.warning(data.desc.split(':')[1], 3);
                return;
            }
            this.finishChangeFeaturePos(data);
        } catch (e) {
            message.error('位姿调整失败' + e, 3);
            DataLayerStore.exitEdit();
            throw e;
        }
    };

    @logDecorator({ operate: '位姿调整' })
    async finishChangeFeaturePos(data) {
        const oldFeature = RightMenuStore.getFeatures()[0];
        if (!isManbuildTask()) {
            // 更新标识
            data = modUpdStatGeometry(data);
            // 置信度维护
            if (!data.data.properties.CONFIDENCE) {
                Object.assign(data.data.properties, {
                    CONFIDENCE: DEFAULT_CONFIDENCE_MAP[data.layerName] || '{}',
                    COLL_TIME: '',
                    MAKE_TIME: ''
                });
            }
        }

        let historyLog = {
            features: [[oldFeature], [data]]
        };
        message.success('位姿调整成功', 3);
        return historyLog;
    }

    handleCancel = () => {
        // 点击取消，完成以及按ESC都会退出当前工具编辑状态，若点击完成时保存失败，则不退出编辑状态
        const { DataLayerStore } = this.props;
        DataLayerStore.exitEdit();
    };

    // 中心点平移
    toggle = visible => {
        const { DataLayerStore } = this.props;
        this.setState({
            centerVisible: visible
        });
        let mode = visible ? 0 : 1;
        DataLayerStore.ChangeFeaturePosMode(mode);
        visible ? DataLayerStore.changeCur() : DataLayerStore.removeCur();
    };

    // 前后左右上下移
    changePoint = (dir, value) => {
        const { DataLayerStore } = this.props;
        DataLayerStore.changeFeaturePosMicro(dir, value);
    };

    // 面内平移输入框
    handlePolygonChange = val => {
        this.setState({
            polygonValue: val || 0.01
        });
    };

    // 垂向平移输入框
    handleVerticalChange = val => {
        this.setState({
            verticalValue: val || 0.01
        });
    };

    action = () => {
        const { DataLayerStore } = this.props;
        if (DataLayerStore.editType == 'posture_adjust') return;
        DataLayerStore.postureAdjust();
        this.toggle(true);
    };
}

export default PostureAdjust;
