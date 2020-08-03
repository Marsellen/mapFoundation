import 'src/assets/less/components/layer-vector-config.less';
import React from 'react';
import { Checkbox } from 'antd';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdNodeSelect from 'src/components/Form/AdNodeSelect';
import AdInputPositiveNumber from 'src/components/Form/AdInputPositiveNumber';

class LayerVectorConfigForm extends React.Component {
    constructor(props) {
        super(props);
        const { type, radius, pointSize } = props;
        this.isPolygon = type === 'Polygon';
        this.isLine = type === 'Line';
        this.isPoint = type === 'Point';
        this.state = {
            currentRadius: radius,
            currentPointSize: pointSize
        };
    }

    handleChange = ({ styleKey, styleValue }) => {
        if (!styleValue) return;
        this.setState({
            [styleKey]: styleValue
        });
    };

    //检查值的正确性
    checkValue = ({ currentStyleKey, styleValue, oldValue, rule }) => {
        if (styleValue === undefined || styleValue === null) {
            this.setState({
                [currentStyleKey]: oldValue
            });
            return false;
        }
        if (oldValue && oldValue === styleValue) {
            this.setState({
                [currentStyleKey]: oldValue
            });
            return false;
        }
        if (rule) {
            const { min, max } = rule;
            if (styleValue <= min || styleValue >= max) {
                this.setState({
                    [currentStyleKey]: oldValue
                });
                return false;
            }
        }
        this.setState({
            [currentStyleKey]: styleValue
        });
        return true;
    };

    setStyle = ({ key, typeValKey, styleKey, currentStyleKey, styleValue, oldValue, rule }) => {
        const isValid = this.checkValue({ currentStyleKey, styleValue, oldValue, rule });
        if (!isValid) return;
        this.props.setStyle({
            key,
            typeValKey,
            styleKey,
            currentStyleKey,
            styleValue,
            oldValue,
            rule
        });
    };

    render() {
        const { currentRadius, currentPointSize } = this.state;
        const {
            updateKey,
            className,
            layerName,
            pointEnabledStatus,
            arrowEnabledStatus,
            styleConfigMap,
            value: typeValKey,
            label,
            color,
            radius,
            pointStyle,
            lineStyle,
            polygonStyle,
            point,
            pointSize,
            arrow
        } = this.props;
        const {
            styleOptionArr,
            pointIconOptionArr,
            fieldStyle: { colorFieldSize, colorFieldIcon, styleFieldSize } = {}
        } = styleConfigMap[layerName];

        return (
            <div className={`layer-config-line-wrap ${className}`} key={updateKey}>
                <label className="common-label">通用设置</label>
                <label className="type-label" title={label}>
                    {label}
                </label>
                <div className="layer-config-field-wrap">
                    <label className="field-label">颜色:</label>
                    <AdColorInput
                        className="field"
                        color={color}
                        size={colorFieldSize}
                        icon={colorFieldIcon}
                        disableAlpha={this.isPoint}
                        onChange={value =>
                            this.setStyle({
                                key: layerName,
                                typeValKey,
                                styleKey: 'color',
                                styleValue: value
                            })
                        }
                    />
                </div>
                {this.isLine && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">样式:</label>
                        <AdNodeSelect
                            className="field line-field"
                            value={lineStyle}
                            size={styleFieldSize}
                            options={styleOptionArr}
                            onChange={value =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'lineStyle',
                                    styleValue: value
                                })
                            }
                        />
                    </div>
                )}
                {this.isPolygon && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">样式:</label>
                        <AdNodeSelect
                            className="field polygon-field"
                            value={polygonStyle}
                            size={styleFieldSize}
                            options={styleOptionArr}
                            onChange={value =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'polygonStyle',
                                    styleValue: value
                                })
                            }
                        />
                    </div>
                )}
                {this.isPoint && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">样式:</label>
                        <AdNodeSelect
                            className="field point-field"
                            value={pointStyle || 'dianyaosu'}
                            size={styleFieldSize}
                            options={pointIconOptionArr}
                            onChange={value =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'pointStyle',
                                    styleValue: value
                                })
                            }
                        />
                    </div>
                )}
                {this.isPoint && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">尺寸:</label>
                        <AdInputPositiveNumber
                            className="field"
                            value={currentRadius || radius}
                            step={0.001}
                            precision={3}
                            width={50}
                            onChange={value =>
                                this.handleChange({
                                    styleKey: 'currentRadius',
                                    styleValue: value
                                })
                            }
                            onBlur={() =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'radius',
                                    currentStyleKey: 'currentRadius',
                                    styleValue: currentRadius,
                                    oldValue: radius,
                                    rule: { min: 0, max: 1 }
                                })
                            }
                        />
                    </div>
                )}
                {this.isLine && (
                    <div className="layer-config-field-wrap">
                        <Checkbox
                            className="field"
                            checked={point}
                            disabled={!pointEnabledStatus}
                            onChange={e =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'point',
                                    styleValue: e.target.checked
                                })
                            }
                        >
                            圆点
                        </Checkbox>
                        <AdInputPositiveNumber
                            className="field"
                            value={point ? currentPointSize || pointSize : ''}
                            step={0.001}
                            precision={3}
                            disabled={!point || !pointEnabledStatus}
                            width={45}
                            onChange={value =>
                                this.handleChange({
                                    styleKey: 'currentPointSize',
                                    styleValue: value
                                })
                            }
                            onBlur={() =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'pointSize',
                                    currentStyleKey: 'currentPointSize',
                                    styleValue: currentPointSize,
                                    oldValue: pointSize,
                                    rule: { min: 0, max: 1 }
                                })
                            }
                        />
                    </div>
                )}
                {this.isLine && (
                    <div className="layer-config-field-wrap">
                        <Checkbox
                            className="field"
                            checked={arrow}
                            disabled={!arrowEnabledStatus}
                            onChange={e =>
                                this.setStyle({
                                    key: layerName,
                                    typeValKey,
                                    styleKey: 'arrow',
                                    styleValue: e.target.checked
                                })
                            }
                        >
                            箭头
                        </Checkbox>
                    </div>
                )}
            </div>
        );
    }
}

export default LayerVectorConfigForm;
