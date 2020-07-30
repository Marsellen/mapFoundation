import 'src/assets/less/components/layer-vector-config.less';
import React from 'react';
import { Checkbox } from 'antd';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdNodeSelect from 'src/components/Form/AdNodeSelect';
import AdInputPositiveNumber from 'src/components/Form/AdInputPositiveNumber';

class LayerVectorConfigForm extends React.Component {
    constructor(props) {
        super(props);
        const { type } = props;
        this.isPolygon = type === 'Polygon';
        this.isLine = type === 'Line';
        this.isPoint = type === 'Point';
        this.state = {
            currentPointSize: 0,
            currentRadius: 0
        };
    }

    handleChange = ({ styleKey, styleValue, oldValue }) => {
        this.setState({
            [styleKey]: styleValue === 0 ? oldValue : styleValue
        });
    };

    //检查值的正确性
    checkValue = ({ currentStyleKey, styleValue, oldValue, rule }) => {
        if (styleValue === undefined || styleValue === null) return false;
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

    render() {
        const { currentRadius, currentPointSize } = this.state;
        const {
            updateKey,
            className,
            setStyle,
            layerName,
            pointEnabledStatus,
            arrowEnabledStatus,
            styleConfigMap,
            styleValueMap: {
                value: typeValKey,
                label,
                color,
                radius,
                lineStyle,
                pointStyle,
                point,
                pointSize,
                arrow
            } = {}
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
                            setStyle({
                                typeValKey,
                                styleKey: 'color',
                                styleValue: value,
                                checkValue: this.checkValue
                            })
                        }
                    />
                </div>
                {styleOptionArr && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">样式:</label>
                        <AdNodeSelect
                            className="field"
                            width={70}
                            value={lineStyle}
                            size={styleFieldSize}
                            options={styleOptionArr}
                            onChange={value =>
                                setStyle({
                                    typeValKey,
                                    styleKey: 'lineStyle',
                                    styleValue: value,
                                    checkValue: this.checkValue
                                })
                            }
                        />
                    </div>
                )}
                {pointIconOptionArr && (
                    <div className="layer-config-field-wrap">
                        <label className="field-label">样式:</label>
                        <AdNodeSelect
                            className="field"
                            width={70}
                            value={pointStyle || 'dianyaosu'}
                            size={styleFieldSize}
                            options={pointIconOptionArr}
                            onChange={value =>
                                setStyle({
                                    typeValKey,
                                    styleKey: 'pointStyle',
                                    styleValue: value,
                                    checkValue: this.checkValue
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
                            step={0.01}
                            precision={2}
                            width={50}
                            onChange={value =>
                                this.handleChange({
                                    styleKey: 'currentRadius',
                                    styleValue: value,
                                    oldValue: radius
                                })
                            }
                            onBlur={() =>
                                setStyle({
                                    typeValKey,
                                    styleKey: 'radius',
                                    currentStyleKey: 'currentRadius',
                                    styleValue: currentRadius,
                                    oldValue: radius,
                                    rule: { min: 0, max: 1 },
                                    checkValue: this.checkValue
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
                                setStyle({
                                    typeValKey,
                                    styleKey: 'point',
                                    styleValue: e.target.checked,
                                    checkValue: this.checkValue
                                })
                            }
                        >
                            圆点
                        </Checkbox>
                        <AdInputPositiveNumber
                            className="field"
                            value={point ? currentPointSize || pointSize : ''}
                            step={0.01}
                            precision={2}
                            disabled={!point || !pointEnabledStatus}
                            width={40}
                            onChange={value =>
                                this.handleChange({
                                    styleKey: 'currentPointSize',
                                    styleValue: value,
                                    oldValue: pointSize
                                })
                            }
                            onBlur={() =>
                                setStyle({
                                    typeValKey,
                                    styleKey: 'pointSize',
                                    currentStyleKey: 'currentPointSize',
                                    styleValue: currentPointSize,
                                    oldValue: pointSize,
                                    rule: { min: 0, max: 5 },
                                    checkValue: this.checkValue
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
                                setStyle({
                                    typeValKey,
                                    styleKey: 'arrow',
                                    styleValue: e.target.checked,
                                    checkValue: this.checkValue
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
