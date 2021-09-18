import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Slider, Checkbox } from 'antd';
import AdInputPositiveNumber from 'src/component/common/form/adInputPositiveNumber';
import AdColorInput from 'src/component/common/form/adColorInput';
import { PART_OF_BUFFER_ENABLE_LAYERS } from 'src/config/bufferConfig/bufferConfigMap';
import 'src/asset/less/define-mode.less';

@inject('BufferStore')
@observer
class LayersBufferConfigForm extends React.Component {
    setStyle = ({ key, bufferStyle, bufferFields, styleKey, styleValue }) => {
        bufferFields.map(field => {
            this.props.setStyle({
                key,
                bufferStyleMap: bufferStyle[field],
                styleKey,
                styleValue
            });
        })
    }

    handleCurrentStyle = (bufferStyle, bufferFields) => {
        const style = bufferFields.map(field => {
            const itemStyle = Array.from(bufferStyle[field], item => item.style);
            return itemStyle?.[0]
        });
        return style?.[0];
    }

    showBuffer = (e) => {
        const { checked } = e.target;
        const { config: { key }, BufferStore: { showBuffer } } = this.props;
        showBuffer(key, checked);
    }

    _bufferConfigNode = () => {
        const { config: { key }, BufferStore: { bufferConfig } } = this.props;
        const { bufferStyle, bufferFields } = bufferConfig[key];
        const { radius, color, opacity } = this.handleCurrentStyle(bufferStyle, bufferFields);
        return (
            <div className="buffer-config-content">
                <div className="buffer-config-filed">
                    <label className="buffer-config-filed-label">半径</label>
                    <AdInputPositiveNumber
                        className="input-buffer"
                        step={0.01}
                        precision={2}
                        width={50}
                        size="small"
                        value={radius}
                        onChange={value =>
                            this.setStyle({
                                key,
                                bufferStyle, 
                                bufferFields,
                                styleKey: 'radius',
                                styleValue: value
                            })
                        }
                    />
                    <span className="ant-form-text">米</span>
                </div>
                <div className="buffer-config-filed">
                    <label className="buffer-config-filed-label">颜色</label>
                    <AdColorInput
                        color={color}
                        disableAlpha={true}
                        onChange={value =>
                            this.setStyle({
                                key,
                                bufferStyle, 
                                bufferFields,
                                styleKey: 'color',
                                styleValue: value
                            })
                        }
                    />
                </div>
                <div className="buffer-config-filed buffer-opacity">
                    <label className="buffer-config-filed-label">透明度</label>
                    <Slider
                        className="flex-1"
                        min={0}
                        max={1}
                        step={0.1}
                        tipFormatter={null}
                        value={opacity}
                        onChange={value =>
                            this.setStyle({
                                key,
                                bufferStyle, 
                                bufferFields,
                                styleKey: 'opacity',
                                styleValue: value
                            })
                        }
                    />
                    <span className="ant-form-text">{opacity * 100 || 20}%</span>
                </div>
            </div>
        )
    }

    render() {
        const { config: { key, label }, BufferStore: { bufferEnableStatus, bufferConfigMap } } = this.props;
        const tips = PART_OF_BUFFER_ENABLE_LAYERS.includes(key) ? '部分' : '全图层';
        const checked = bufferConfigMap[key].checked;
        return (
            <div className="buffer-config-wrap">
                <div className="buffer-config-title">
                    <div>
                        <Icon
                            type={checked ? 'caret-up' : 'caret-right'}
                        />
                        <span>{`${label}（${tips}）`}</span>
                    </div>
                    <Checkbox disabled={!bufferEnableStatus} checked={checked} onChange={this.showBuffer}>
                        显示buffer
                    </Checkbox>
                </div>
                {checked && bufferEnableStatus && this._bufferConfigNode()}
            </div>
        );
    }
}

export default LayersBufferConfigForm;