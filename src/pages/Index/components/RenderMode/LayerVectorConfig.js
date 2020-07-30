import React from 'react';
import 'src/assets/less/components/layer-vector-config.less';
import { inject, observer } from 'mobx-react';
import { Checkbox, Icon, Select } from 'antd';
import LayerVectorConfigForm from 'src/pages/Index/components/RenderMode/LayerVectorConfigForm';

const { Option } = Select;

@inject('DefineModeStore')
@observer
class LayerVectorConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    //切换分类设色
    toggle = e => {
        const { checked } = e.target;
        const { DefineModeStore, layerName } = this.props;
        const { initLayerVectorConfig } = DefineModeStore;
        initLayerVectorConfig(layerName, checked);
        this.setState({
            visible: checked
        });
    };

    //显隐所有属性值符号样式的设置表单
    toggleContent = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    //设置某属性值的符号样式
    setVectorStyle = ({
        typeValKey,
        styleKey,
        currentStyleKey,
        styleValue,
        oldValue,
        rule,
        checkValue
    }) => {
        const isValid = checkValue({ currentStyleKey, styleValue, oldValue, rule });
        if (!isValid) return;
        const { layerName, DefineModeStore: { setVectorConfig } = {} } = this.props;
        setVectorConfig({ key: layerName, typeValKey, styleKey, styleValue });
    };

    //通用设置：设置所有属性值的符号样式
    batchSetVectorStyle = ({
        styleKey,
        currentStyleKey,
        styleValue,
        oldValue,
        rule,
        checkValue
    }) => {
        const isValid = checkValue({ currentStyleKey, styleValue, oldValue, rule });
        if (!isValid) return;
        const { layerName, DefineModeStore: { batchSetVectorConfig } = {} } = this.props;
        batchSetVectorConfig({ key: layerName, styleKey, styleValue });
    };

    _detailConfigRender = () => {
        const { visible } = this.state;
        const {
            layerName,
            config: { type },
            DefineModeStore: {
                updateKey,
                vectorConfigMap,
                updateColorKey,
                pointEnabledStatus,
                arrowEnabledStatus
            }
        } = this.props;
        const layerVectorConfigMap = vectorConfigMap[layerName] || {};
        const {
            typeArr,
            typeStyle,
            commonStyle,
            commonStyle: { showFields } = {}
        } = layerVectorConfigMap;
        return (
            <div className="layer-config-form-wrap" key={updateKey}>
                <div className="flex-between layer-config-line-wrap">
                    <label>分类字段</label>
                    <Select
                        disabled={typeArr.length === 1}
                        value={showFields}
                        style={{ width: 222 }}
                        onChange={currentShowFields =>
                            this.batchSetVectorStyle({
                                styleKey: 'showFields',
                                styleValue: currentShowFields
                            })
                        }
                    >
                        {typeArr.map(item => {
                            const { key: optionKey, name } = item || {};
                            return (
                                <Option value={optionKey} key={optionKey}>
                                    {name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <div className={visible ? '' : 'hide'}>
                    <LayerVectorConfigForm
                        className="layer-config-line-style-2"
                        type={type}
                        updateKey={updateKey}
                        layerName={layerName}
                        styleConfigMap={vectorConfigMap} //配置映射
                        styleValueMap={commonStyle} //值映射
                        pointEnabledStatus={pointEnabledStatus}
                        arrowEnabledStatus={arrowEnabledStatus}
                        setStyle={this.batchSetVectorStyle}
                    />
                    <div className="layer-config-detail-wrap" key={updateColorKey}>
                        {typeStyle &&
                            typeStyle.map(item => {
                                return (
                                    <LayerVectorConfigForm
                                        className="layer-config-line-style-3"
                                        type={type}
                                        key={item.value}
                                        updateKey={updateKey}
                                        layerName={layerName}
                                        styleConfigMap={vectorConfigMap} //配置映射
                                        styleValueMap={item} //值映射
                                        pointEnabledStatus={pointEnabledStatus}
                                        arrowEnabledStatus={arrowEnabledStatus}
                                        setStyle={this.setVectorStyle}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {
            layerName,
            config: { type },
            DefineModeStore: { vectorConfigMap, updateKey, pointEnabledStatus, arrowEnabledStatus }
        } = this.props;
        const layerVectorConfigMap = vectorConfigMap[layerName] || {};
        const { label, isClassify, checked, commonStyle } = layerVectorConfigMap;
        const { visible } = this.state;

        return (
            <div className="layer-config-wrap">
                <div className="layer-config-title">
                    <div>
                        {checked && (
                            <Icon
                                type={visible ? 'caret-up' : 'caret-down'}
                                className="arrow-icon"
                                onClick={this.toggleContent}
                            />
                        )}
                        <span>{label}</span>
                    </div>
                    {isClassify && (
                        <Checkbox checked={checked} onChange={this.toggle}>
                            分类设色
                        </Checkbox>
                    )}
                </div>
                {!checked && (
                    <LayerVectorConfigForm
                        className="layer-config-line-style-1"
                        type={type}
                        updateKey={updateKey}
                        layerName={layerName}
                        styleConfigMap={vectorConfigMap} //配置映射
                        styleValueMap={commonStyle} //值映射
                        pointEnabledStatus={pointEnabledStatus}
                        arrowEnabledStatus={arrowEnabledStatus}
                        setStyle={this.batchSetVectorStyle}
                    />
                )}

                {checked && this._detailConfigRender()}
            </div>
        );
    }
}

export default LayerVectorConfig;
