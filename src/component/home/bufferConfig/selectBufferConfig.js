import React from 'react';
import { inject, observer } from 'mobx-react';
import { Slider } from 'antd';
import AdInputPositiveNumber from 'src/component/common/form/adInputPositiveNumber';
import AdColorInput from 'src/component/common/form/adColorInput';
import 'src/asset/less/define-mode.less';

@inject('BufferStore')
@observer
class SelectBufferConfig extends React.Component {
    onChange = (key, val) => {
        const { BufferStore } = this.props;
        BufferStore.resetSelectBuffer({ styleKey: key, styleValue: val });
    };

    render() {
        const { BufferStore: { disabled, bufferStyle } } = this.props;
        const { radius, color, opacity } = bufferStyle;
        return (
            <div className="feature-config-buffer">
                {disabled &&
                    <div className="buffer-config-content">
                        <div className="buffer-config-filed">
                            <label className="buffer-config-filed-label">半径</label>
                            <AdInputPositiveNumber
                                className="input-buffer"
                                step={0.01}
                                precision={2}
                                width={70}
                                size="small"
                                value={radius}
                                min={0.01}
                                max={10}
                                onChange={val => this.onChange('radius', val)}
                            />
                            <span className="ant-form-text">米</span>
                        </div>
                        <div className="buffer-config-filed">
                            <label className="buffer-config-filed-label">颜色</label>
                            <AdColorInput
                                color={color}
                                disableAlpha={true}
                                onChange={val => this.onChange('color', val)}
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
                                onChange={val => this.onChange('opacity', val)}
                            />
                            <span className="ant-form-text">{opacity * 100 || 20}%</span>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

export default SelectBufferConfig;
