import React from 'react';
import 'src/assets/less/components/define-mode.less';
import { LAYER_TEXT_MAP } from 'src/config/TextVectorConfig';
import LayerTextVectorConfig from 'src/pages/Index/components/RenderMode/LayerTextVectorConfig';

class DefineTextVectorConfig extends React.Component {
    render() {
        return (
            <div>
                {Object.values(LAYER_TEXT_MAP).map(item => {
                    const { key } = item;
                    return <LayerTextVectorConfig key={key} config={item} />;
                })}
            </div>
        );
    }
}

export default DefineTextVectorConfig;
