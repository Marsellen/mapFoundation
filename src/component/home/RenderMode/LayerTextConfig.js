import React from 'react';
import 'src/asset/less/define-mode.less';
import { Checkbox, Icon, Select } from 'antd';
import AdColorInput from 'src/component/common/form/adColorInput';
import AdInputPositiveNumber from 'src/component/common/form/adInputPositiveNumber';
import { inject, observer } from 'mobx-react';
import { LAYER_TYPE_MAP } from 'src/config/adMapDataConfig';
import CheckSelect from 'src/component/common/checkSelect';

const { Option } = Select;

@inject('TextStore')
@observer
class LayerTextConfig extends React.Component {
    state = {
        visible: false,
        currentFontSize: '',
        currentInterval: '',
        currentOffset: ''
    };

    //显隐注记
    toggle = e => {
        const { checked } = e.target;
        const { TextStore, config } = this.props;
        const { toggleLayerTextConfig } = TextStore;
        const { key } = config;
        toggleLayerTextConfig(key, checked);
    };

    handleChange = ({ styleKey, styleValue, oldValue }) => {
        this.setState({
            [styleKey]: styleValue === 0 ? oldValue : styleValue
        });
    };

    //重新渲染画布
    updateConfig = ({ styleKey, currentStyleKey, styleValue, oldValue, rule }) => {
        if (!styleValue) return;
        if (oldValue && oldValue === styleValue) {
            this.setState({
                [currentStyleKey]: oldValue
            });
            return;
        }
        if (rule) {
            const { min, max } = rule;
            if (styleValue < min || styleValue > max) {
                this.setState({
                    [currentStyleKey]: oldValue
                });
                return;
            }
        }
        const { TextStore, config } = this.props;
        const { setLayerTextConfig } = TextStore;
        const { key } = config;

        setLayerTextConfig(key, styleKey, styleValue);
    };

    _layerConfigNode = () => {
        const { config, TextStore } = this.props;
        const { vectorTextConfig } = TextStore;
        const { key } = config;
        let { currentFontSize, currentInterval, currentOffset } = this.state;
        let { defaultIntervalMap, defaultOffsetMap, textModeMap, defaultStyle } =
            vectorTextConfig[key] || {};
        let {
            textFields,
            offset,
            interval,
            showMode,
            fontSize,
            strokeColor,
            backgroundColor,
            textColor
        } = defaultStyle;
        const defaultInterval = defaultIntervalMap && defaultIntervalMap[showMode];
        const defaultOffset = defaultOffsetMap && defaultOffsetMap[showMode];
        const isOffset = textModeMap[showMode].offset;
        const isInterval = textModeMap[showMode].interval;
        currentInterval = currentInterval || interval || defaultInterval;
        currentOffset = currentOffset || offset || defaultOffset;

        return (
            <div className="config-content config-content-2">
                <div className="flex-between input-wrap">
                    <label>注记字段：</label>
                    <CheckSelect
                        value={textFields}
                        style={{ width: 270 }}
                        onChange={val =>
                            this.updateConfig({
                                styleKey: 'textFields',
                                styleValue: val
                            })
                        }
                        options={LAYER_TYPE_MAP[key].map(option => {
                            return {
                                value: option.key,
                                label: option.name
                            };
                        })}
                    />
                </div>
                <div className="flex-between input-wrap">
                    <div className="flex-between">
                        <label>文本颜色：</label>
                        <AdColorInput
                            size={14}
                            icon="wenben"
                            color={textColor}
                            onChange={val =>
                                this.updateConfig({
                                    styleKey: 'textColor',
                                    styleValue: val
                                })
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <AdColorInput
                            size={14}
                            icon="miaobian"
                            color={strokeColor}
                            background={'rgba(255,255,255,1)'}
                            onChange={val =>
                                this.updateConfig({
                                    styleKey: 'strokeColor',
                                    styleValue: val
                                })
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <label>背景：</label>
                        <AdColorInput
                            color={backgroundColor}
                            onChange={val =>
                                this.updateConfig({
                                    styleKey: 'backgroundColor',
                                    styleValue: val
                                })
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <label>字大：</label>
                        <AdInputPositiveNumber
                            width={76}
                            precision={0}
                            value={currentFontSize || fontSize}
                            onChange={val =>
                                this.handleChange({
                                    styleKey: 'currentFontSize',
                                    styleValue: val,
                                    oldValue: fontSize
                                })
                            }
                            onBlur={() =>
                                this.updateConfig({
                                    styleKey: 'fontSize',
                                    currentStyleKey: 'currentFontSize',
                                    styleValue: currentFontSize,
                                    oldValue: fontSize,
                                    rule: { min: 1, max: 100 }
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex-between input-wrap">
                    <div className="flex-between">
                        <label>显示模式：</label>
                        <Select
                            value={showMode}
                            style={{ width: 105 }}
                            onChange={val =>
                                this.updateConfig({
                                    styleKey: 'showMode',
                                    styleValue: val
                                })
                            }
                        >
                            {Object.values(textModeMap).map(item => {
                                const { key, label } = item;
                                return (
                                    <Option value={key} key={key}>
                                        {label}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    {defaultIntervalMap && (
                        <div className="flex-between">
                            <label>循环间距：</label>
                            <AdInputPositiveNumber
                                width={76}
                                precision={2}
                                disabled={!isInterval}
                                value={isInterval && currentInterval}
                                onChange={val =>
                                    this.handleChange({
                                        styleKey: 'currentInterval',
                                        styleValue: val,
                                        oldValue: interval
                                    })
                                }
                                onBlur={() =>
                                    this.updateConfig({
                                        styleKey: 'interval',
                                        currentStyleKey: 'currentInterval',
                                        styleValue: currentInterval,
                                        oldValue: interval,
                                        rule: { min: 0, max: 1000 }
                                    })
                                }
                            />
                        </div>
                    )}
                    {defaultOffsetMap && (
                        <div className="flex-between">
                            <label>偏移距离：</label>
                            <AdInputPositiveNumber
                                width={76}
                                precision={2}
                                disabled={!isOffset}
                                value={isOffset && currentOffset}
                                onChange={val =>
                                    this.handleChange({
                                        styleKey: 'currentOffset',
                                        styleValue: val,
                                        oldValue: offset
                                    })
                                }
                                onBlur={() =>
                                    this.updateConfig({
                                        styleKey: 'offset',
                                        currentStyleKey: 'currentOffset',
                                        styleValue: currentOffset,
                                        oldValue: offset,
                                        rule: { min: 0, max: 1000 }
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { config, TextStore } = this.props;
        const { key, label } = config;
        const { vectorTextConfig } = TextStore;
        const { checked } = vectorTextConfig[key] || {};
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
                    <Checkbox checked={checked} onChange={this.toggle}>
                        显示注记
                    </Checkbox>
                </div>
                {checked && this._layerConfigNode()}
            </div>
        );
    }
}

export default LayerTextConfig;
