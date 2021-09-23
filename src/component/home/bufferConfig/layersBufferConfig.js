import React from 'react';
import { inject, observer } from 'mobx-react';
import LayersBufferConfigForm from './layersBufferConfigForm';
import 'src/asset/less/define-mode.less';

@inject('BufferStore')
@observer
class LayersBufferConfig extends React.Component {
    render() {
        const { BufferStore: { allLayerBufferConfigMap, batchSetBufferConfig } } = this.props;
        return (
            <div className="all-layer-buffer-config">
                {Object.values(allLayerBufferConfigMap).map(item => {
                    return (<LayersBufferConfigForm key={item.key} config={item}  setStyle={batchSetBufferConfig}/>)
                })}
            </div>
        );
    }
}

export default LayersBufferConfig;
