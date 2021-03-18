import React from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Button, InputNumber } from 'antd';
import 'src/assets/less/components/batch-build.less';
import BatchBuildAttr from 'src/pages/Index/components/ToolList/BatchBuild/BatchBuildAttr';
import IconFont from 'src/components/IconFont';
import { batchBuild } from 'src/utils/relCtrl/operateCtrl.js';
import { editLock, logDecorator } from 'src/utils/decorator';
import shiyitu from 'src/assets/img/shiyitu.png';

@inject('RightMenuStore')
@inject('DataLayerStore')
@inject('BatchBuildStore')
@observer
class BatchBuildFeature extends React.Component {
    constructor(props) {
        super(props);
        this.state = { distances: {} };
        this.handleBatchBuild = this.handleBatchBuild.bind(this);
    }

    stopPropagation = e => e.stopPropagation();

    exit = () => {
        const { DataLayerStore, BatchBuildStore } = this.props;
        DataLayerStore.exitEdit(); //退出编辑
        BatchBuildStore.release(); //清除数据
        DataLayerStore.resetEditLayer();
        DataLayerStore.clearDrawHorizontal();
    };

    isCurrentFeature = (featuresName, index) => {
        const { activeFeatureKey } = this.props.BatchBuildStore;
        const [currentFeatureName, currentFeatureIndex] = activeFeatureKey?.split('|') || [];
        return featuresName == currentFeatureName && index == currentFeatureIndex;
    };

    isCurrentRange = (featuresName, index) => {
        const { activeRangeKey } = this.props.BatchBuildStore;
        const [currentRangeName, currentRangeIndex] = activeRangeKey?.split('|') || [];
        return featuresName == currentRangeName && index == currentRangeIndex;
    };

    //行删除事件
    handleDeleteFeature = (e, featuresName, index) => {
        e.stopPropagation();
        const {
            DataLayerStore: { exitMeatureDistance_2 },
            BatchBuildStore: { deleteFeature, clearActiveFeature, clearActiveRange }
        } = this.props;
        //删除当前
        deleteFeature(featuresName, index);
        //清空当前选中要素
        clearActiveFeature();
        //清空当前选中量测工具
        clearActiveRange();
        exitMeatureDistance_2();
    };

    //行测距事件
    handleRanging = (e, featuresName, index) => {
        e.stopPropagation();
        const {
            BatchBuildStore: { initActiveRange, clearActiveRange, setHorizontalToolStatus },
            DataLayerStore: { startMeatureDistance_2, exitMeatureDistance_2, closeDrawHorizontal }
        } = this.props;
        closeDrawHorizontal();
        setHorizontalToolStatus(false);
        const isCurrentRange = this.isCurrentRange(featuresName, index);
        if (isCurrentRange) {
            clearActiveRange();
            exitMeatureDistance_2();
        } else {
            exitMeatureDistance_2();
            initActiveRange(featuresName, index);
            startMeatureDistance_2(featuresName, index);
        }
    };

    handleChange = (featuresName, index, value) => {
        const { BatchBuildStore } = this.props;
        if (BatchBuildStore.checkDistance(value)) {
            const { distances } = this.state;
            distances[featuresName + index] = value;
            this.setState({ distances });
        }
    };

    //车道距离输入框handleBlur事件
    handleBlur = (featuresName, index, e) => {
        const value = Number(e.target.value);
        const { BatchBuildStore } = this.props;
        if (BatchBuildStore.checkDistance(value)) {
            BatchBuildStore.updateFeature(featuresName, index, 'DISTANCE', value);
        }
        this.setState({ distances: {} });
    };

    //行点击事件
    handleClick = (featuresName, index) => {
        const { initActiveFeature, clearActiveFeature } = this.props.BatchBuildStore;
        const isCurrentFeature = this.isCurrentFeature(featuresName, index);
        isCurrentFeature ? clearActiveFeature() : initActiveFeature(featuresName, index);
    };

    //行属性修改
    handleFormItemChange = (name, value, formData) => {
        const {
            BatchBuildStore,
            BatchBuildStore: { activeFeatureKey }
        } = this.props;
        const [featuresName, index] = activeFeatureKey?.split('|') || [];
        formData = {
            ...formData,
            [name]: value ?? 0
        };
        BatchBuildStore.updateFeature(featuresName, index, 'attr', formData);
    };

