import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { Checkbox, Icon, Select } from 'antd';
import AdColorInput from 'src/components/Form/AdColorInput';
import AdInputNumber from 'src/components/Form/AdInputNumber';
import { inject, observer } from 'mobx-react';

const { Option } = Select;

@inject('DefineModeStore')
@observer
class LayerTextVectorConfig extends React.Component {
    state = { visible: false };

    componentDidMount() {
        const { DefineModeStore, config } = this.props;
        const { initLayerTextConfig } = DefineModeStore;
        const { key } = config;
        initLayerTextConfig(key, config);
    }

    toggle = e => {
        const { checked } = e.target;
        const { DefineModeStore, config } = this.props;
        const { toggleLayerTextConfig } = DefineModeStore;
        const { key } = config;
        toggleLayerTextConfig(key, checked);
    };

    handleChange = (styleKey, styleValue) => {
        const { DefineModeStore, config } = this.props;
        const { setLayerTextConfig } = DefineModeStore;
        const { key } = config;
        setLayerTextConfig(key, styleKey, styleValue);
    };

    handleFontSizeChange = (newStyleValue, oldStyleValue) => {
        if (newStyleValue >= 12 && newStyleValue <= 1000) {
            this.handleChange('fontSize', newStyleValue);
        } else {
            this.handleChange('fontSize', oldStyleValue);
        }
    };

    handleIntervalChange = (newStyleValue, oldStyleValue) => {
        if (newStyleValue > 0 && newStyleValue <= 1000) {
            this.handleChange('interval', newStyleValue);
        } else {
            this.handleChange('interval', oldStyleValue);
        }
    };

    handleOffsetChange = (newStyleValue, oldStyleValue) => {
        if (newStyleValue >= 0 && newStyleValue <= 1000) {
            this.handleChange('offset', newStyleValue);
        } else {
            this.handleChange('offset', oldStyleValue);
        }
    };

    _layerConfigNode = () => {
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
                        onChange={val => this.handleChange('textKey', val)}>
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
                                this.handleChange('textColor', val)
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
                                this.handleChange('strokeColor', val)
                            }
                        />
                    </div>
                    <div className="flex-between">
                        <label>背景：</label>
                        <AdColorInput
                            color={backgroundColor}
                            onChange={val =>
                                this.handleChange('backgroundColor', val)
                            }
                        />
                    </div>
                    <div className="flex-between" key={updateKey}>
                        <label>字大：</label>
                        <AdInputNumber
                            width={76}
                            value={fontSize}
                            slowCallback={true}
                            onChange={val =>
                                this.handleFontSizeChange(val, fontSize)
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
                                this.handleChange('showMode', val)
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
                            <AdInputNumber
                                width={76}
                                precision={2}
                                slowCallback={true}
                                disabled={!isInterval}
                                value={interval}
                                onChange={val =>
                                    this.handleIntervalChange(val, interval)
                                }
                            />
                        </div>
                    )}
                    {defaultOffsetMap && (
                        <div className="flex-between">
                            <label>偏移距离：</label>
                            <AdInputNumber
                                width={76}
                                precision={2}
                                slowCallback={true}
                                disabled={!isOffset}
                                value={offset}
                                onChange={val =>
                                    this.handleOffsetChange(val, offset)
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
