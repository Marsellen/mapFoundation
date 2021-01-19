import React from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Button, Form, InputNumber } from 'antd';
import 'src/assets/less/components/batch-build.less';
import BatchBuildAttr from 'src/pages/Index/components/ToolList/BatchBuild/BatchBuildAttr';
import IconFont from 'src/components/IconFont';
import { batchBuild } from 'src/utils/relCtrl/operateCtrl.js';
import { logDecorator } from 'src/utils/decorator';
import shiyitu from 'src/assets/img/shiyitu.png';

const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 4 }
};

@Form.create()
@inject('RightMenuStore')
@inject('DataLayerStore')
@inject('BatchBuildStore')
@observer
class BatchBuildFeature extends React.Component {
    constructor(props) {
        super(props);
        this.handleBatchBuild = this.handleBatchBuild.bind(this);
    }

    exit = () => {
        const { DataLayerStore, BatchBuildStore } = this.props;
        DataLayerStore.exitEdit(); //退出编辑
        BatchBuildStore.release(); //清除数据
    };

    //行删除事件
    handleDeleteFeature = (e, featuresName, index) => {
        e.stopPropagation();
        const { activeFeatureKey, deleteFeature, clearActiveFeature } = this.props.BatchBuildStore;
        const [currentFeatureName, currentFeatureIndex] = activeFeatureKey?.split('|') || [];
        const isCurrentFeature = featuresName == currentFeatureName && index == currentFeatureIndex;
        deleteFeature(featuresName, index);
        if (isCurrentFeature) clearActiveFeature();
    };

    //行测距事件
    handleRanging = (e, featuresName, index) => {
        e.stopPropagation();
        const {
            BatchBuildStore: { activeRangeKey, initActiveRange, clearActiveRange },
            DataLayerStore: { startMeatureDistance_2, exitMeatureDistance_2 }
        } = this.props;
        const [oldFeaturesName, oldIndex] = activeRangeKey?.split('|') || [];
        if (featuresName == oldFeaturesName && index == oldIndex) {
            clearActiveRange();
            exitMeatureDistance_2();
        } else {
            initActiveRange(featuresName, index);
            startMeatureDistance_2(featuresName, index);
        }
    };

    //车道距离输入框handleBlur事件
    handleBlur = (featuresName, index, e) => {
        const value = Number(e.target.value);
        const { form, BatchBuildStore } = this.props;
        if (BatchBuildStore.checkDistance(value)) {
            BatchBuildStore.updateFeature(featuresName, index, 'DISTANCE', value);
        } else {
            const oldValue = BatchBuildStore[featuresName][index].DISTANCE;
            form.setFieldsValue({ [`${featuresName}${index}DISTANCE`]: oldValue });
        }
    };

    //行点击事件
    handleClick = (featuresName, index) => {
        const {
            initActiveFeature,
            activeFeatureKey,
            clearActiveFeature
        } = this.props.BatchBuildStore;
        const [oldFeaturesName, oldIndex] = activeFeatureKey?.split('|') || [];
        if (featuresName == oldFeaturesName && index == oldIndex) {
            clearActiveFeature();
        } else {
            initActiveFeature(featuresName, index);
        }
    };

    //行属性修改
    handleFormItemChange = fieldvalue => {
        const {
            BatchBuildStore,
            BatchBuildStore: { activeFeatureKey }
        } = this.props;
        const [featuresName, index] = activeFeatureKey?.split('|') || [];
        BatchBuildStore.updateFeature(featuresName, index, 'attr', fieldvalue);
    };

