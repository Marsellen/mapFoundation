import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { inject, observer } from 'mobx-react';
import { Checkbox, Icon, Select } from 'antd';
import { colorOptionArr } from 'src/config/VectorConfigMap';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdNodeSelect from 'src/components/Form/AdNodeSelect';
import AdColorSelect from 'src/components/Form/AdColorSelect';
import AdInputPositiveNumber from 'src/components/Form/AdInputPositiveNumber';

const { Option } = Select;

@inject('DefineModeStore')
@observer
class LayerVectorConfig extends React.Component {
    constructor(props) {
        super(props);

        const { config } = props;
        const { type } = config;
        this.isPolygon = type === 'Polygon';
        this.isLine = type === 'Line';
        this.isPoint = type === 'Point';

        this.state = {
            commonRadius: 0
        };
    }

    toggle = e => {
        const { checked } = e.target;
        const { DefineModeStore, layerName } = this.props;
        const { initLayerVectorConfig } = DefineModeStore;
        initLayerVectorConfig(layerName, checked);
    };

    handleChange = ({ styleKey, styleValue, oldValue }) => {
        this.setState({
            [styleKey]: styleValue === 0 ? oldValue : styleValue
        });
    };

    checkStyleValue = ({ currentStyleKey, styleValue, oldValue, rule }) => {
        if (!styleValue) return false;
        if (oldValue && oldValue === styleValue) {
            this.setState({
                [currentStyleKey]: oldValue
            });
            return false;
        }
        if (rule) {
            const { min, max } = rule;
            if (styleValue < min || styleValue > max) {
                this.setState({
                    [currentStyleKey]: oldValue
                });
                return false;
            }
        }
        return true;
    };

    setVectorStyle = ({
        typeValkey,
        styleKey,
        currentStyleKey,
        styleValue,
        oldValue,
        rule
    }) => {
        const isValid = this.checkStyleValue({
            currentStyleKey,
            styleValue,
            oldValue,
            rule
        });
        if (!isValid) return;

        const { layerName, DefineModeStore } = this.props;
        const { setVectorConfig } = DefineModeStore;
        setVectorConfig(layerName, typeValkey, styleKey, styleValue);
        this.setState({
            [currentStyleKey]: 0
        });
    };

    batchSetVectorStyle = ({
        styleKey,
        currentStyleKey,
        styleValue,
        oldValue,
        rule
    }) => {
        const isValid = this.checkStyleValue({
            currentStyleKey,
            styleValue,
            oldValue,
            rule
        });
        if (!isValid) return;

        const { layerName, DefineModeStore } = this.props;
        const { batchSetVectorConfig } = DefineModeStore;
        batchSetVectorConfig(layerName, styleKey, styleValue);
        this.setState({
            [currentStyleKey]: 0
        });
    };

    batchSetVectorColor = ({ styleKey, styleValue }) => {
        const { layerName, DefineModeStore } = this.props;
        const { batchSetVectorColor } = DefineModeStore;
        batchSetVectorColor(layerName, styleKey, styleValue);
    };

    _configRender = () => {
        const { commonRadius } = this.state;
        const { DefineModeStore, layerName } = this.props;
        const { vectorConfigMap, updateKey } = DefineModeStore;
        const {
            defaultStyle,
            styleOptionArr,
            arrowOptionArr,
            pointIconOptionArr,
            fieldStyle
        } = vectorConfigMap[layerName];
        const { colorFieldSize, colorFieldIcon, styleFieldSize } =
            fieldStyle || {};
        let { color, radius, lineStyle, pointIcon } = defaultStyle || {};
        return (
            <div className="config-content config-content-1" key={updateKey}>
                <div className="field-box">
                    <label>颜色:</label>
                    <AdColorInput
                        className="field"
                        color={color}
                        size={colorFieldSize}
                        icon={colorFieldIcon}
                        disableAlpha={this.isPoint}
                        onChange={currentColor =>
                            this.batchSetVectorStyle({
                                styleKey: 'color',
                                styleValue: currentColor
                            })
                        }
                    />
                </div>
                {styleOptionArr && (
                    <div className="field-box">
                        <label>样式:</label>
                        <AdNodeSelect
                            className="field"
                            value={lineStyle}
                            disabled={this.isLine}
                            size={styleFieldSize}
                            options={styleOptionArr}
                            onChange={currentLineStyle =>
                                this.batchSetVectorStyle({
                                    styleKey: 'lineStyle',
                                    styleValue: currentLineStyle
                                })
                            }
                        />
                    </div>
                )}
                {pointIconOptionArr && (
                    <div className="field-box">
                        <label>样式:</label>
                        <AdNodeSelect
                            className="field"
                            value={pointIcon || 'dianyaosu'}
                            disabled={this.isLine}
                            size={styleFieldSize}
                            options={pointIconOptionArr}
                            onChange={currentPointIcon =>
                                this.batchSetVectorStyle({
                                    styleKey: 'pointIcon',
                                    styleValue: currentPointIcon
                                })
                            }
                        />
                    </div>
                )}
                {arrowOptionArr && (
                    <div className="field-box">
                        <label>箭头:</label>
                        <AdNodeSelect
                            className="field"
                            disabled={this.isLine}
                            options={arrowOptionArr}
                            onChange={() =>
                                this.batchSetVectorStyle({
                                    styleKey: 'arrowStyle',
                                    styleValue: ''
                                })
                            }
                        />
                    </div>
                )}
                {radius && (
                    <div className="field-box">
                        <label>尺寸:</label>
                        <AdInputPositiveNumber
                            className="field"
                            value={commonRadius || radius}
                            step={0.01}
                            precision={2}
                            onChange={val =>
                                this.handleChange({
                                    styleKey: 'commonRadius',
                                    styleValue: val,
                                    oldValue: radius
                                })
                            }
                            onBlur={() =>
                                this.batchSetVectorStyle({
                                    styleKey: 'radius',
                                    currentStyleKey: 'commonRadius',
                                    styleValue: commonRadius,
                                    oldValue: radius,
                                    rule: { min: 0, max: 1 }
                                })
                            }
                        />
                    </div>
                )}
            </div>
        );
    };

