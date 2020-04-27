import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/define-mode.less';
import LayerVectorConfig from 'src/pages/Index/components/RenderMode/LayerVectorConfig.js';

@inject('DefineModeStore')
@observer
class VectorConfig extends React.Component {
    render() {
        const { DefineModeStore } = this.props;
        const { vectorConfigMap } = DefineModeStore;
        return (
            <div className="config-wrap">
                {Object.values(vectorConfigMap).map(item => {
                    const { key } = item;
                    return (
                        <LayerVectorConfig
                            key={key}
                            layerName={key}
                            config={item}
                        />
                    );
                })}
            </div>
        );
    }
}

export default VectorConfig;