    //批量生成总提交
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async err => {
            if (!err) {
                await this.handleBatchBuild();
                this.exit();
            }
        });
    };

    @logDecorator({ operate: '批量生成' })
    async handleBatchBuild() {
        const {
            RightMenuStore: { features },
            BatchBuildStore: { leftFeatures, rightFeatures }
        } = this.props;
        const historyLog = await batchBuild(features, leftFeatures, rightFeatures);
        return historyLog;
    }

    //渲染左右侧车道线行
    renderLine = (featuresName, reverse) => {
        const {
            BatchBuildStore,
            BatchBuildStore: { activeRangeKey, activeFeatureKey },
            form: { getFieldDecorator }
        } = this.props;
        const [currentRangeName, currentRangeIndex] = activeRangeKey?.split('|') || [];
        const [currentFeatureName, currentFeatureIndex] = activeFeatureKey?.split('|') || [];
        const text = featuresName.includes('left') ? '左' : '右';
        const features = reverse
            ? BatchBuildStore[featuresName].reverse()
            : BatchBuildStore[featuresName];
        const featuresL = features.length;
        return features.map((item, index) => {
            const { DISTANCE } = item;
            const i = reverse ? featuresL - index - 1 : index;
            const isCurrentRange = featuresName == currentRangeName && i == currentRangeIndex;
            const isCurrentFeature = featuresName == currentFeatureName && i == currentFeatureIndex;
            const label = `${text}${i + 1}`;
            return (
                <div
                    className={`form-item ${isCurrentFeature ? 'on' : ''}`}
                    key={label}
                    onClick={() => this.handleClick(featuresName, i)}
                >
                    <div className="index-label">{label}</div>
                    <div className="form-item-field">
                        <span>车道距离:</span>
                        <Form.Item>
                            {getFieldDecorator(`${featuresName}${i}DISTANCE`, {
                                initialValue: DISTANCE
                            })(
                                <InputNumber
                                    precision={2}
                                    onClick={e => e.stopPropagation()}
                                    onBlur={value => this.handleBlur(featuresName, i, value)}
                                />
                            )}
                        </Form.Item>
                        <span className="letter-line-height">m</span>
                    </div>
                    <IconFont
                        className={`icon-font-button ${isCurrentRange ? 'on' : ''}`}
                        type="icon-ceju"
                        onClick={e => this.handleRanging(e, featuresName, i)}
                    />
                    <IconFont
                        className="icon-font-button"
                        type="icon-shanchu1"
                        onClick={e => this.handleDeleteFeature(e, featuresName, i)}
                    />
                </div>
            );
        });
    };

    render() {
        const { BatchBuildStore } = this.props;
        const { addFeature, activeFeatureKey } = BatchBuildStore;
        const [featuresName, index] = activeFeatureKey?.split('|') || [];
        return (
            <div className="batch-build-wrap">
                <Modal
                    title="车道线批量生成"
                    visible={true}
                    mask={false}
                    width={300}
                    wrapClassName="batch-build-modal-wrap"
                    className="batch-build-modal"
                    footer={null}
                    closable={false}
                    onOk={this.handleOk}
                    onCancel={this.exit}
                >
                    <Form layout="inline" colon={false} hideRequiredMark={true} {...formLayout}>
                        <div className="button-box">
                            <Button
                                className="button blue-button"
                                onClick={() => addFeature('leftFeatures')}
                            >
                                左侧增加
                            </Button>
                            <Button
                                className="button green-button"
                                onClick={() => addFeature('rightFeatures')}
                            >
                                右侧增加
                            </Button>
                        </div>
                        <div className="line-box">
                            <div className="arrow-up"></div>
                            <div className="line-content">
                                {this.renderLine('leftFeatures', true)}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="line-box">
                            <div className="arrow-down"></div>
                            <div className="line-content">{this.renderLine('rightFeatures')}</div>
                        </div>
                    </Form>
                    {activeFeatureKey && (
                        <BatchBuildAttr
                            key={activeFeatureKey}
                            formItemChange={this.handleFormItemChange}
                            active={activeFeatureKey}
                            activeFeature={BatchBuildStore[featuresName][index]}
                        />
                    )}
                    <div className="footer-wrap">
                        <img src={shiyitu}></img>
                        <div className="footer-button-box">
                            <Button className="button" onClick={this.exit}>
                                取消
                            </Button>
                            <Button className="button blue-button" onClick={this.handleSubmit}>
                                完成
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BatchBuildFeature;