    _detailConfigRender = () => {
        const { DefineModeStore, layerName } = this.props;
        const {
            updateKey,
            vectorConfig,
            vectorConfigMap,
            updateColorKey
        } = DefineModeStore;
        const {
            defaultStyle,
            styleOptionArr,
            arrowOptionArr,
            pointIconOptionArr,
            fieldStyle,
            typeArr
        } = vectorConfigMap[layerName];
        const { colorFieldSize, colorFieldIcon, styleFieldSize } =
            fieldStyle || {};
        const { color, showFields } = defaultStyle;
        const layerVectorConfig = vectorConfig[layerName] || {};
        const typeVectorConfig = layerVectorConfig.vectorStyle[showFields];
        return (
            <div className="config-content config-content-2" key={updateKey}>
                <div className="flex-between input-wrap">
                    <label>分类字段</label>
                    <Select
                        disabled={typeArr.length === 1}
                        value={showFields}
                        style={{ width: 190 }}
                        onChange={currentShowFields =>
                            this.batchSetVectorStyle({
                                styleKey: 'showFields',
                                styleValue: currentShowFields
                            })
                        }>
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
                <div className="flex-between input-wrap">
                    <label>颜色</label>
                    <AdColorSelect
                        width={190}
                        color={color}
                        options={colorOptionArr}
                        onChange={currentColor =>
                            this.batchSetVectorColor({
                                styleKey: 'color',
                                styleValue: currentColor
                            })
                        }
                    />
                </div>
                <div key={updateColorKey}>
                    {typeVectorConfig &&
                        typeVectorConfig.map((item, index) => {
                            const { value: typeValkey, label, style } =
                                item || {};
                            const {
                                color,
                                radius,
                                pointIcon,
                                lineStyle
                            } = style;
                            const typeValRadius = this.state[`radius${index}`];
                            return (
                                <div
                                    className="flex-between input-wrap"
                                    key={typeValkey}>
                                    <label>{label}</label>
                                    <div className="flex-between input-box">
                                        <AdColorInput
                                            className="field"
                                            color={color}
                                            size={colorFieldSize}
                                            icon={colorFieldIcon}
                                            disableAlpha={this.isPoint}
                                            onChange={currentColor =>
                                                this.setVectorStyle({
                                                    typeValkey,
                                                    styleKey: 'color',
                                                    styleValue: currentColor
                                                })
                                            }
                                        />
                                        {styleOptionArr && (
                                            <AdNodeSelect
                                                className={`field ${
                                                    this.isPolygon
                                                        ? 'point-field'
                                                        : ''
                                                }`}
                                                value={lineStyle}
                                                disabled={this.isLine}
                                                size={styleFieldSize}
                                                options={styleOptionArr}
                                                onChange={currentLineStyle =>
                                                    this.setVectorStyle({
                                                        typeValkey,
                                                        styleKey: 'lineStyle',
                                                        styleValue: currentLineStyle
                                                    })
                                                }
                                            />
                                        )}
                                        {pointIconOptionArr && (
                                            <AdNodeSelect
                                                className="field"
                                                value={pointIcon}
                                                disabled={this.isLine}
                                                size={styleFieldSize}
                                                options={pointIconOptionArr}
                                                onChange={currentPointIcon =>
                                                    this.setVectorStyle({
                                                        typeValkey,
                                                        styleKey: 'pointIcon',
                                                        styleValue: currentPointIcon
                                                    })
                                                }
                                            />
                                        )}
                                        {arrowOptionArr && (
                                            <AdNodeSelect
                                                className="field"
                                                disabled={this.isLine}
                                                options={arrowOptionArr}
                                                onChange={() =>
                                                    this.setVectorStyle({
                                                        typeValkey,
                                                        styleKey: 'arrowStyle',
                                                        styleValue: ''
                                                    })
                                                }
                                            />
                                        )}
                                        {radius && (
                                            <AdInputPositiveNumber
                                                className="field"
                                                value={typeValRadius || radius}
                                                step={0.01}
                                                precision={2}
                                                onChange={val =>
                                                    this.handleChange({
                                                        styleKey: `radius${index}`,
                                                        styleValue: val,
                                                        oldValue: radius
                                                    })
                                                }
                                                onBlur={() =>
                                                    this.setVectorStyle({
                                                        typeValkey,
                                                        styleKey: 'radius',
                                                        currentStyleKey: `radius${index}`,
                                                        styleValue: typeValRadius,
                                                        oldValue: radius,
                                                        rule: { min: 0, max: 1 }
                                                    })
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    };
    render() {
        const { DefineModeStore, layerName } = this.props;
        const { vectorConfigMap } = DefineModeStore;
        const { label, typeArr, checked } = vectorConfigMap[layerName];
        return (
            <div>
                <div className="config-title">
                    <div>
                        <Icon
                            type={checked ? 'caret-up' : 'caret-right'}
                            className={checked ? 'blue' : ''}
                        />
                        <span>{label}</span>
                    </div>
                    {typeArr && (
                        <Checkbox checked={checked} onChange={this.toggle}>
                            分类设色
                        </Checkbox>
                    )}
                </div>
                {!checked && this._configRender()}
                {checked && this._detailConfigRender()}
            </div>
        );
    }
}

export default LayerVectorConfig;
