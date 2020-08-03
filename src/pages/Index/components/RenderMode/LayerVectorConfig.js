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
                arrowEnabledStatus,
                setVectorConfig,
                batchSetVectorConfig
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
                        style={{ width: 227 }}
                        onChange={currentShowFields =>
                            batchSetVectorConfig({
                                key: layerName,
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
                        {...commonStyle}
                        className="layer-config-line-style-2"
                        type={type}
                        updateKey={updateKey}
                        layerName={layerName}
                        styleConfigMap={vectorConfigMap} //配置映射
                        pointEnabledStatus={pointEnabledStatus}
                        arrowEnabledStatus={arrowEnabledStatus}
                        setStyle={batchSetVectorConfig}
                    />
                    <div className="layer-config-detail-wrap" key={updateColorKey}>
                        {typeStyle &&
                            typeStyle.map(item => {
                                return (
                                    <LayerVectorConfigForm
                                        {...item}
                                        className="layer-config-line-style-3"
                                        type={type}
                                        key={item.value}
                                        updateKey={updateKey}
                                        layerName={layerName}
                                        styleConfigMap={vectorConfigMap} //配置映射
                                        pointEnabledStatus={pointEnabledStatus}
                                        arrowEnabledStatus={arrowEnabledStatus}
                                        setStyle={setVectorConfig}
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
            DefineModeStore: {
                vectorConfigMap,
                updateKey,
                pointEnabledStatus,
                arrowEnabledStatus,
                batchSetVectorConfig
            }
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
                        {...commonStyle}
                        className="layer-config-line-style-1"
                        type={type}
                        updateKey={updateKey}
                        layerName={layerName}
                        styleConfigMap={vectorConfigMap} //配置映射
                        pointEnabledStatus={pointEnabledStatus}
                        arrowEnabledStatus={arrowEnabledStatus}
                        setStyle={batchSetVectorConfig}
                    />
                )}
                {checked && this._detailConfigRender()}
            </div>
        );
    }
}

export default LayerVectorConfig;