    //批量生成总提交
    @editLock
    handleSubmit = async e => {
        e.preventDefault();
        await this.handleBatchBuild();
        this.exit();
    };

    @logDecorator({ operate: '批量生成' })
    async handleBatchBuild() {
        const {
            RightMenuStore: { features },
            BatchBuildStore: { leftFeatures, rightFeatures }
        } = this.props;
        const allFeatures = window.horizontal?.layer?.getAllFeatures?.() || [];
        const historyLog = await batchBuild(features, leftFeatures, rightFeatures, allFeatures);
        return historyLog;
    }

    // 路面横截线
    toggle = () => {
        const {
            DataLayerStore: { openDrawHorizontal, closeDrawHorizontal, exitMeatureDistance_2 },
            BatchBuildStore
        } = this.props;
        const { setHorizontalToolStatus, clearActiveRange } = BatchBuildStore;
        setHorizontalToolStatus(!BatchBuildStore.horizontalToolStatus);
        if (BatchBuildStore.horizontalToolStatus) {
            exitMeatureDistance_2();
            clearActiveRange();
            openDrawHorizontal();
        } else {
            closeDrawHorizontal();
        }
    };

    // 清空路面横截线
    clearHorizontalLayer = () => {
        const {
            DataLayerStore: { clearDrawHorizontal, closeDrawHorizontal, exitMeatureDistance_2 },
            BatchBuildStore: { clearActiveRange, setHorizontalToolStatus, horizontalToolStatus }
        } = this.props;
        if (!horizontalToolStatus) return;
        closeDrawHorizontal();
        setHorizontalToolStatus(false);
        clearDrawHorizontal();
        exitMeatureDistance_2();
        clearActiveRange();
    };

    //渲染左右侧车道线行
    renderLine = (featuresName, reverse) => {
        const { distances } = this.state;
        const { BatchBuildStore } = this.props;
        const text = featuresName.includes('left') ? '左' : '右';
        const features = reverse
            ? BatchBuildStore[featuresName].reverse()
            : BatchBuildStore[featuresName];
        const featuresL = features.length;
        return features.map((item, index) => {
            const { DISTANCE } = item;
            const i = reverse ? featuresL - index - 1 : index;
            const isCurrentRange = this.isCurrentRange(featuresName, i);
            const isCurrentFeature = this.isCurrentFeature(featuresName, i);
            const label = `${text}${i + 1}`;
            return (
                <div
                    className={`line ${isCurrentFeature ? 'on' : ''}`}
                    key={label}
                    onClick={() => this.handleClick(featuresName, i)}
                >
                    <div className="index-label">{label}</div>
                    <div className="line-input-box">
                        <span>车道距离:</span>
                        <span onClick={this.stopPropagation}>
                            <InputNumber
                                value={distances?.[featuresName + i] ?? DISTANCE}
                                precision={2}
                                onChange={value => this.handleChange(featuresName, i, value)}
                                onBlur={value => this.handleBlur(featuresName, i, value)}
                            />
                        </span>
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
        const { addFeature, activeFeatureKey, horizontalToolStatus } = BatchBuildStore;
        const [currentFeatureName, currentFeatureIndex] = activeFeatureKey?.split('|') || [];
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
                    <div className="horizontal-refer">
                        <span>路面横截线：</span>
                        <span className="line-button addLines">
                            <IconFont
                                className={`line-icon icon-font-button ${
                                    horizontalToolStatus ? 'on' : ''
                                }`}
                                type="icon-xinzeng"
                                onClick={this.toggle}
                            />
                            <span>新增</span>
                        </span>
                        <span className="line-button">
                            <IconFont
                                className="line-icon icon-font-button clear"
                                type="icon-qingkong"
                                onClick={this.clearHorizontalLayer}
                            />
                            <span>清空</span>
                        </span>
                    </div>
                    <div className="line-box">
                        <div className="arrow-up"></div>
                        <div className="line-content">{this.renderLine('leftFeatures', true)}</div>
                    </div>
                    <div className="divider"></div>
                    <div className="line-box">
                        <div className="arrow-down"></div>
                        <div className="line-content">{this.renderLine('rightFeatures')}</div>
                    </div>
                    {activeFeatureKey && (
                        <BatchBuildAttr
                            key={activeFeatureKey}
                            formItemChange={this.handleFormItemChange}
                            active={activeFeatureKey}
                            activeFeature={BatchBuildStore[currentFeatureName][currentFeatureIndex]}
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
