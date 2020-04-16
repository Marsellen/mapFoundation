import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/define-mode.less';
import LayerTextVectorConfig from 'src/pages/Index/components/RenderMode/LayerTextVectorConfig';

@inject('DefineModeStore')
@observer
class DefineTextVectorConfig extends React.Component {
    render() {
        const { DefineModeStore } = this.props;
        const { vectorTextConfig } = DefineModeStore;
        return (
            <div className="config-wrap">
                {Object.values(vectorTextConfig).map(item => {
                    const { key } = item;
                    return <LayerTextVectorConfig key={key} config={item} />;
                })}
            </div>
        );
    }
}

export default DefineTextVectorConfig;
