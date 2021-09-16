import React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Radio, Switch } from 'antd';
import 'src/asset/less/define-mode.less';
import LayersBufferConfig from 'src/component/home/bufferConfig/layersBufferConfig';
import SingleSelectBufferConfig from 'src/component/home/bufferConfig/singleSelectBufferConfig';
import 'less/ad-buffer-render.less';

@inject('BufferStore')
@observer
class BufferConfigWindow extends React.Component {
    componentDidMount() {
        const { BufferStore: { initBufferConfigMap } } = this.props;
        initBufferConfigMap();
    }

    toggleBuffer = e => {
        const value = e.target.value;
        const { BufferStore: { toggleBuffer } } = this.props;
        toggleBuffer(value);
    }

    switchBuffer = checked => {
        const { BufferStore: { switchBuffer } } = this.props;
        switchBuffer(checked);
    }
    render() {
        const { BufferStore: { bufferMode, bufferEnableStatus } } = this.props;
        return (
            <div className="buffer-layer">
                <div className="buffer-layer-title">buffer渲染窗口</div>
                <Divider />
                <div className="buffer-config-btn">
                    <Radio.Group className="buffer-config-radio" disabled={!bufferEnableStatus} onChange={this.toggleBuffer} value={bufferMode}>
                        <Radio value={1}>全图层渲染</Radio>
                        <Radio value={2}>选择要素渲染</Radio>
                    </Radio.Group>
                    <Switch id="buffer-enable-btn" defaultChecked onChange={this.switchBuffer} />
                </div>
                {bufferMode == 1 && <LayersBufferConfig />}
                {bufferMode == 2 && <SingleSelectBufferConfig />}
            </div>
        );
    }
}

export default BufferConfigWindow;
