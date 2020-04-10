import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Checkbox, Icon, Select } from 'antd';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdInputPositiveNumber from 'src/components/Form/AdInputPositiveNumber';
import { inject, observer } from 'mobx-react';

const { Option } = Select;

@inject('DefineModeStore')
@observer
class LayerTextVectorConfig extends React.Component {
    state = {
        visible: false,
        currentFontSize: '',
        currentInterval: '',
        currentOffset: ''
    };

    componentDidMount() {
        const { DefineModeStore, config } = this.props;
        const { initLayerTextConfig } = DefineModeStore;
        const { key } = config;
        initLayerTextConfig(key, config);
    }
    //显隐注记
    toggle = e => {
        const { checked } = e.target;
        const { DefineModeStore, config } = this.props;
        const { toggleLayerTextConfig } = DefineModeStore;
        const { key } = config;
        toggleLayerTextConfig(key, checked);
    };

    handleChange = (styleKey, styleValue, oldValue) => {
        this.setState({
            [styleKey]: styleValue === 0 ? oldValue : styleValue
        });
    };

    //重新渲染画布
    updateConfig = (styleKey, styleValue, oldValue) => {
        if (!styleValue) return;
        if (oldValue && oldValue === styleValue) {
            this.setState({
                [styleKey]: styleValue
            });
            return;
        }
        const { DefineModeStore, config } = this.props;
        const { setLayerTextConfig } = DefineModeStore;
        const { key } = config;

        setLayerTextConfig(key, styleKey, styleValue);
    };

    _layerConfigNode = () => {
        const { currentFontSize, currentInterval, currentOffset } = this.state;
        const { config, DefineModeStore } = this.props;
        const { vectorTextConfig, updateKey } = DefineModeStore;
        const { key } = config;
        let {
            interval,
            offset,
            showMode,
            fontSize,
            textKey,
            strokeColor,
            backgroundColor,
            textColor,
            defaultIntervalMap,
            defaultOffsetMap,
            textModeMap,
            textTypeArr
        } = vectorTextConfig[key] || {};
        const defaultInterval =
            defaultIntervalMap && defaultIntervalMap[showMode];
        interval = defaultInterval ? interval || defaultInterval : '';
        const defaultOffset = defaultOffsetMap && defaultOffsetMap[showMode];
        offset = offset || offset == 0 ? offset : defaultOffset;
        const isOffset = textModeMap[showMode].offset;
        const isInterval = textModeMap[showMode].interval;

        return (
            <div className="config-content config-content-2">
                <div className="flex-between input-wrap">
                    <label>注记字段：</label>
                    <Select
                        value={textKey}
                        style={{ width: 260 }}
                        onChange={val => this.updateConfig('textKey', val)}>
                        {textTypeArr.map(item => {
                            const { key, label } = item;
                            return (
                                <Option value={key} key={key}>
                                    {label}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <div className="flex-between input-wrap">
                    <div className="flex-between">
                        <label>文本颜色：</label>
                        <AdColorInput
                            size={14}
                            icon="wenben"
                            color={textColor}
                            onChange={val =>
                                this.updateConfig('textColor', val)
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <AdColorInput
                            size={14}
                            icon="miaobian"
                            color={strokeColor}
                            background={{ r: 255, g: 255, b: 255, a: 1 }}
                            onChange={val =>
                                this.updateConfig('strokeColor', val)
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <label>背景：</label>
                        <AdColorInput
                            color={backgroundColor}
                            onChange={val =>
                                this.updateConfig('backgroundColor', val)
                            }
                        />
                    </div>
                    <div className="flex-between" key={updateKey}>
                        <label>字大：</label>
                        <AdInputPositiveNumber
                            width={76}
                            value={currentFontSize || fontSize}
                            onChange={val =>
                                this.handleChange(
                                    'currentFontSize',
                                    val,
                                    fontSize
                                )
                            }
                            onBlur={() =>
                                this.updateConfig(
                                    'fontSize',
                                    currentFontSize,
                                    fontSize
                                )
                            }
                        />
                    </div>
                </div>
                <div className="flex-between input-wrap" key={updateKey}>
                    <div className="flex-between">
                        <label>显示模式：</label>
                        <Select
                            value={showMode}
                            style={{ width: 105 }}
                            onChange={val =>
                                this.updateConfig('showMode', val)
                            }>
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
                                value={currentInterval || interval}
                                onChange={val =>
                                    this.handleChange(
                                        'currentInterval',
                                        val,
                                        interval
                                    )
                                }
                                onBlur={() =>
                                    this.updateConfig(
                                        'interval',
                                        currentInterval,
                                        interval
                                    )
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
                                value={currentOffset || offset}
                                onChange={val =>
                                    this.handleChange(
                                        'currentOffset',
                                        val,
                                        offset
                                    )
                                }
                                onBlur={() =>
                                    this.updateConfig(
                                        'offset',
                                        currentOffset,
                                        offset
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { config, DefineModeStore } = this.props;
        const { key, label } = config;
        const { vectorTextConfig, setVectorsConfig } = DefineModeStore;
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
                    <Checkbox onChange={this.toggle}>显示注记</Checkbox>
                </div>
                {checked && this._layerConfigNode(setVectorsConfig)}
            </div>
        );
    }
}

export default LayerTextVectorConfig;
