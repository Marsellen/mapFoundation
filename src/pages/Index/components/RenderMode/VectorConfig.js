import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/define-mode.less';
import LayerVectorConfig from 'src/pages/Index/components/RenderMode/LayerVectorConfig.js';

@inject('TextStore')
@observer
class VectorConfig extends React.Component {
    render() {
        const { TextStore } = this.props;
        const { vectorTextConfig } = TextStore;
        return (
            // <div className="config-wrap">
            //     {Object.values(vectorTextConfig).map(item => {
            //         const { key } = item;
            //         return <LayerTextConfig key={key} config={item} />;
            //     })}
            // </div>
            <LayerVectorConfig />
        );
    }
}

export default VectorConfig;
