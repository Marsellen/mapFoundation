import React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Radio, Switch } from 'antd';
import 'src/asset/less/define-mode.less';
import LayersBufferConfig from 'src/component/home/bufferConfig/layersBufferConfig';
import SelectBufferConfig from 'src/component/home/bufferConfig/selectBufferConfig';
import 'less/ad-buffer-render.less';

@inject('BufferStore')
@observer
class BufferConfigWindow extends React.Component {

    setBufferMode = e => {
        const value = e.target.value;
        const { BufferStore: { setBufferMode } } = this.props;
        setBufferMode(value);
    };

    switchBuffer = checked => {
        const { BufferStore: { showBuffer, hideBuffer } } = this.props;
        checked ? showBuffer() : hideBuffer();
    };
    render() {
        const { BufferStore: { mode, disabled } } = this.props;
        return (
            <div className="buffer-layer">
                <div className="buffer-layer-title">buffer渲染窗口</div>
                <Divider />
                <div className="buffer-config-btn">
                    <Radio.Group className="buffer-config-radio" disabled={!disabled} onChange={this.setBufferMode} value={mode}>
                        <Radio value={1}>全图层渲染</Radio>
                        <Radio value={2}>选择要素渲染</Radio>
                    </Radio.Group>
                    <Switch id="buffer-enable-btn" checked={disabled} onChange={this.switchBuffer} />
                </div>
                {mode == 1 && <LayersBufferConfig />}
                {mode == 2 && <SelectBufferConfig />}
            </div>
        );
    }
}

export default BufferConfigWindow;
