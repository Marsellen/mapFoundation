import React from 'react';
import { inject, observer } from 'mobx-react';
import 'src/assets/less/components/define-mode.less';
import LayerTextConfig from 'src/pages/Index/components/RenderMode/LayerTextConfig';

@inject('TextStore')
@observer
class TextConfig extends React.Component {
    render() {
        const { TextStore } = this.props;
        const { vectorTextConfig } = TextStore;
        return (
            <div className="config-wrap">
                {Object.values(vectorTextConfig).map(item => {
                    const { key } = item;
                    return <LayerTextConfig key={key} config={item} />;
                })}
            </div>
        );
    }
}

export default TextConfig;
